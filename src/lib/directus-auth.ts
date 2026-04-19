import { cookies } from 'next/headers'

export interface AuthTokens {
  access_token: string
  refresh_token?: string
  expires?: number
}

export interface DirectusUser {
  id: string
  first_name?: string | null
  last_name?: string | null
  email: string
  avatar?: string | null
}

const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL
const APP_URL = process.env.NEXT_PUBLIC_APP_URL

// Get Google Login URL
export async function getGoogleLoginUrl(redirectUrl?: string): Promise<string> {
  const redirect = redirectUrl || `${APP_URL}/auth/callback`
  const encodedRedirect = encodeURIComponent(redirect)
  return `${DIRECTUS_URL}/auth/login/google?redirect=${encodedRedirect}`
}

// Refresh Access Token
export async function refreshAccessToken(
  refreshToken: string,
): Promise<AuthTokens | null> {
  try {
    const response = await fetch(`${DIRECTUS_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
        mode: 'json',
      }),
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return {
      access_token: data.data.access_token,
      refresh_token: data.data.refresh_token,
      expires: data.data.expires,
    }
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return null
  }
}

// Get Current User
export async function getCurrentUser(
  accessToken: string,
): Promise<DirectusUser | null> {
  try {
    const response = await fetch(`${DIRECTUS_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    return data.data
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Set Auth Cookies
export async function setAuthCookies(tokens: AuthTokens): Promise<void> {
  try {
    const cookieStore = await cookies()
    const expiresMs = tokens.expires || 15 * 60 * 1000 // 15 minutes default

    // Set access token cookie (expires with token)
    cookieStore.set('directus_access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: Math.floor(expiresMs / 1000),
      path: '/',
    })

    // Set refresh token cookie (7 days)
    if (tokens.refresh_token) {
      cookieStore.set('directus_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      })
    }
  } catch (error) {
    console.error('Error setting auth cookies:', error)
  }
}

// Clear Auth Cookies
export async function clearAuthCookies(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('directus_access_token')
    cookieStore.delete('directus_refresh_token')
  } catch (error) {
    console.error('Error clearing auth cookies:', error)
  }
}

// Get Access Token (with auto-refresh)
export async function getAccessToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    let accessToken = cookieStore.get('directus_access_token')?.value

    if (accessToken) {
      return accessToken
    }

    // Try to refresh with refresh token
    const refreshToken = cookieStore.get('directus_refresh_token')?.value
    if (refreshToken) {
      const newTokens = await refreshAccessToken(refreshToken)
      if (newTokens) {
        await setAuthCookies(newTokens)
        return newTokens.access_token
      }
    }

    return null
  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}

// Get Authenticated User
export async function getAuthenticatedUser(): Promise<DirectusUser | null> {
  try {
    const accessToken = await getAccessToken()
    if (!accessToken) {
      return null
    }

    return await getCurrentUser(accessToken)
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return null
  }
}

// Logout
export async function logout(): Promise<void> {
  try {
    const accessToken = await getAccessToken()

    if (accessToken) {
      // Try to revoke token on Directus
      await fetch(`${DIRECTUS_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch(() => {
        // Silently fail if logout endpoint fails
      })
    }

    await clearAuthCookies()
  } catch (error) {
    console.error('Error logging out:', error)
  }
}
