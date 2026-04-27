// src/app/admin/layout.tsx
// ============================================================
// Admin parent layout — minimal wrapper for all /admin routes
// Protected routes use (protected)/layout.tsx for the sidebar
// ============================================================

export const metadata = {
  title: 'Admin — Ares Drive',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {children}
    </div>
  )
}
