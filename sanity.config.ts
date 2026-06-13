import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { sanityDataset, sanityProjectId } from "./lib/sanity-env";
import { deskStructure } from "./sanity/desk-structure";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "inaj-blog",
  title: "Ina J Education — Blog",
  basePath: "/admin",
  projectId: sanityProjectId,
  dataset: sanityDataset,
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
