import { useEffect, useState } from 'react'
import { api, clearLocalGuestData } from './lib/api'
import { supabase } from './lib/supabase'
import { shareToKakao } from './lib/kakaoShare'
import { ConstitutionGroup, ConstitutionKey, constitutionLabels, questions } from './data'
import Diagnosis from './components/Diagnosis'
import Result from './components/Result'
import Report from './components/Report'
import Recommendations from './components/Recommendations'
import Coach from './components/Coach'
import Auth from './components/Auth'
type Tab = 'diagnosis' | 'result' | 'report' | 'recommendations' | 'coach'
type Member = { name: string; email: string; picture?: string }
const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'diagnosis', label: '셀프 테스트', icon: '◌' }, { id: 'result', label: '결과', icon: '✦' }, { id: 'report', label: '리포트', icon: '▤' }, { id: 'recommendations', label: '추천', icon: '♡' }, { id: 'coach', label: 'AI 코치', icon: '☀' },
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
    api('members').then(r => r.json()).then(data => {
      if (data?.name) setMember(data)
    }).catch(() => {})
  }, [])
  const addAnswer = async (answer: string) => {
    const next = [...answers, answer]
    setAnswers(next)
    const result = next.length === 20 ? determine(next) : null
    if (result) {
      setConstitution(result)
      setTab('result')
    }
    try { await api('profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers: next, constitution: result }) }) } catch {}
  }
  const restart = async () => {
    if (answers.length > 0 && !window.confirm('지금까지 답한 내용이 사라져요. 처음부터 다시 시작할까요?')) return
    setAnswers([])
    setConstitution(null)
    try { await api('profile', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ answers: [], constitution: '' }) }) } catch {}
  }
  const startDiagnosis = () => {
    setTab('diagnosis')
    if (answers.length >= questions.length || constitution) void restart()
  }
  const goHome = () => {
    setTab(constitution ? 'result' : 'diagnosis')
  }
  const completeAuth = async (nextMember: Member) => {
    setMember(nextMember)
    try {
      const data = await api('profile').then(r => r.json())
      setAnswers(data.answers || [])
      setConstitution(data.constitution || null)
      if ((data.answers || []).length === 20 && data.constitution) setTab('result')
    } catch {}
    setNotice(`${nextMember.name}님, 온담채 회원으로 환영해요.`)
  }
  const logout = async () => {
    await supabase.auth.signOut()
    clearLocalGuestData()
    setMember(null)
    setAnswers([])
    setConstitution(null)
    setTab('diagnosis')
    setNotice('로그아웃했어요. 셀프 테스트 결과는 계정에 안전하게 보관되어 있어요.')
  }
  const share = () => {
    if (!constitution) return
    try {
      shareToKakao({
        title: '온담채 웰니스 결과',
        description: `저는 ${constitutionLabels[constitution]} 경향으로 나왔어요. 내 몸의 균형을 함께 살펴보세요.`,
        imageUrl: 'https://ondamchae-wellness.vercel.app/share-card.png',
        link: 'https://ondamchae-wellness.vercel.app/',
      })
    } catch {
      setNotice('카카오톡 공유를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.')
    }
  }
  const gatedTabs: Tab[] = ['result', 'report', 'recommendations', 'coach']
  const needsLogin = !!constitution && !member && gatedTabs.includes(tab)
  const content = loading ? <section className="loading-view"><div className="loading-leaf">☘</div><p>나만의 웰니스 공간을 준비하고 있어요</p></section> : needsLogin ? (
    <section className="empty-view compact"><div className="empty-orb">✦</div><h1>로그인하면<br />계속 볼 수 있어요</h1><p>Google 계정으로 로그인하면 셀프 테스트 결과, 리포트, 추천, AI 코치까지 모두 이어서 확인할 수 있어요.</p><button className="primary-button" onClick={() => setShowAuth(true)}>로그인하고 계속 보기</button></section>
  ) : {
    diagnosis: <Diagnosis answers={answers} onAnswer={addAnswer} onRestart={restart} />,
    result: <Result constitution={constitution} onDiagnose={startDiagnosis} onShare={share} />,
    report: <Report constitution={constitution} onDiagnose={startDiagnosis} />,
    recommendations: <Recommendations constitution={constitution} onDiagnose={startDiagnosis} />,
    coach: <Coach constitution={constitution} onDiagnose={startDiagnosis} />,
  }[tab]
  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={goHome} aria-label="온담채 홈으로"><span>온담채</span><small>溫談採 · 따뜻한(溫) 이야기(談)가 가득 채워지는(採) 공간</small></button><div className="header-actions"><div className="header-status"><i></i><span>{constitution ? `${constitution} 분석 완료` : '나를 알아가는 중'}</span></div><button className="member-button" onClick={() => setShowAuth(true)}>{member ? (<>{member.picture && <img src={member.picture} alt="" className="member-avatar" referrerPolicy="no-referrer" />}<span className="member-name">{member.name}님</span></>) : '로그인'}</button></div></header>
    <main>{content}</main>
    {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')} aria-label="알림 닫기">×</button></div>}
    {showAuth && <Auth onClose={() => setShowAuth(false)} onComplete={completeAuth} member={member} onLogout={logout} />}
    <nav className="tabbar" aria-label="주요 메뉴">{tabs.map(item => <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => setTab(item.id)}><span>{item.icon}</span>{item.label}</button>)}</nav>
  </div>
}
