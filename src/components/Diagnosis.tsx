import { questions } from '../data'
type Props = { answers: string[]; onAnswer: (answer: string) => void; onRestart: () => void }
export default function Diagnosis({ answers, onAnswer, onRestart }: Props) {
  const index = answers.length
  const current = questions[index]
  if (!current) return null
  return <section className="view diagnosis-view" aria-labelledby="diagnosis-title">
    <div className="section-intro"><span className="eyebrow">사상체질 셀프 체크</span><h1 id="diagnosis-title">나의 몸이 보내는<br /><em>작은 신호</em>를 들어볼까요?</h1><p>정답은 없어요. 지금의 나와 가장 가까운 답을 골라주세요.</p></div>
    <div className="progress-label"><span>{index + 1} / {questions.length}</span><button className="text-button" onClick={onRestart}>처음부터</button></div>
    <div className="progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
    <article className="question-card">
      <span className="question-no">QUESTION {String(index + 1).padStart(2, '0')}</span>
      <h2>{current.prompt}</h2>
      <div className="answers">{current.options.map((option) => <button key={option.label} className="answer-button" onClick={() => onAnswer(option.label)}><span>{option.label}</span><b>→</b></button>)}</div>
    </article>
    <p className="privacy-note">진단 답변은 맞춤형 건강 관리 안내를 위해 안전하게 보관됩니다.</p>
  </section>
}
