export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard/:path*","/auth/logout","/auth/register","/api/:path*"] }