export type NavLink = { label: string; href: string };
export type NavItem = NavLink & {
  children?: NavLink[];
};

export const site = {
  name: "Ina J Education",
  parent: "Ina J Education",
  tagline: "Business coaching for pet photographers.",
  description:
    "Business coaching for pet photographers who want clearer positioning, stronger marketing, and more consistent bookings, from a photographer who is still actively in the business.",
  url: "https://inajeducation.com",
  email: "ina@inajphotography.com",
  phone: "0410 974 091",
  location: "Canberra, Australia. Online worldwide.",
  socials: {
    instagram: "https://instagram.com/inaj.thepetphotoceo",
    facebook: "https://facebook.com/inajphotography",
  },
  bookingHref: "https://forms.gle/oocMwawVB3de6aM29",
  parentSite: "https://www.inajphotography.com/",
};

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Podcast", href: "/podcast" },
  {
    label: "Work With Me",
    href: "/coaching",
    children: [
      { label: "Overview", href: "/coaching" },
      { label: "Workshop", href: "/workshop" },
      { label: "Mastermind", href: "/mastermind" },
    ],
  },
  { label: "Results", href: "/results" },
  { label: "Contact", href: "/contact" },
];

export const trustStrip = [
  { label: "Sony Australia Brand Advocate" },
  { label: "2023 Australian Small Business Champion Award, Photography" },
  { label: "$305K+ studio revenue by year six" },
  { label: "$2,600 to $2,800 average client sale" },
  { label: "Business Analyst and Project Manager background" },
];

export const hero = {
  eyebrow: "Ina J Education",
  primaryHeadline: [
    "Business coaching",
    "for pet photographers",
    "still in the work.",
  ],
  secondaryHeadline: "Business coaching for pet photographers.",
  subcopy: "",
  primaryCta: { label: "Work with Ina", href: "/coaching" },
  secondaryCta: { label: "Listen to the podcast", href: "/podcast" },
  credibility:
    "Ina still runs a full-service pet photography business while coaching photographers around the world. The advice is tested inside a real studio, not remembered from one.",
};

export const problem = {
  eyebrow: "The pattern",
  headline: "A busy business can still feel inconsistent.",
  body: "Most pet photographers do not need more noise. They need clearer positioning, steadier visibility, and a business structure that helps the right enquiries turn into bookings.",
  points: [
    "You are shooting and charging something, but bookings still feel uneven",
    "Your message does not yet make your value obvious",
    "Your offers are working too hard to explain themselves",
    "Your marketing feels reactive instead of intentional",
    "You want growth that fits your life, not growth that eats it",
  ],
};

export const pillars = {
  eyebrow: "The approach",
  headline:
    "Practical guidance from a photographer who is still actively building the business.",
  body: "Ina teaches from the middle of the work. She still photographs clients, still refines her systems, and still pays attention to what actually moves bookings. That is what gives the coaching its edge.",
  items: [
    {
      number: "01",
      title: "Aligned Positioning",
      description:
        "Clarify who you serve, what you do best, and how to talk about it in a way that feels natural and easy to repeat.",
    },
    {
      number: "02",
      title: "Magnetic Visibility",
      description:
        "Build a marketing rhythm that helps the right people find you, trust you, and enquire without needing you online all day.",
    },
    {
      number: "03",
      title: "Consistent Bookings",
      description:
        "Turn the message, the offer, and the client journey into a system that supports steadier demand and stronger average sales.",
    },
  ],
};

export const offer = {
  eyebrow: "Work with me",
  headline: "Choose the support that fits the season you are in.",
  program: "Workshop, Mastermind, and practical support",
  intro:
    "Whether you need a shorter reset or deeper support, the goal is the same: a business that books more consistently and feels simpler to run.",
  inclusions: [
    "Clearer positioning and messaging",
    "Offer refinement that is easier to sell",
    "Marketing guidance built around your real calendar",
    "A more confident client journey",
    "Practical next steps, not motivational fluff",
  ],
  cta: { label: "See the ways to work together", href: "/coaching" },
  guarantee:
    "Built around the same frameworks Ina is using in her own studio right now.",
};

export const aboutTeaser = {
  eyebrow: "Why Ina",
  headline: "A coach who is still in the business",
  body: "Before photography became her full-time work, Ina built a career in the Australian Public Service as a Business Analyst and Project Manager. She now brings that same structure and clear thinking into a pet photography business that grew from $40K in year one to more than $305K in year six.",
  personal:
    "The point of difference is simple. Ina is not a former photographer who now coaches. She is a working pet photographer who also coaches, which means the advice stays current, practical, and grounded in what is working now.",
  cta: { label: "Read Ina's story", href: "/about" },
};

export const whoFor = {
  eyebrow: "Who this is for",
  headline: "Support for photographers who are ready for steadier demand.",
  subcopy:
    "This is designed for pet photographers who already have work in motion and want a clearer path to consistent bookings, better-fit clients, and stronger average sales.",
  yes: [
    "You are already photographing clients and want a business that feels more reliable",
    "You want sharper messaging and a clearer point of difference",
    "You need marketing that is repeatable, not improvised every week",
    "You want pricing and offers that are easier to stand behind",
    "You value honest advice from someone still doing the work",
  ],
  no: "This is not for photographers looking for a magic fix, overnight results, or hype-heavy advice.",
};

