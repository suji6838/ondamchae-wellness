import { ConstitutionKey, constitutionLabels, reports } from '../data'
type Props = { constitution: ConstitutionKey | null; onDiagnose: () => void }
export default function Report({ constitution, onDiagnose }: Props) {
  if (!constitution) return <section className="empty-view compact"><div className="empty-orb">☘</div><h1>맞춤 리포트를<br />준비해 드릴게요</h1><p>먼저 체질 진단을 완료해 주세요.</p><button className="primary-button" onClick={onDiagnose}>진단하러 가기</button></section>
  const report = reports[constitution]
  return <section className="view report-view"><span className="eyebrow">{constitutionLabels[constitution]} 맞춤 리포트</span><h1>내 몸의 강점을 살리고<br /><em>편안한 균형</em>을 만들어요.</h1><div className="report-grid"><article className="report-card strength"><div className="card-icon">↗</div><h2>타고난 장점</h2><ul>{report.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="report-card caution"><div className="card-icon">!</div><h2>살펴볼 신호</h2><ul>{report.cautions.map((item) => <li key={item}>{item}</li>)}</ul></article></div><article className="care-tip"><span>웰니스 참고 안내</span><h2>내 몸의 속도에 맞춰, 작지만 꾸준한 루틴을 선택해 보세요.</h2><p>이 리포트는 의료적 체질 진단이 아닌 생활습관 참고 정보입니다. 증상이 지속되거나 체질 판정이 필요하다면 한의사와 상담하세요.</p></article></section>
}
