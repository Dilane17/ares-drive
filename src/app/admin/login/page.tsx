// src/app/admin/login/page.tsx
// ============================================================
// Admin login page — standalone, no sidebar
// ============================================================

import LoginForm from '@/components/admin/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] px-4">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="fixed w-[800px] h-[800px] bg-[#df2531] blur-[220px] opacity-[0.05] rounded-full pointer-events-none"
      />

      {/* Card — 480px explicit via .admin-login-card CSS class (bypasses Tailwind v4 @theme spacing conflict) */}
      <div
        className="admin-login-card"
        style={{ position: 'relative', zIndex: 10 }}
      >

        {/* Logo block */}
        <div className="mb-10">
          <p className="font-[family-name:var(--font-hud)] text-[10px] uppercase tracking-[0.35em] text-[#df2531] mb-3">
            Backoffice
          </p>
          <h1 className="font-[family-name:var(--font-hud)] text-white text-[34px] font-bold uppercase tracking-[0.05em] leading-none">
            Ares Drive
          </h1>
          <p className="mt-3 font-[family-name:var(--font-hud)] text-[11px] text-white/30 uppercase tracking-[0.12em]">
            Espace administrateur
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
