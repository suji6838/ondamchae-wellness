import { ConstitutionKey } from '../data'
import { constitutionProductFocus, products, ProductCategory } from '../products'

const categoryMeta: Record<ProductCategory, { label: string; icon: string; color: string }> = {
  aerobic: { label: '유산소 운동', icon: '⌁', color: 'mint' },
  strength: { label: '근력 운동', icon: '▲', color: 'sage' },
  yoga: { label: '요가 · 회복', icon: '☾', color: 'cream' },
  skincare: { label: '피부 · 뷰티 케어', icon: '✦', color: 'pink' },
  nutrition: { label: '영양 · 장 건강', icon: '◒', color: 'yellow' },
  omega3: { label: '컨디션 케어', icon: '⬡', color: 'blue' },
}

type Props = { constitution: ConstitutionKey | null }

export default function RecommendedProducts({ constitution }: Props) {
  const enabled = products.filter((product) => product.enabled)
  if (enabled.length === 0) return null
  const focus = constitution ? constitutionProductFocus[constitution] : []
  const priority = (category: ProductCategory) => {
    const index = focus.indexOf(category)
    return index === -1 ? focus.length : index
  }
  const sorted = [...enabled].sort((a, b) => priority(a.category) - priority(b.category))
  return (
    <section className="product-recommend">
      <div className="product-recommend-head">
        <span className="leaf">✦</span>
        <div>
          <h2>온담채가 골라봤어요</h2>
          <p>지금 결과와 어울리는 아이템을 먼저 보여드려요.</p>
        </div>
      </div>
      <div className="product-grid">
        {sorted.map((product) => {
          const meta = categoryMeta[product.category]
          return (
            <article className="product-card" key={product.id}>
              <div className={`product-visual ${meta.color}`}>
                {product.image ? <img src={product.image} alt="" loading="lazy" /> : <span>{meta.icon}</span>}
              </div>
              <div className="product-body">
                <p>{meta.label}</p>
                <h3>{product.name}</h3>
                <span>{product.description}</span>
                <a className="product-cta" href={product.affiliateUrl} target="_blank" rel="noopener noreferrer sponsored">
                  상품 보기 <b>↗</b>
                </a>
              </div>
            </article>
          )
        })}
      </div>
      <p className="disclaimer">이 상품 추천에는 제휴 링크가 포함되어 있어요. 링크를 통해 구매하면 온담채가 일정 수수료를 받을 수 있습니다.</p>
    </section>
  )
}
