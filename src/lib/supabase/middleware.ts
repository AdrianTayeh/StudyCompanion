import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Refreshes Supabase session cookies on requests when needed.
export async function updateSession(request: NextRequest) {
  // Create a response that we can set cookies on.
  const response = NextResponse.next({ request: { headers: request.headers } })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createServerClient(url, key, {
    cookies: {
      // Read from the incoming request cookies
      getAll() {
        return request.cookies.getAll()
      },
      // Write back to the outgoing response cookies
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Trigger a session check/refresh. If the access token is expired,
  // Supabase will attempt to refresh it and invoke cookies.setAll above.
  await supabase.auth.getUser()

  return response
}
