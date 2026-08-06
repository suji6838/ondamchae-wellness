// 원본(vibe.aitestbed.kr)에서는 이 함수가 플랫폼이 자동 제공하는 백엔드(api/profile,
// api/members, api/coach/today)를 호출했지만, 독립 앱에는 그 백엔드가 없어서
// 같은 인터페이스(path, init) => Promise<Response>를 유지한 채 localStorage로 대체했다.
// 호출부(App.tsx, Coach.tsx)는 수정 없이 그대로 동작한다.

const STORAGE_PREFIX = 'ondamchae:'

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

export const api = async (path: string, init?: RequestInit): Promise<Response> => {
  const cleanPath = path.replace(/^\/+/, '')
  const method = init?.method ?? 'GET'

  if (cleanPath === 'profile') {
    if (method === 'GET') {
      return jsonResponse(readJSON('profile', { answers: [], constitution: null }))
    }
    if (method === 'PUT') {
      const body = parseBody(init)
      writeJSON('profile', { answers: body.answers ?? [], constitution: body.constitution || null })
      return jsonResponse({ ok: true })
    }
  }

  if (cleanPath === 'members' && method === 'POST') {
    const body = parseBody(init)
    writeJSON('member', body)
    return jsonResponse({ ok: true })
  }

  if (cleanPath === 'coach/today') {
    const key = `coach:${todayKey()}`
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

  return jsonResponse({ error: 'not found' }, 404)
}
