type MaybeRoleUser = {
  app_metadata?: {
    role?: string
    roles?: string[]
  }
  user_metadata?: {
    role?: string
    roles?: string[]
  }
}

export function isAdminUser(user: MaybeRoleUser | null): boolean {
  console.log('[isAdminUser Debug] user:', JSON.stringify(user, null, 2))
  
  if (!user) {
    console.log('[isAdminUser Debug] no user found')
    return false
  }

  const appRole = user.app_metadata?.role
  const userRole = user.user_metadata?.role
  const appRoles = user.app_metadata?.roles ?? []
  const userRoles = user.user_metadata?.roles ?? []

  const isAdmin = (
    appRole === 'admin' ||
    userRole === 'admin' ||
    appRoles.includes('admin') ||
    userRoles.includes('admin')
  )

  console.log('[isAdminUser Debug] isAdmin result:', isAdmin)
  return isAdmin
}
