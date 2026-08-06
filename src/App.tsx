import { useEffect, useState } from 'react'
import { api } from './lib/api'
import { ConstitutionGroup, ConstitutionKey, constitutionLabels, questions } from './data'
import Diagnosis from './components/Diagnosis'
import Result from './components/Result'
import Report from './components/Report'
import Recommendations from './components/Recommendations'
import Coach from './components/Coach'
import Auth from './components/Auth'
type Tab = 'diagnosis' | 'result' | 'report' | 'recommendations' | 'coach'
type Member = { name: string; email: string }
const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'diagnosis', label: '진단', icon: '◌' }, { id: 'result', label: '결과', icon: '✦' }, { id: 'report', label: '리포트', icon: '▤' }, { id: 'recommendations', label: '추천', icon: '♡' }, { id: 'coach', label: 'AI 코치', icon: '☀' },
]
const groups: ConstitutionGroup[] = ['태양인', '태음인', '소양인', '소음인']
function determine(answers: string[]): ConstitutionKey {
  const groupScores: Record<ConstitutionGroup, number> = { 태양인: 0, 태음인: 0, 소양인: 0, 소음인: 0 }
  const thermalScores: Record<'한' | '열', number> = { 한: 0, 열: 0 }
  answers.forEach((answer, index) => {
    const selected = questions[index]?.options.find(option => option.label === answer)
    if (selected) {
      groupScores[selected.type] += 1
      thermalScores[selected.thermal] += 1
    }
  })
  const group = groups.reduce((leading, type) => groupScores[type] > groupScores[leading] ? type : leading, groups[0])
  const thermal = thermalScores.열 > thermalScores.한 ? '열' : '한'
  return `${thermal}${group.slice(0, 2)}` as ConstitutionKey
}
export default function App() {
  const [tab, setTab] = useState<Tab>('diagnosis')
  const [answers, setAnswers] = useState<string[]>([])
  const [constitution, setConstitution] = useState<ConstitutionKey | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [member, setMember] = useState<Member | null>(null)
  const [notice, setNotice] = useState('')
  useEffect(() => {
    api('profile').then(r => r.json()).then(data => {
      setAnswers(data.answers || [])
      setConstitution(data.constitution || null)
      if ((data.answers || []).length === 20 && data.constitution) setTab('result')
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])
  const addAnswer = async (answer: string) => {
    const next = [...answers, answer]
    setAnswers(next)
    if (next.length === 20) {
      const result = determine(next)
      setConstitution(result)
      setTab('result')
      try { await api('profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers: next, constitution: result }) }) } catch {}
    }
  }
  const restart = async () => {
    setAnswers([])
    setConstitution(null)
    try { await api('profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers: [], constitution: '' }) }) } catch {}
  }
  const startDiagnosis = () => {
    setTab('diagnosis')
    if (answers.length >= questions.length || constitution) void restart()
  }
  const completeAuth = async (nextMember: Member) => {
    const response = await api('members', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(nextMember) })
    if (!response.ok) throw new Error('member save failed')
    setMember(nextMember)
    setNotice(`${nextMember.name}님, 온담채 회원으로 환영해요.`)
  }
  const share = async () => {
    if (!constitution) return
    const text = `온담채 웰니스 자가 체크 결과, 저는 ${constitutionLabels[constitution]} 경향으로 나왔어요. 내 몸의 균형을 함께 살펴보세요.`
    try {
      if (navigator.share) await navigator.share({ title: '온담채 웰니스 결과', text })
      else await navigator.clipboard.writeText(text)
      setNotice('공유할 내용을 준비했어요. 카카오톡 대화방에 붙여넣어 전달해 보세요.')
    } catch {
      setNotice('공유를 취소했어요.')
    }
  }
  const content = loading ? <section className="loading-view"><div className="loading-leaf">☘</div><p>나만의 웰니스 공간을 준비하고 있어요</p></section> : {
    diagnosis: <Diagnosis answers={answers} onAnswer={addAnswer} onRestart={restart} />,
    result: <Result constitution={constitution} onDiagnose={startDiagnosis} onShare={share} />,
    report: <Report constitution={constitution} onDiagnose={startDiagnosis} />,
    recommendations: <Recommendations constitution={constitution} onDiagnose={startDiagnosis} />,
    coach: <Coach constitution={constitution} onDiagnose={startDiagnosis} />,
  }[tab]
  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={startDiagnosis} aria-label="온담채 홈으로"><span>온담채</span><small>溫談採 · 따뜻한(溫) 이야기(談)가 가득 채워지는(採) 공간</small></button><div className="header-actions"><div className="header-status"><i></i><span>{constitution ? `${constitution} 분석 완료` : '나를 알아가는 중'}</span></div><button className="member-button" onClick={() => setShowAuth(true)}>{member ? `${member.name}님` : '로그인'}</button></div></header>
    <main>{content}</main>
    {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')} aria-label="알림 닫기">×</button></div>}
    {showAuth && <Auth onClose={() => setShowAuth(false)} onComplete={completeAuth} />}
    <nav className="tabbar" aria-label="주요 메뉴">{tabs.map(item => <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}><span>{item.icon}</span>{item.label}</button>)}</nav>
  </div>
}
