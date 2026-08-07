// 로그인 전(게스트)에는 localStorage에 저장하고, Google 로그인 후에는 Supabase DB로
// 저장 위치가 자동 전환된다. 최초 로그인 시 게스트로 진행했던 로컬 데이터가 있으면
// 한 번만 DB로 옮긴다(migrateLocalToRemote). 호출부(App.tsx, Coach.tsx)는 그대로
// api(path, init) => Promise<Response> 인터페이스를 사용한다.

import { supabase } from './supabase'

const STORAGE_PREFIX = 'ondamchae:'
const MIGRATION_FLAG = STORAGE_PREFIX + 'migrated'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key: string, value: unknown) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function parseBody(init?: RequestInit) {
  if (!init?.body) return {}
  try {
    return JSON.parse(String(init.body))
  } catch {
    return {}
  }
}

export function clearLocalGuestData() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(STORAGE_PREFIX))
    .forEach((key) => localStorage.removeItem(key))
}

async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession()
  return data.session?.user.id ?? null
}

async function migrateLocalToRemote(userId: string) {
  if (localStorage.getItem(MIGRATION_FLAG)) return
  const localProfile = readJSON<{ answers: string[]; constitution: string | null }>('profile', { answers: [], constitution: null })
  if (localProfile.answers?.length) {
    await supabase.from('profiles').upsert({
      id: userId,
      answers: localProfile.answers,
      constitution: localProfile.constitution,
      updated_at: new Date().toISOString(),
    })
  }
  localStorage.setItem(MIGRATION_FLAG, '1')
}

export const api = async (path: string, init?: RequestInit): Promise<Response> => {
  const cleanPath = path.replace(/^\/+/, '')
  const method = init?.method ?? 'GET'
  const userId = await getUserId()

  if (cleanPath === 'profile') {
    if (userId) {
      await migrateLocalToRemote(userId)
      if (method === 'GET') {
        const { data } = await supabase.from('profiles').select('answers, constitution').eq('id', userId).maybeSingle()
        return jsonResponse({ answers: data?.answers ?? [], constitution: data?.constitution ?? null })
      }
      if (method === 'PUT') {
        const body = parseBody(init)
        await supabase.from('profiles').upsert({
          id: userId,
          answers: body.answers ?? [],
          constitution: body.constitution || null,
          updated_at: new Date().toISOString(),
        })
        return jsonResponse({ ok: true })
      }
    } else {
      if (method === 'GET') {
        return jsonResponse(readJSON('profile', { answers: [], constitution: null }))
      }
      if (method === 'PUT') {
        const body = parseBody(init)
        writeJSON('profile', { answers: body.answers ?? [], constitution: body.constitution || null })
        return jsonResponse({ ok: true })
      }
    }
  }

  if (cleanPath === 'members' && method === 'GET') {
    if (!userId) return jsonResponse(null)
    const { data } = await supabase.auth.getUser()
    const meta = data.user?.user_metadata ?? {}
    if (!data.user) return jsonResponse(null)
    return jsonResponse({
      name: meta.full_name || meta.name || data.user.email,
      email: data.user.email,
      picture: meta.avatar_url || meta.picture,
    })
  }

  if (cleanPath.startsWith('coach/today/')) {
    const constitution = cleanPath.slice('coach/today/'.length)
    const day = todayKey()
    if (userId) {
      if (method === 'GET') {
        const { data } = await supabase.from('coach_checks').select('checks').eq('user_id', userId).eq('day', day).eq('constitution', constitution).maybeSingle()
        return jsonResponse({ checks: data?.checks ?? {} })
      }
      if (method === 'PUT') {
        const body = parseBody(init)
        const { data: existing } = await supabase.from('coach_checks').select('checks').eq('user_id', userId).eq('day', day).eq('constitution', constitution).maybeSingle()
        const checks = { ...(existing?.checks ?? {}) }
        if (body.task_key) checks[body.task_key] = !!body.completed
        await supabase.from('coach_checks').upsert({ user_id: userId, day, constitution, checks })
        return jsonResponse({ ok: true })
      }
    } else {
      const key = `coach:${day}:${constitution}`
      if (method === 'GET') {
        return jsonResponse({ checks: readJSON(key, {}) })
      }
      if (method === 'PUT') {
        const body = parseBody(init)
        const checks = readJSON<Record<string, boolean>>(key, {})
        if (body.task_key) checks[body.task_key] = !!body.completed
        writeJSON(key, checks)
        return jsonResponse({ ok: true })
      }
    }
  }

  return jsonResponse({ error: 'not found' }, 404)
}
