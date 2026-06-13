import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
});

const author = {
  _type: "author",
  _id: "author-ina-j",
  name: "Ina J",
  slug: { current: "ina-j" },
  role: "Founder & Pet Photography Coach",
  bio: [
    {
      _type: "block",
      _style: "normal",
      children: [
        {
          _type: "span",
          text: "Ina J is a pet photography coach and business strategist who helps photographers build profitable businesses they love. With years of experience in the industry, she's helped hundreds of pet photographers transform their passion into thriving careers.",
        },
      ],
    },
  ],
  socialLinks: {
    instagram: "https://instagram.com/inajphotography",
    website: "https://inajphotography.com",
  },
};

async function seedAuthor() {
  console.log("Seeding author...");
  await client.createIfNotExists(author);
  console.log(`  Created author: ${author.name}`);
  console.log("Author seeded successfully!");
}

seedAuthor().catch(console.error);