export const outcomes = {
  eyebrow: "What changes",
  headline: "What you will leave with",
  items: [
    "A clearer message that tells the right people why you matter.",
    "An offer structure that feels easier to explain and easier to sell.",
    "A marketing plan you can actually keep up with.",
    "More confidence in the way you handle enquiries and sales.",
    "A stronger client journey from first contact to final delivery.",
    "A more realistic path to consistent bookings.",
  ],
};

export const testimonials = [
  {
    headline: "Beautiful and professional experience!",
    quote:
      "Ina is able to guide you through the whole experience and the result will blow your mind!",
    name: "Silvia Passeri",
    studio: "Pet Photography Client",
    photo: "/images/testimonials/silvia.jpg",
  },
  {
    headline: "Ina is amazing!",
    quote:
      "She was so good with my dog and got lots of different shots, including action ones!",
    name: "Lisa Treverrow",
    studio: "Pet Photography Client",
    photo: "/images/testimonials/lisa.jpg",
  },
  {
    headline: "Ina is spectacular!",
    quote:
      "Ina has been so lovely to work with, and you can tell how passionate she is with her work and you can easily see her love for animals.",
    name: "Julia Claxton",
    studio: "Pet Photography Client",
    photo: "/images/testimonials/julia.jpg",
  },
];

export const clientResults = [
  {
    name: "Yunet Solorzano",
    business: "Named client result",
    figure: "$9,000 sale",
    summary:
      "A clearer sales process and stronger positioning helped Yunet move into higher-value work with more confidence.",
  },
  {
    name: "Sharon Canovas",
    business: "Named client result",
    figure: "Fully booked spring",
    summary:
      "Sharon booked out her spring calendar for the first time after tightening the message and building a more intentional visibility plan.",
  },
  {
    name: "Stacey Sherman",
    business: "BarkHop Studio",
    figure: "Stronger studio direction",
    summary:
      "Stacey used the coaching to refine the business direction behind BarkHop Studio and make the next stage of growth feel more sustainable.",
  },
];

export const podcastLinks = {
  apple:
    "https://podcasts.apple.com/us/podcast/the-pet-photographers-journal/id1821073326",
  spotify: "https://creators.spotify.com/pod/profile/ina-j-photography/",
  website: "https://the-pet-photographers-journal.captivate.fm/",
};

export const podcastEpisodes = [
  {
    topic: "Visibility",
    title:
      "Third Party Marketing for Pet Photographers, how Kirstie McConnell built a fully booked calendar after relocating",
    excerpt:
      "A practical look at what happens when your visibility strategy does not depend on one platform.",
  },
  {
    topic: "Website strategy",
    title:
      "SEO, UX, and AI, what pet photographers need to know about their website",
    excerpt:
      "A grounded conversation about what your website is signalling to clients before they enquire.",
  },
  {
    topic: "Mindset and pricing",
    title:
      "From cheap digitals to profitable artwork, mindset shifts with Michelle Crandall",
    excerpt:
      "A useful listen for photographers who know the work is strong but still feel hesitant around value and sales.",
  },
  {
    topic: "Business reality",
    title:
      "The truth about what is holding photographers back, and how to build trust in an AI world",
    excerpt:
      "An honest episode about the work behind momentum, and what still matters when the market feels noisy.",
  },
];

export const leadMagnet = {
  eyebrow: "Free resource",
  headline: "Start with the Consistent Bookings Audit.",
  leadTitle: "Find the gap in your current booking system",
  body: "A practical starting point for photographers who want to see where their visibility, positioning, or enquiry process is letting them down.",
  cta: "Send me the audit",
};

export const finalCta = {
  headline: "Ready for a clearer path to consistent bookings?",
  body: "If you want a business that feels warmer, steadier, and easier to run, start with the page that fits where you are now.",
  cta: { label: "See ways to work with Ina", href: "/coaching" },
};

export const footer = {
  brand:
    "Business coaching for pet photographers, from a working photographer building a real studio alongside the education brand.",
  columns: [
    {
      title: "Work With Me",
      links: [
        { label: "Overview", href: "/coaching" },
        { label: "Workshop", href: "/workshop" },
        { label: "Mastermind", href: "/mastermind" },
        { label: "Book a call", href: "/contact" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "About Ina", href: "/about" },
        { label: "Podcast", href: "/podcast" },
        { label: "Results", href: "/results" },
        { label: "Photography site", href: site.parentSite },
      ],
    },
    {
      title: "Future Library",
      links: [
        { label: "Free Resources", href: "/resources" },
        { label: "Blog", href: "/blog" },
        { label: "Instagram", href: site.socials.instagram },
        { label: "Facebook", href: site.socials.facebook },
      ],
    },
  ],
};
