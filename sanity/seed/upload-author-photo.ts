import * as fs from "node:fs";
import * as path from "node:path";
import { createClient } from "@sanity/client";
import { sanityDataset, sanityProjectId } from "../../lib/sanity-env";

const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
});

async function uploadPhoto() {
  console.log("Reading author photo file...");
  const photoPath = path.join(process.cwd(), "ina j", "ina j photo.jpg");

  if (!fs.existsSync(photoPath)) {
    throw new Error(`File not found at path: ${photoPath}`);
  }

  const fileBuffer = fs.readFileSync(photoPath);

  console.log("Uploading photo to Sanity...");
  const asset = await client.assets.upload("image", fileBuffer, {
    filename: "ina-j-photo.jpg",
    contentType: "image/jpeg",
  });
  console.log(`  Uploaded asset successfully. Asset ID: ${asset._id}`);

  console.log("Updating author-ina-j document with image asset reference...");
  await client
    .patch("author-ina-j")
    .set({
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    })
    .commit();

  console.log("Author photo upload and link completed successfully!");
}

uploadPhoto().catch(console.error);
