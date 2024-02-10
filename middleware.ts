import {withAuth, NextRequestWithAuth} from "next-auth/middleware";
import {NextResponse} from 'next/server'

export default withAuth(
  (request: NextRequestWithAuth) => {
    if (
      request.nextauth.token?.role !== 'admin' && (request.nextUrl.pathname.startsWith("/admin")) ||
      request.nextauth.token?.role !== 'manager' && (request.nextUrl.pathname.startsWith("/manager"))
    ) {
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
  },
)

export const config = {matcher: ["/admin/:path*", "/", "/manager/:path*"]}
