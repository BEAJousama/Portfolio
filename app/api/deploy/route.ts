import { NextResponse } from "next/server"

/**
 * Triggers a Vercel redeploy via the deploy hook URL.
 * Called from Sanity Studio "Deploy" tool. Keep VERCEL_DEPLOY_HOOK_URL secret in env.
 */
export async function POST() {
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL
  if (!hookUrl) {
    return NextResponse.json(
      { error: "VERCEL_DEPLOY_HOOK_URL is not set" },
      { status: 500 },
    )
  }

  try {
    const res = await fetch(hookUrl, { method: "POST" })
    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: `Deploy hook failed: ${res.status} ${text}` },
        { status: 502 },
      )
    }
    const data = await res.json().catch(() => ({}))
    return NextResponse.json({
      ok: true,
      message: "Deploy triggered",
      job: data?.job?.id ?? data?.id,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json(
      { error: `Deploy request failed: ${message}` },
      { status: 502 },
    )
  }
}
