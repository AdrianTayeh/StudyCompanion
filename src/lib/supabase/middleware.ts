import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Refreshes Supabase session cookies on requests when needed.
export async function updateSession(request: NextRequest) {
  // Create a response that we can set cookies on.
  const response = NextResponse.next({ request: { headers: request.headers } });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(url, key, {
    cookies: {
      // Read from the incoming request cookies
      getAll() {
        return request.cookies.getAll();
      },
      // Write back to the outgoing response cookies
      setAll(cookies) {
        cookies.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Check if this is a protected route
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/notes") ||
    request.nextUrl.pathname.startsWith("/flashcards") ||
    request.nextUrl.pathname.startsWith("/progress") ||
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/settings");

  if (isProtectedRoute) {
    // Get the session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      // Redirect to login if no session
      const redirectUrl = new URL("/login", request.url);
      redirectUrl.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    // For non-protected routes, just refresh the session token if needed
    await supabase.auth.getSession();
  }

  return response;
}
