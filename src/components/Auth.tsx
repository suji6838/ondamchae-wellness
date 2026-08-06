import { FormEvent, useState } from 'react'
type Props = {
  onClose: () => void
  onComplete: (member: { name: string; email: string }) => Promise<void>
}
export default function Auth({ onClose, onComplete }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const submit = async (event: FormEvent) => {
    event.preventDefault()
    const cleanName = name.trim()
    const cleanEmail = email.trim()
    if (!cleanName) return setError('이름을 입력해 주세요.')
    if (!/^[^\s@]+@gmail\.com$/i.test(cleanEmail)) return setError('Gmail 주소를 정확히 입력해 주세요.')
    setSubmitting(true)
    setError('')
    try {
      await onComplete({ name: cleanName, email: cleanEmail })
      onClose()
    } catch {
      setError('가입 정보를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.')
    } finally {
      setSubmitting(false)
    }
  }
  return <div className="modal-backdrop" role="presentation">
    <section className="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <button className="modal-close" onClick={onClose} aria-label="회원가입 창 닫기">×</button>
      <span className="eyebrow">온유 회원 시작하기</span>
      <h1 id="auth-title">내 웰니스 기록을<br /><em>안전하게 이어가세요.</em></h1>
      <p className="auth-copy">Gmail 주소로 가입하면 나의 진단 결과와 오늘의 실천을 이어서 확인할 수 있어요.</p>
      <form onSubmit={submit} noValidate>
        <label>이름<input value={name} onChange={(event) => setName(event.target.value)} placeholder="이름을 입력해 주세요" autoComplete="name" /></label>
        <label>Gmail 주소<input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="example@gmail.com" type="email" autoComplete="email" /></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="google-button" type="submit" disabled={submitting}><b>G</b>{submitting ? '가입 정보를 저장하고 있어요' : 'Gmail로 회원가입 · 로그인'}</button>
      </form>
      <p className="auth-note">이 화면은 Gmail 주소 기반의 기본 회원가입 화면입니다. 실제 Google 계정 인증 연동은 별도의 Google OAuth 설정이 필요합니다.</p>
    </section>
  </div>
}
