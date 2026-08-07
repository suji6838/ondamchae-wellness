import { useEffect, useRef, useState } from 'react'
import { questions } from '../data'
type Props = { answers: string[]; onAnswer: (answer: string) => void; onRestart: () => void }
export default function Diagnosis({ answers, onAnswer, onRestart }: Props) {
  const index = answers.length
  const current = questions[index]
  const [locked, setLocked] = useState(false)
  const lockedRef = useRef(false)
  useEffect(() => { setLocked(false); lockedRef.current = false }, [index])
  if (!current) return <section className="empty-view"><div className="empty-orb">✓</div><h1>이미 진단을<br />완료했어요</h1><p>저장된 결과는 [결과] 탭에서 계속 확인할 수 있어요. 처음부터 다시 진단하고 싶다면 아래 버튼을 눌러주세요.</p><button className="primary-button" onClick={onRestart}>처음부터 다시 진단하기</button></section>
  const handleAnswer = (label: string) => {
    if (lockedRef.current) return
    lockedRef.current = true
    setLocked(true)
    onAnswer(label)
  }
  return <section className="view diagnosis-view" aria-labelledby="diagnosis-title">
    <div className="section-intro"><span className="eyebrow">사상체질 셀프 체크</span><h1 id="diagnosis-title">나의 몸이 보내는<br /><em>작은 신호</em>를 들어볼까요?</h1><p>정답은 없어요. 지금의 나와 가장 가까운 답을 골라주세요.</p></div>
    <div className="progress-label"><span>{index + 1} / {questions.length}</span><button className="text-button" onClick={onRestart}>처음부터</button></div>
    <div className="progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
    <article className="question-card">
      <span className="question-no">QUESTION {String(index + 1).padStart(2, '0')}</span>
      <h2>{current.prompt}</h2>
      <div className="answers">{current.options.map((option) => <button key={option.label} className="answer-button" onClick={() => handleAnswer(option.label)} disabled={locked}><span>{option.label}</span><b>→</b></button>)}</div>
    </article>
    <p className="privacy-note">진단 답변은 맞춤형 건강 관리 안내를 위해 안전하게 보관됩니다.</p>
  </section>
}
