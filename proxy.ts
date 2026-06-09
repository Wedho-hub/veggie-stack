import { auth } from '@/auth'
import { NextResponse } from 'next/server'

const protectedRoutes = ['/checkout', '/account', '/orders']
const authRoutes = ['/login', '/register']
const adminRoutes = ['/admin']

export const proxy = auth((req) => {
  const { nextUrl, auth: session } = req
  const isLoggedIn = !!session?.user
  const userRole = session?.user?.role
  const { pathname } = nextUrl

  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login?callbackUrl=/admin', nextUrl))
    }
    if (userRole !== 'admin') {
      return NextResponse.redirect(new URL('/', nextUrl))
    }
  }

  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !isLoggedIn) {
    const loginUrl = new URL('/login', nextUrl)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (authRoutes.some((r) => pathname.startsWith(r)) && isLoggedIn) {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
