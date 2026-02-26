"use client"

import { useState } from "react"
import { Card, Text, Button, Flex, Box } from "@sanity/ui"
import { RocketIcon } from "@sanity/icons"

const DEPLOY_API = "/api/deploy"

export function deployTool() {
  return {
    title: "Deploy to Vercel",
    name: "deploy",
    icon: RocketIcon,
    component: DeployToolComponent,
  }
}

function DeployToolComponent() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  const handleDeploy = async () => {
    setStatus("loading")
    setMessage("")
    try {
      const base = typeof window !== "undefined" ? window.location.origin : ""
      const res = await fetch(`${base}${DEPLOY_API}`, { method: "POST" })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus("error")
        setMessage(data?.error || `HTTP ${res.status}`)
        return
      }
      setStatus("success")
      setMessage("Deploy triggered. Your site will update in a few minutes.")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : String(err))
    }
  }

  return (
    <Card padding={4} sizing="border">
      <Flex direction="column" gap={4}>
        <Text size={2} weight="semibold">
          Redeploy site
        </Text>
        <Text size={1} muted>
          Trigger a new Vercel deployment to publish your latest content. Make sure you’ve set{" "}
          <code>VERCEL_DEPLOY_HOOK_URL</code> in your project env.
        </Text>
        <Button
          text={status === "loading" ? "Deploying…" : "Deploy to Vercel"}
          icon={RocketIcon}
          tone="primary"
          disabled={status === "loading"}
          onClick={handleDeploy}
        />
        {message && (
          <Box
            padding={3}
            style={{
              background: status === "error" ? "var(--card-danger-fg-color)" : "var(--card-success-fg-color)",
              color: "var(--card-bg-color)",
              borderRadius: "var(--card-radius)",
            }}
          >
            <Text size={1}>{message}</Text>
          </Box>
        )}
      </Flex>
    </Card>
  )
}
