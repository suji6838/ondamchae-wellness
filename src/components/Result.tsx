import { ConstitutionKey, constitutionLabels, reports } from '../data'
type Props = { constitution: ConstitutionKey | null; onDiagnose: () => void; onShare: () => void }
export default function Result({ constitution, onDiagnose, onShare }: Props) {
  if (!constitution) return <section className="empty-view"><div className="empty-orb">⌁</div><h1>아직 내 체질을<br />알아가는 중이에요</h1><p>20가지 질문에 답하면 나에게 가까운 체질과 건강 루틴을 확인할 수 있어요.</p><button className="primary-button" onClick={onDiagnose}>체질 셀프 테스트 시작하기</button></section>
  const report = reports[constitution]
  if (!report) return <section className="empty-view"><div className="empty-orb">⌁</div><h1>저장된 셀프 테스트 결과를<br />다시 확인해 볼까요?</h1><p>이전 결과 형식이 변경되어 새 셀프 테스트가 필요해요. 20가지 질문으로 나에게 가까운 체질 경향을 다시 살펴볼 수 있어요.</p><button className="primary-button" onClick={onDiagnose}>셀프 테스트 다시 시작하기</button></section>
  return <section className="view result-view">
    <span className="eyebrow">생활 습관 기반 8체질 경향 자가 체크</span><div className="result-hero"><div><p>선택 경향이 가장 많이 나타난 유형은</p><h1>{constitutionLabels[constitution]}</h1><strong>{report.summary}</strong></div><div className="constitution-seal"><span>八體質</span><b>{constitution.slice(0, 2)}</b></div></div>
    <button className="share-button" onClick={onShare}><span>💬</span> 카카오톡으로 결과 공유하기 <b>↗</b></button>
    <article className="summary-card"><span className="leaf">✦</span><div><h2>균형을 찾아가는 웰니스 안내</h2><p>{report.description}</p><div className="keyword-row">{report.keywords.map((word) => <span key={word}>#{word}</span>)}</div></div></article>
    <p className="disclaimer">이 결과는 선택지별 체질 경향을 단순 합산한 웰니스 자가 체크입니다. 사상체질은 한의사가 문진·맥진·체형·생활력 등을 종합해 판단하므로, 한의원 진단을 대체하거나 정확도를 보장하지 않습니다. 기존에 소음인 진단을 받으셨다면 해당 진단을 우선 참고해 주세요.</p>
  </section>
}
