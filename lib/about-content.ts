export const aboutAssets = {
  heroOrigin: "/asset/about/hero-origin.webp",
  missionVision: "/asset/about/mission-vision.webp",
  valueEmbraceChange: "/asset/about/value-embrace-change.svg",
  valueCollaboration: "/asset/about/value-collaboration.svg",
  valueCreateImpact: "/asset/about/value-create-impact.svg",
  joinWaitlist: "/asset/about/join-waitlist.webp",
} as const;

export const teamMembers = [
  { name: "Lionel Eagle", imageSrc: "/asset/about/team/lionel.avif" },
  { name: "Nonye Eagle-Iheakam", imageSrc: "/asset/about/team/nonye.avif" },
  { name: "Abiola Ogodo", imageSrc: "/asset/about/team/abiola.avif" },
  { name: "Ike Ejiogu", imageSrc: "/asset/about/team/ike.avif" },
  { name: "Ifunnaya Nnoka", imageSrc: "/asset/about/team/ifunnaya.avif" },
] as const;

export const valuesCards = [
  {
    title: "Embrace Change",
    description: "We challenge outdated norms and push for better consumer awareness.",
    bgClass: "bg-[#DBEFFF]",
    titleClass: "text-[#1E3A5F]",
    descriptionMaxWClass:
      "max-w-[220px] sm:max-w-[250px] lg:max-w-[300px] xl:max-w-[340px] 2xl:max-w-[417px]",
    imageSrc: aboutAssets.valueEmbraceChange,
  },
  {
    title: "Collaboration",
    description:
      "We believe solving major problems requires people, communities, and technology working together.",
    bgClass: "bg-[#FFE1F5]",
    titleClass: "text-[#4A1942]",
    descriptionMaxWClass:
      "max-w-[290px] sm:max-w-[325px] lg:max-w-[390px] xl:max-w-[460px] 2xl:max-w-[557px]",
    imageSrc: aboutAssets.valueCollaboration,
  },
  {
    title: "Create Impact",
    description: "Everything we build is designed to make a meaningful difference in everyday lives.",
    bgClass: "bg-[#D6FEE9]",
    titleClass: "text-[#1B4332]",
    descriptionMaxWClass:
      "max-w-[240px] sm:max-w-[270px] lg:max-w-[320px] xl:max-w-[376px] 2xl:max-w-[458px]",
    imageSrc: aboutAssets.valueCreateImpact,
  },
] as const;
