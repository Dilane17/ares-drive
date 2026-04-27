'use client'
// ============================================================
// LoginForm — admin email/password authentication
// ============================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { loginAction } from '@/lib/actions/auth'

const loginSchema = z.object({
  email:    z.string().min(1, 'Email requis').email('Adresse email invalide'),
  password: z.string().min(1, 'Mot de passe requis').min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
})

type LoginValues = z.infer<typeof loginSchema>

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M10.733 5.076A10.744 10.744 0 0 1 12 5c7 0 10 7 10 7a13.165 13.165 0 0 1-1.555 2.665" />
      <path d="M6.52 6.52A13.5 13.5 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.11-1.476" />
      <path d="M3 3 L21 21" />
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export default function LoginForm() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) })

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setServerError(null)
    const result = await loginAction(email, password)

    if (result?.error) {
      setServerError(result.error)
      return
    }

    // Les cookies de session sont maintenant enregistrés dans le navigateur.
    // On peut naviguer vers le dashboard en toute sécurité.
    if (result?.success) {
      router.push('/admin')
      router.refresh() // force Next.js à re-valider le layout/middleware
    }
  })

  return (
    <form onSubmit={onSubmit} className="admin-login-form" noValidate>

      {/* Server error banner */}
      {serverError && (
        <div className="admin-login-server-error" role="alert">
          <AlertIcon className="admin-login-server-error__icon" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Email */}
      <div className="admin-login-field-group">
        <label htmlFor="admin-email" className="admin-login-label">
          Email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className={`admin-login-input${errors.email ? ' admin-login-input--error' : ''}`}
          placeholder="admin@aresdrive.fr"
          aria-describedby={errors.email ? 'admin-email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="admin-email-error" className="admin-login-field-error" role="alert">
            <AlertIcon className="admin-login-field-error__icon" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="admin-login-field-group">
        <label htmlFor="admin-password" className="admin-login-label">
          Mot de passe
        </label>
        <div className="admin-login-password-wrap">
          <input
            id="admin-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            {...register('password')}
            className={`admin-login-input admin-login-input--password${errors.password ? ' admin-login-input--error' : ''}`}
            placeholder="••••••••"
            aria-describedby={errors.password ? 'admin-password-error' : undefined}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="admin-login-toggle"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOffIcon className="size-5 shrink-0" />
            ) : (
              <EyeIcon className="size-5 shrink-0" />
            )}
          </button>
        </div>
        {errors.password && (
          <p id="admin-password-error" className="admin-login-field-error" role="alert">
            <AlertIcon className="admin-login-field-error__icon" />
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="admin-login-submit"
      >
        {isSubmitting ? (
          <>
            <span className="admin-login-spinner" aria-hidden />
            Connexion en cours…
          </>
        ) : (
          'Se connecter'
        )}
      </button>
    </form>
  )
}
