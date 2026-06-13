"use client";

import { NextStudio } from "next-sanity/studio";
import { StudioCustomizer } from "@/components/admin/StudioCustomizer";
import config from "@/sanity.config";

export default function AdminPage() {
  return (
    <>
      <StudioCustomizer />
      <NextStudio config={config} />
    </>
  );
}
