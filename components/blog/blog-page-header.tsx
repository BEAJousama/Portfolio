"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function BlogPageHeader() {
  const { t } = useLanguage()
  return (
    <section className="mb-10">
      <h1 className="game-title mb-3 text-2xl md:text-3xl">{t.blogTitle}</h1>
      <p className="pixel-text max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {t.blogSubtitle}
      </p>
    </section>
  )
}
