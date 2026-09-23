import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
    const res = await fetch(new URL("/api/auth/get-session", request.url), {
        headers: request.headers,
    })
    const session = await res.json()

    if (session?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ["/dashboard/:path*"],
}