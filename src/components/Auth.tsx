import { useEffect, useRef, useState } from 'react'
import { GOOGLE_CLIENT_ID } from '../config'

type Props = {
  onClose: () => void
  onComplete: (member: { name: string; email: string; picture?: string }) => Promise<void>
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void
          renderButton: (parent: HTMLElement, options: Record<string, unknown>) => void
        }
      }
    }
  }
}

function decodeGoogleCredential(token: string): { name: string; email: string; picture?: string } {
  const payload = token.split('.')[1]
  const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
  const json = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('')
  )
  return JSON.parse(json)
}

export default function Auth({ onClose, onComplete }: Props) {
  const buttonRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let cancelled = false
    const handleCredential = async (response: { credential: string }) => {
      setSubmitting(true)
      setError('')
      try {
        const profile = decodeGoogleCredential(response.credential)
        await onComplete({ name: profile.name, email: profile.email, picture: profile.picture })
        onClose()
      } catch {
        setError('로그인 정보를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.')
      } finally {
        setSubmitting(false)
      }
    }
    const init = () => {
      if (cancelled || !window.google || !buttonRef.current) return
      window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleCredential })
      window.google.accounts.id.renderButton(buttonRef.current, {
        type: 'standard', theme: 'outline', size: 'large', text: 'continue_with', shape: 'pill', width: 320,
      })
    }
    if (window.google?.accounts?.id) {
      init()
    } else {
      const script = document.getElementById('google-identity-script')
      script?.addEventListener('load', init)
      return () => script?.removeEventListener('load', init)
    }
    return () => { cancelled = true }
  }, [])

  return <div className="modal-backdrop" role="presentation">
    <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button className="modal-close" onClick={onClose} aria-label="회원가입 창 닫기">×</button>
      <span className="eyebrow">온담채 회원 시작하기</span>
      <h1 id="auth-title">내 웰니스 기록을<br /><em>안전하게 이어가세요.</em></h1>
      <p className="auth-copy">Google 계정으로 로그인하면 나의 진단 결과와 오늘의 실천을 이어서 확인할 수 있어요.</p>
      <div ref={buttonRef} className="google-signin-slot" />
      {submitting && <p className="loading-text">로그인 정보를 확인하고 있어요…</p>}
      {error && <p className="form-error" role="alert">{error}</p>}
      <p className="auth-note">Google 계정 정보는 이 브라우저에만 저장되며, 별도 서버로 전송되지 않아요.</p>
    </section>
  </div>
}
