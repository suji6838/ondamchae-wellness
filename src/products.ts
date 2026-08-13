import { ConstitutionKey } from './data'

export type ProductCategory = 'aerobic' | 'strength' | 'yoga' | 'skincare' | 'nutrition' | 'omega3'

export type Product = {
  id: string
  name: string
  image: string
  description: string
  category: ProductCategory
  affiliateUrl: string
  enabled: boolean
}

// 체질별로 먼저 보여줄 카테고리 순서. 각 체질 리포트의 유의점(cautions)과 이어지는 영역을 앞쪽에 둔다.
export const constitutionProductFocus: Record<ConstitutionKey, ProductCategory[]> = {
  한태양: ['strength', 'nutrition', 'omega3'],
  열태양: ['skincare', 'yoga', 'nutrition'],
  한태음: ['aerobic', 'omega3', 'strength'],
  열태음: ['nutrition', 'aerobic', 'strength'],
  한소양: ['nutrition', 'strength', 'yoga'],
  열소양: ['skincare', 'nutrition', 'aerobic'],
  한소음: ['nutrition', 'yoga', 'omega3'],
  열소음: ['yoga', 'nutrition', 'omega3'],
}

// 실제 제휴 링크를 넣기 전까지 쓰는 샘플 데이터. affiliateUrl은 쿠팡파트너스·네이버쇼핑·공동구매 등
// 어떤 제휴처로 바꾸든 이 필드만 교체하면 되도록 상품마다 독립된 필드로 관리한다.
export const products: Product[] = [
  {
    id: 'stretch-band',
    name: '스트레칭 밴드',
    image: '',
    description: '집에서 10분 근력·이완 루틴에 가볍게 활용하기 좋아요.',
    category: 'strength',
    affiliateUrl: '#',
    enabled: true,
  },
  {
    id: 'massage-roller',
    name: '마사지 롤러',
    image: '',
    description: '자기 전 뭉친 다리와 어깨를 셀프로 풀어주는 홈케어용이에요.',
    category: 'yoga',
    affiliateUrl: '#',
    enabled: true,
  },
  {
    id: 'wellness-tea',
    name: '건강차',
    image: '',
    description: '따뜻한 음료 루틴으로 하루를 편안하게 마무리해 보세요.',
    category: 'nutrition',
    affiliateUrl: '#',
    enabled: true,
  },
  {
    id: 'omega3-capsule',
    name: '오메가3 캡슐',
    image: '',
    description: '순환 관리가 필요할 때 식사와 함께 챙기기 좋은 영양제예요.',
    category: 'omega3',
    affiliateUrl: '#',
    enabled: true,
  },
  {
    id: 'soothing-cream',
    name: '저자극 진정 크림',
    image: '',
    description: '열감이 오르기 쉬운 피부를 편안하게 가라앉혀 줘요.',
    category: 'skincare',
    affiliateUrl: '#',
    enabled: true,
  },
  {
    id: 'walking-shoes',
    name: '워킹화',
    image: '',
    description: '관절 부담을 줄이며 꾸준한 걷기 루틴을 도와줘요.',
    category: 'aerobic',
    affiliateUrl: '#',
    enabled: true,
  },
]
