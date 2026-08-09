import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/api'
import { ConstitutionKey, constitutionLabels, getDailyCoachPlans } from '../data'
type Props = { constitution: ConstitutionKey | null; onDiagnose: () => void }
export default function Coach({ constitution, onDiagnose }: Props) {
  const [checks, setChecks] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const plans = useMemo(() => (constitution ? getDailyCoachPlans(constitution) : []), [constitution])
  useEffect(() => {
    if (!constitution) return
    setLoading(true)
    api(`coach/today/${constitution}`).then(r => r.json()).then(data => setChecks(data.checks || {})).catch(() => setChecks({})).finally(() => setLoading(false))
  }, [constitution])
  const toggle = async (key: string) => {
    if (!constitution) return
    const completed = !checks[key]
    setChecks(prev => ({ ...prev, [key]: completed }))
    try { await api(`coach/today/${constitution}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ task_key: key, completed }) }) } catch { setChecks(prev => ({ ...prev, [key]: !completed })) }
  }
  if (!constitution) return <section className="empty-view compact"><div className="empty-orb">☀</div><h1>오늘의 리듬을<br />함께 찾아볼까요?</h1><p>셀프 테스트를 마치면 체질에 맞춘 AI 코치 플랜이 준비됩니다.</p><button className="primary-button" onClick={onDiagnose}>셀프 테스트 시작하기</button></section>
  const done = Object.values(checks).filter(Boolean).length
  return <section className="view coach-view"><div className="coach-hero"><span className="eyebrow">AI 웰니스 코치</span><h1>좋은 아침이에요.<br /><em>{constitutionLabels[constitution]}</em>을 위한 오늘이에요.</h1><p>무리하지 않고, 내 몸의 신호에 귀 기울이는 하루를 시작해요.</p><div className="coach-progress"><span>오늘의 실천 {done} / 3</span><div><i style={{ width: `${done / 3 * 100}%` }} /></div></div></div><div className="coach-list">{loading ? <p className="loading-text">오늘의 루틴을 준비하고 있어요…</p> : plans.map(plan => <article className={`coach-card ${checks[plan.key] ? 'completed' : ''}`} key={plan.key}><div className="coach-icon">{plan.icon}</div><div><span>{plan.type}</span><h2>{plan.title}</h2><p>{plan.text}</p></div><button className="check-button" onClick={() => toggle(plan.key)} aria-label={`${plan.title} 완료 여부`}>{checks[plan.key] ? '완료 ✓' : '실천하기'}</button></article>)}</div><div className="coach-note">✦ 작은 실천도 충분히 의미 있어요. 내일도 코치와 함께 이어가 보세요.</div></section>
}
