export const siteConfig = {
  name: "Mavscan",
  title: "Mavscan | Scan Smart, Buy Confident",
  description:
    "Verify the authenticity of cosmetics, wellness products, and beverages in seconds. Scan barcodes, check certifications, and buy with confidence using Mavscan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mavscans.com",
  locale: "en_US",
  keywords: [
    "Mavscan",
    "product authentication",
    "verify cosmetics",
    "barcode scanner",
    "fake product detection",
    "wellness products",
    "beverage verification",
    "Nigeria",
  ],
  contact: {
    email: "hello@mavscans.com",
    phone: "+2348060914935",
    address: "Adebisi Ogunniyi Crescent, Lagos, Nigeria",
  },
  company: "Mavscan Ltd",
  waitlistUrl: "https://waitlist.mavscans.com/",
} as const;
