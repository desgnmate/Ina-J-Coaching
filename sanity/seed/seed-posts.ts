import { createClient } from "@sanity/client";
import { sanityDataset, sanityProjectId } from "../../lib/sanity-env";

const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
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
      "Discover the foundational marketing strategies needed to build steady booking demand, establish local visibility, and attract clients who value pet portrait artwork.",
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
        children: [
          {
            _type: "span",
            text: "Why Generic Marketing Fails Pet Portrait Studios",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Many photographers make the mistake of copy pasting marketing tactics from wedding or commercial studios. But pet photography is an emotional, community driven specialty. To build a reliable stream of enquiries, you must understand how to reach owners who treat their animals as full family members.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Your marketing should not focus on camera gear, technical settings, or discount vouchers. Instead, it must communicate the long term value of preserving a pet's unique personality in a beautiful home gallery. Successful marketing invite connections, builds trust, and makes your studio the obvious choice.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "Identifying Your Aligned Target Client" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "The foundation of all marketing is clarity on who you serve. You are not trying to reach every dog owner in your city. You are looking for the specific segment of owners who invest in premium care, buy high quality food, and consider their dog a crucial part of the household. When your message speaks directly to this connection, your marketing becomes far more effective.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Avoid talking about general session details. Focus instead on the legacy client results. Explain how you capture the quiet moments, the energetic runs, and the deep bonds that make their relationship special. This shift in positioning sets you apart from high volume, low cost hobbyists.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "Building Strategic Partnerships in Your Community",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "One of the fastest ways to build trust is by partnering with established, non competing pet brands. Think of boutique vet practices, high end grooming salons, luxury pet boarding facilities, and specialized pet stores. These businesses already have relationships with your ideal clients.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Instead of simply leaving business cards on their counter, create an aligned program. You could design a co branded gift voucher for their top clients, or photograph their staff pets to create a beautiful wall display in their lobby. This provides value to the business owner and introduces your brand in a high trust environment.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "Designing a Repeatable Marketing Calendar" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Consistency is what builds long term momentum. Many studio owners fall into a pattern of promoting their work only when bookings dry up. This reactive approach leads to inconsistent income. Instead, outline a simple, repeatable plan that runs throughout the year.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "A balanced plan includes regular newsletter communications, active relationship building with partners, seasonal client celebrations, and a consistent search engine optimization rhythm. By dedicating a few hours each week to these tasks, you create steady visibility that keeps your calendar booked months in advance.",
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
      "Stop guessing your prices or copying local competitors. Learn how to calculate your true business costs and structure a profitable artwork menu.",
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    estimatedReadingTime: 7,
    author: { _type: "reference", _ref: "author-ina-j" },
    categories: [
      { _type: "reference", _ref: "category-pricing-sales", _key: key() },
    ],
    body: addKeys([
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "The Trap of Creative Copying" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "When starting a pet photography business, it is tempting to look at what other local studios charge and price your services slightly lower. This is a dangerous path. You do not know if those competitors are actually profitable, what their overheads look like, or if they are on the verge of closing. Pricing must be based on mathematical realities, not peer comparison.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Pricing is not a reflection of your personal value or artistic talent. It is a mathematical formula that must support your business costs, your taxes, your lifestyle, and your savings goals. Setting prices logically ensures your business can survive and thrive.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "Calculating Your True Cost of Doing Business",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "To build a sustainable studio, you must know your Cost of Doing Business, which is often called CODB. This includes all fixed expenses, such as insurance, software subscriptions, studio rent, accounting fees, website hosting, and equipment depreciation. Next, calculate your variable costs per session, including print production, packaging, travel, and assistant pay.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Finally, determine your target personal income. Add your taxes, superannuation, and studio overheads to this figure. Divide this grand total by the number of sessions you realistically want to photograph each year. This gives you the minimum average sale required per client to run a healthy business.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "Why Cheap Digitals Limit Your Growth" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Many photographers offer low flat fees that include all digital files from a session. While this model requires less sales effort, it severely limits your income potential. It also prevents clients from receiving finished physical artwork, which is the ultimate expression of your work.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "When you deliver digital files only, those images often end up lost on a hard drive or shared on social media at low resolution. By shifting to a portrait model that offers high quality framed canvas prints, acrylic wall panels, and beautiful albums, you provide a complete service. This shift allows you to achieve average sales of $2,600 to $2,800 per client.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "Structuring Your Menu with Confident Logic" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Your pricing menu should be simple, clear, and easy for a client to understand. Avoid offering dozens of conflicting packages. Instead, present a simple session fee that covers your time and preparation, followed by clear, transparent artwork menus.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Structure your menu to guide clients toward your most popular products. Offer a mix of wall art collections, premium albums, and fine prints. By pricing your products logically, you help clients make decisions with confidence, ensuring they walk away with artwork they love and a positive experience.",
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
      "Turn bookings into lifelong client relationships. Explore the complete journey from initial enquiry through to artwork handoff.",
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    estimatedReadingTime: 8,
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
        children: [{ _type: "span", text: "The Experience is the Marketing" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "In a crowded market, technical skill is no longer enough to differentiate your studio. The client journey, from their first contact to the moment they unwrap their framed artwork, is what creates raving fans and drives repeat bookings. High end service makes client decisions easy and pricing concerns disappear.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "A beautiful client experience is built on anticipation, communication, and small, thoughtful details. When clients feel supported and cared for at every stage, they trust you completely, which is crucial for a successful portrait session with their pets.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "Pre Session Planning and Anticipation" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "The journey begins long before the session date. Once a client books, host a structured planning call. Learn about the pet's temperament, their favourite treats, their reaction to noises, and their overall health. This ensures you can plan a safe, stress free session.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Send a premium preparation guide that outlines what to wear, how to prepare their dog, and what to bring. This eliminates anxiety, helping the owners arrive relaxed and excited. By managing expectations early, you lay the groundwork for a successful and fun day.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "Managing the Pet Session with Canine Understanding",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "During the session, the comfort and safety of the pet must remain the highest priority. Do not rush into shooting. Allow the dog to sniff the environment, investigate your camera, and get comfortable with you. Use positive reinforcement, plenty of treats, and gentle praise to build a connection.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Read canine body language carefully. If a dog shows signs of stress, such as lip licking, yawning, or panting, take a break. Your patience and capability will impress the owners, showing them that their pet is in safe, professional hands.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "The Artwork Design Consultation" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "After the session, host a dedicated viewing and design consultation. Instead of sending an online gallery link, invite clients to select their images in person or via a structured video call. Guide them through the selection process, helping them choose the best expressions and poses.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Use design software to show how their portraits will look on their own walls. This visual proof makes the decision making process simple and enjoyable. By offering expert advice on size, framing, and layout, you ensure they invest in products that fit their home perfectly.",
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
      "Transition from a busy hobbyist to a confident studio CEO. Explore the mental shifts needed to grow your studio profitability.",
    publishedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    featured: false,
    estimatedReadingTime: 6,
    author: { _type: "reference", _ref: "author-ina-j" },
    categories: [{ _type: "reference", _ref: "category-mindset", _key: key() }],
    body: addKeys([
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "The Creative Mindset Challenge" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Running a successful pet photography studio requires more than just mastering your camera. The biggest hurdle for most creative entrepreneurs is mental. To build a business that actually supports your life, you must shift your perspective on marketing, pricing, and growth.",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Let's explore five critical mindset shifts that will help you transition from a busy, overwhelmed hobbyist into a focused, profitable business owner.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          {
            _type: "span",
            text: "1. Seeing Yourself as a Business Owner First",
          },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Many photographers view themselves as artists who happen to sell photos. This perspective leads to reactive decisions, poor pricing, and burnout. You must treat your studio as a business first and a creative outlet second. This means setting clear working hours, tracking your finances, and dedicating time to marketing.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "2. Re-framing Sales as Service" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "If the word sales makes you feel uncomfortable, you are not alone. Many creatives worry about appearing pushy or inauthentic. But offering high quality physical artwork is a service to your clients. You are helping them preserve their pet's legacy in a tangible, beautiful way that they will enjoy every single day.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "3. Choosing Action Over Perfection" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Waiting for your website to be perfect, your camera gear to be complete, or your branding to be flawless is a form of procrastination. Perfectionism holds you back from progress. Put your offers out, book sessions, test your pricing, and refine your systems as you go. Experience is the best teacher.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [{ _type: "span", text: "4. Escaping the Comparison Trap" }],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "It is easy to get distracted by what other photographers in your area are doing. But comparing your business to theirs is a waste of time. Focus entirely on your own client experience, your unique positioning, and your financial goals. Your ideal clients will choose you for your specific voice and approach, not because you are cheaper or different from the studio down the road.",
          },
        ],
      },
      {
        _type: "block",
        _style: "h2",
        children: [
          { _type: "span", text: "5. Detaching Money from Self-Worth" },
        ],
      },
      {
        _type: "block",
        _style: "normal",
        children: [
          {
            _type: "span",
            text: "Pricing is mathematics, not a statement on your value as a human being. When you treat your pricing menu as a logical formula built to cover your Cost of Doing Business, it becomes easy to discuss rates confidently with clients. If a client budget does not fit your services, it is simply a mismatch in scope, not a rejection of your art.",
          },
        ],
      },
    ]),
  },
];

async function seedPosts() {
  console.log("Seeding posts...");

  for (const post of posts) {
    await client.createOrReplace(post);
    console.log(`  Created/Updated post: ${post.title}`);
  }

  console.log("Posts seeded successfully!");
}

seedPosts().catch(console.error);
