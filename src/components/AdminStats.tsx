import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Stats = { totalUsers: number; signupsLast7Days: number; diagnosedProfiles: number }

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const { data } = await supabase.auth.getSession()
      const token = data.session?.access_token
      if (!token) {
        if (!cancelled) { setError('세션을 확인하지 못했어요.'); setLoading(false) }
        return
      }
      try {
        const res = await fetch('/api/admin-stats', { headers: { Authorization: `Bearer ${token}` } })
        const body = await res.json()
        if (!res.ok) throw new Error(body?.error || '조회에 실패했어요.')
        if (!cancelled) setStats(body)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : '조회에 실패했어요.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [])

  return <div className="admin-stats">
    <p className="consent-title">관리자 통계</p>
    {loading && <p className="loading-text">불러오는 중이에요…</p>}
    {error && <p className="form-error" role="alert">{error}</p>}
    {stats && <div className="admin-stats-grid">
      <div><b>{stats.totalUsers.toLocaleString()}</b><span>전체 가입자</span></div>
      <div><b>{stats.signupsLast7Days.toLocaleString()}</b><span>최근 7일 신규가입</span></div>
      <div><b>{stats.diagnosedProfiles.toLocaleString()}</b><span>셀프 테스트 완료</span></div>
    </div>}
  </div>
}
