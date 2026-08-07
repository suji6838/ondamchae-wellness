import { useState } from 'react'
import { categories, categoryDetails, constitutionGroupOf, ConstitutionKey, constitutionLabels } from '../data'
type Props = { constitution: ConstitutionKey | null; onDiagnose: () => void }
export default function Recommendations({ constitution, onDiagnose }: Props) {
  const [openKey, setOpenKey] = useState<string | null>(null)
  if (!constitution) return <section className="empty-view compact"><div className="empty-orb">✦</div><h1>나를 위한 추천을<br />고르고 있어요</h1><p>체질을 확인한 뒤 개인화된 건강·뷰티 루틴을 만나보세요.</p><button className="primary-button" onClick={onDiagnose}>체질 확인하기</button></section>
  const group = constitutionGroupOf[constitution]
  const openItem = categories.find((c) => c.key === openKey)
  return <section className="view recommendation-view">
    <span className="eyebrow">{constitutionLabels[constitution]} 맞춤 추천</span>
    <h1>내 생활에 <em>가볍게</em><br />더하는 웰니스 루틴</h1>
    <p className="subcopy">몸 상태와 목표에 맞춰 천천히 적용해 보세요.</p>
    <div className="recommendation-grid">
      {categories.map((item) => (
        <article className="recommendation-card" key={item.key}>
          <div className={`recommendation-visual ${item.color}`}><img src={item.image} alt="" loading="lazy" /></div>
          <div className="rec-content">
            {item.name && <p>{item.name}</p>}
            <h2>{item.title}</h2>
            <span>{item.text}</span>
            <button aria-label={`${item.title} 추천 자세히 보기`} onClick={() => setOpenKey(item.key)}>자세히 보기 <b>→</b></button>
          </div>
        </article>
      ))}
    </div>
    <p className="disclaimer">영양제·건강기능식품은 개인의 건강 상태와 복용 중인 약을 고려해 전문가와 상담 후 선택하세요.</p>
    {openItem && (
      <div className="modal-backdrop" role="presentation" onClick={() => setOpenKey(null)}>
        <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="rec-detail-title" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={() => setOpenKey(null)} aria-label="창 닫기">×</button>
          <span className="eyebrow">{constitutionLabels[constitution]} 맞춤</span>
          <h1 id="rec-detail-title">{openItem.title}</h1>
          <p className="auth-copy">{categoryDetails[group][openItem.key]}</p>
          <button className="primary-button" onClick={() => setOpenKey(null)}>확인했어요</button>
        </section>
      </div>
    )}
  </section>
}
