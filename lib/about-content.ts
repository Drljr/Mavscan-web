export const aboutAssets = {
  heroOrigin: "/asset/about/hero-origin.png",
  missionVision: "/asset/about/mission-vision.png",
  valueEmbraceChange: "/asset/about/value-embrace-change.png",
  valueCollaboration: "/asset/about/value-collaboration.png",
  valueCreateImpact: "/asset/about/value-create-impact.png",
  joinWaitlist: "/asset/about/join-waitlist.png",
} as const;

export const teamMembers = [
  { name: "Lionel Eagle", imageSrc: "/asset/about/team/lionel-eagle.jpg" },
  { name: "Nonye Eagle-Iheakam", imageSrc: "/asset/about/team/nonye-eagle-iheakam.jpg" },
  { name: "Abiola Ogodo", imageSrc: "/asset/about/team/abiola-ogodo.jpg" },
  { name: "Ike Ejiogu", imageSrc: "/asset/about/team/ike-ejiogu.jpg" },
  { name: "Ifunnaya Nnoka", imageSrc: "/asset/about/team/ifunnaya-nnoka.jpg" },
] as const;

export const valuesCards = [
  {
    title: "Embrace Change",
    description: "We challenge outdated norms and push for better consumer awareness.",
    bgClass: "bg-[#E8F4FC]",
    titleClass: "text-[#1E3A5F]",
    imageSrc: aboutAssets.valueEmbraceChange,
  },
  {
    title: "Collaboration",
    description:
      "We believe solving major problems requires people, communities, and technology working together.",
    bgClass: "bg-[#FCE8F0]",
    titleClass: "text-[#4A1942]",
    imageSrc: aboutAssets.valueCollaboration,
  },
  {
    title: "Create Impact",
    description: "Everything we build is designed to make a meaningful difference in everyday lives.",
    bgClass: "bg-[#E8F8EE]",
    titleClass: "text-[#1B4332]",
    imageSrc: aboutAssets.valueCreateImpact,
  },
] as const;
