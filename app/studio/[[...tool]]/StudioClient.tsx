"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import CustomCursor from "@/components/custom-cursor"

export default function StudioClient() {
  return (
    <>
      <CustomCursor />
      <NextStudio config={config} />
    </>
  )
}
