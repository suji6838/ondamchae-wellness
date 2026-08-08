import { createClient } from '@supabase/supabase-js'

// 공개 식별자 (src/config.ts와 동일한 값, 클라이언트 번들에도 이미 노출됨).
// 여기 값을 바꾸면 src/config.ts도 같이 갱신할 것.
const SUPABASE_URL = 'https://pwdvpwauzsawzbuwmfez.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_wsKas--DLE6c9IGmIaX51w_WInOeFBb'

const ADMIN_EMAILS = ['joan6838@gmail.com']

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.replace(/^Bearer\s+/i, '')
  if (!token) return res.status(401).json({ error: '로그인이 필요해요.' })

  const anon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  const { data: userData, error: userError } = await anon.auth.getUser(token)
  if (userError || !userData.user || !ADMIN_EMAILS.includes(userData.user.email ?? '')) {
    return res.status(403).json({ error: '접근 권한이 없어요.' })
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    return res.status(500).json({ error: '서버에 SUPABASE_SERVICE_ROLE_KEY가 설정되어 있지 않아요.' })
  }
  const admin = createClient(SUPABASE_URL, serviceRoleKey)

  try {
    let totalUsers = 0
    let signupsLast7Days = 0
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    let page = 1
    const perPage = 1000
    while (true) {
      const { data, error } = await admin.auth.admin.listUsers({ page, perPage })
      if (error) throw error
      totalUsers += data.users.length
      signupsLast7Days += data.users.filter((u) => new Date(u.created_at).getTime() >= sevenDaysAgo).length
      if (data.users.length < perPage) break
      page++
    }

    const { count: diagnosedProfiles } = await admin
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .not('constitution', 'is', null)

    return res.status(200).json({ totalUsers, signupsLast7Days, diagnosedProfiles: diagnosedProfiles ?? 0 })
  } catch (err) {
    return res.status(500).json({ error: err instanceof Error ? err.message : '조회 중 오류가 발생했어요.' })
  }
}
