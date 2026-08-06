import { KAKAO_JS_KEY } from '../config'

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share: {
        sendDefault: (options: Record<string, unknown>) => void
      }
    }
  }
}

function ensureKakaoInit(): boolean {
  if (!window.Kakao) return false
  if (!window.Kakao.isInitialized()) window.Kakao.init(KAKAO_JS_KEY)
  return true
}

export function shareToKakao(params: { title: string; description: string; imageUrl: string; link: string }) {
  if (!ensureKakaoInit()) throw new Error('Kakao SDK not loaded yet')
  window.Kakao!.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: params.title,
      description: params.description,
      imageUrl: params.imageUrl,
      link: { webUrl: params.link, mobileWebUrl: params.link },
    },
    buttons: [
      { title: '나도 체질 확인하기', link: { webUrl: params.link, mobileWebUrl: params.link } },
    ],
  })
}
