import {withAuth, NextRequestWithAuth} from "next-auth/middleware";
import {NextResponse} from 'next/server'

export default withAuth(
  (request: NextRequestWithAuth) => {
    if (
      request.nextauth.token?.role !== 'admin' &&
      (
        request.nextUrl.pathname.startsWith("/admin/users") ||
        request.nextUrl.pathname.startsWith("/admin/brands") ||
        request.nextUrl.pathname.startsWith("/admin/categories") ||
        request.nextUrl.pathname.startsWith("/admin/collections") ||
        request.nextUrl.pathname.startsWith("/admin/options") ||
        request.nextUrl.pathname.startsWith("/admin/navigations")
      )
    ) {
      // return NextResponse.redirect(process.env.HOST + ':' + process.env.PORT + '/login')
      return NextResponse.rewrite(new URL('/denied', request.url))
    }
  },
  {
    callbacks: {
      authorized: ({token}) => !!token
    }
  }
)

export const config = {matcher: ["/admin/:path*", "/"]}
