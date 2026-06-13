import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
});

const categories = [
  {
    _type: "category",
    title: "Marketing",
    slug: { current: "marketing" },
    description: "Strategies to attract and retain your ideal clients",
    color: "#D46858",
  },
  {
    _type: "category",
    title: "Positioning",
    slug: { current: "positioning" },
    description: "Stand out in a crowded market with a clear brand identity",
    color: "#B08180",
  },
  {
    _type: "category",
    title: "Pricing & Sales",
    slug: { current: "pricing-sales" },
    description: "Price your services confidently and close more bookings",
    color: "#8B9D83",
  },
  {
    _type: "category",
    title: "Client Experience",
    slug: { current: "client-experience" },
    description: "Create unforgettable experiences that generate referrals",
    color: "#7B9DAD",
  },
  {
    _type: "category",
    title: "Mindset",
    slug: { current: "mindset" },
    description:
      "Build confidence and overcome the mental blocks holding you back",
    color: "#A67B8D",
  },
  {
    _type: "category",
    title: "Visibility & SEO",
    slug: { current: "visibility-seo" },
    description: "Get found online and grow your organic reach",
    color: "#D46858",
  },
];

async function seedCategories() {
  console.log("Seeding categories...");

  for (const category of categories) {
    await client.createIfNotExists({
      ...category,
      _id: `category-${category.slug.current}`,
    });
    console.log(`  Created category: ${category.title}`);
  }

  console.log("Categories seeded successfully!");
}

seedCategories().catch(console.error);
