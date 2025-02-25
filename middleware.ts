import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Your custom logic here
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/api/banking")) {
          return token !== null
        }
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/api/banking/:path*"],
}

