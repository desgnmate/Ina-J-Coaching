import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { deskStructure } from "./sanity/desk-structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "inaj-blog",
  title: "Ina J Education — Blog",
  basePath: "/admin",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => {
      return prev;
    },
  },
});
