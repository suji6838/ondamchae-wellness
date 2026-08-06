import { useEffect, useRef, useState } from 'react'
import { GOOGLE_CLIENT_ID } from '../config'
import { supabase } from '../lib/supabase'

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
        const { data, error: signInError } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
        })
        if (signInError || !data.user) throw signInError ?? new Error('no user')
        const meta = data.user.user_metadata ?? {}
        await onComplete({
          name: meta.full_name || meta.name || data.user.email || '회원',
          email: data.user.email ?? '',
          picture: meta.avatar_url || meta.picture,
        })
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
      <p className="auth-note">로그인하면 진단 결과와 오늘의 실천 기록이 안전하게 저장되어, 다른 기기에서도 이어서 확인할 수 있어요.</p>
    </section>
  </div>
}
