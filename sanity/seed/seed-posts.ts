import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_API_READ_TOKEN,
});

let _keyCounter = 0;
function key() {
  return `key-${++_keyCounter}-${Math.random().toString(36).slice(2, 8)}`;
}

function addKeys(body: any[]): any[] {
  return body.map((block) => {
    const b = { ...block, _key: key() };
    if (Array.isArray(b.children)) {
      b.children = b.children.map((c: any) => ({ ...c, _key: key() }));
    }
    return b;
  });
}

const posts = [
  {
    _type: "post",
    _id: "post-marketing-fundamentals",
    title: "Marketing Fundamentals for Pet Photographers",
    slug: { current: "marketing-fundamentals-pet-photographers" },
    excerpt:
      "Learn the essential marketing strategies that will help you attract your ideal clients and build a sustainable photography business.",
    publishedAt: new Date().toISOString(),
    featured: true,
    estimatedReadingTime: 8,
    author: { _type: "reference", _ref: "author-ina-j" },
    categories: [
      { _type: "reference", _ref: "category-marketing", _key: key() },
    ],
    body: addKeys([
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "Why Marketing Matters" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "As a pet photographer, your craft is creating beautiful images. But to build a sustainable business, you need to master the art of marketing too. The good news? Marketing doesn't have to feel salesy or inauthentic.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "Know Your Ideal Client" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "The foundation of effective marketing is understanding who you want to serve. What kind of pets do you love photographing? What type of owners appreciate your style? Get specific about your ideal client profile.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "Build Your Online Presence" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Your website and social media are your digital storefront. Make sure they showcase your best work and speak directly to your ideal client. Consistency is key across all platforms.",
          },
        ],
      },
    ]),
  },
  {
    _type: "post",
    _id: "post-pricing-strategy",
    title: "How to Price Your Pet Photography Services",
    slug: { current: "how-to-price-pet-photography-services" },
    excerpt:
      "Stop undercharging! Learn how to price your pet photography services confidently and profitably.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    estimatedReadingTime: 6,
    author: { _type: "reference", _ref: "author-ina-j" },
    categories: [
      { _type: "reference", _ref: "category-pricing-sales", _key: key() },
    ],
    body: addKeys([
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "The Problem with Hourly Pricing",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Many pet photographers make the mistake of pricing by the hour. This approach undervalues your expertise and limits your income potential. Instead, focus on the value you provide.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "Calculate Your Cost of Doing Business",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Before setting prices, understand your costs: equipment, insurance, software, marketing, and your time. This ensures every session is profitable.",
          },
        ],
      },
    ]),
  },
  {
    _type: "post",
    _id: "post-client-experience",
    title: "Creating a Five-Star Client Experience",
    slug: { current: "creating-five-star-client-experience" },
    excerpt:
      "Turn every client into a raving fan with these client experience strategies that generate referrals and repeat bookings.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    estimatedReadingTime: 7,
    author: { _type: "reference", _ref: "author-ina-j" },
    categories: [
      {
        _type: "reference",
        _ref: "category-client-experience",
        _key: key(),
      },
    ],
    body: addKeys([
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "The Journey Starts Before the Session",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Your client experience begins the moment someone discovers your brand. From the first website visit to the final gallery delivery, every touchpoint matters.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "The Welcome Process" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "A thoughtful welcome package sets the tone for the entire experience. Include preparation tips, what to expect, and personal touches that show you care.",
          },
        ],
      },
    ]),
  },
  {
    _type: "post",
    _id: "post-mindset-shifts",
    title: "5 Mindset Shifts for Pet Photography Success",
    slug: { current: "mindset-shifts-pet-photography-success" },
    excerpt:
      "Transform your thinking and unlock your potential with these powerful mindset shifts every pet photographer needs.",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    estimatedReadingTime: 5,
    author: { _type: "reference", _ref: "author-ina-j" },
    categories: [{ _type: "reference", _ref: "category-mindset", _key: key() }],
    body: addKeys([
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "From Hobbyist to Business Owner",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "The biggest shift you can make is seeing yourself as a business owner, not just a photographer. This changes how you make decisions about pricing, marketing, and growth.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "Embrace Imperfection" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Waiting for everything to be perfect is the enemy of progress. Launch that website, post that content, book that session. You'll improve as you go.",
          },
        ],
      },
    ]),
  },
];

async function seedPosts() {
  console.log("Seeding posts...");

  for (const post of posts) {
    await client.createIfNotExists(post);
    console.log(`  Created post: ${post.title}`);
  }

  console.log("Posts seeded successfully!");
}

seedPosts().catch(console.error);
