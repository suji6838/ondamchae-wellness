import { ConstitutionKey, constitutionLabels, reports } from '../data'
type Member = { name: string; email: string; picture?: string }
type Props = { constitution: ConstitutionKey | null; onDiagnose: () => void; member: Member | null; onRequestLogin: () => void }
export default function Report({ constitution, onDiagnose, member, onRequestLogin }: Props) {
  if (!constitution) return <section className="empty-view compact"><div className="empty-orb">☘</div><h1>맞춤 리포트를<br />준비해 드릴게요</h1><p>먼저 체질 진단을 완료해 주세요.</p><button className="primary-button" onClick={onDiagnose}>진단하러 가기</button></section>
  if (!member) return <section className="empty-view compact"><div className="empty-orb">✦</div><h1>맞춤 리포트는<br />로그인 후 볼 수 있어요</h1><p>Google 계정으로 로그인하면 {constitutionLabels[constitution]} 체질의 강점·주의사항·추천 음식까지 자세한 리포트를 확인할 수 있어요.</p><button className="primary-button" onClick={onRequestLogin}>로그인하고 리포트 보기</button></section>
  const report = reports[constitution]
  return <section className="view report-view">
    <span className="eyebrow">{constitutionLabels[constitution]} 맞춤 리포트</span>
    <h1>내 몸의 강점을 살리고<br /><em>편안한 균형</em>을 만들어요.</h1>
    <p className="subcopy">{report.description}</p>
    <div className="report-grid">
      <article className="report-card strength"><div className="card-icon">↗</div><h2>타고난 장점</h2><ul>{report.strengths.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article className="report-card caution"><div className="card-icon">!</div><h2>살펴볼 신호</h2><ul>{report.cautions.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </div>
    <div className="report-grid">
      <article className="report-card strength"><div className="card-icon">✦</div><h2>도움이 되는 음식</h2><ul>{report.recommendedFoods.map((item) => <li key={item}>{item}</li>)}</ul></article>
      <article className="report-card caution"><div className="card-icon">✕</div><h2>피하면 좋은 음식</h2><ul>{report.avoidFoods.map((item) => <li key={item}>{item}</li>)}</ul></article>
    </div>
    <article className="summary-card"><span className="leaf">⌁</span><div><h2>추천 활동</h2><div className="keyword-row">{report.recommendedActivities.map((item) => <span key={item}>{item}</span>)}</div></div></article>
    <article className="care-tip"><span>웰니스 참고 안내</span><h2>내 몸의 속도에 맞춰, 작지만 꾸준한 루틴을 선택해 보세요.</h2><p>이 리포트는 사상체질·팔체질 전통 이론에서 흔히 참고되는 생활습관 정보이며, 의료적 체질 진단이나 처방을 대신하지 않습니다. 증상이 지속되거나 정확한 체질 판정이 필요하다면 한의사와 상담하세요.</p></article>
  </section>
}
