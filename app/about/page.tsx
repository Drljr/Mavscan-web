import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ViewfinderFrame } from "@/components/viewfinder-frame";
import { ValuesMarquee } from "@/components/values-marquee";
import { aboutAssets, teamMembers } from "@/lib/about-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Mavscan started and our mission to reduce counterfeit product risk.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Mavscan",
    description:
      "Learn how Mavscan started and our mission to reduce counterfeit product risk.",
    url: "/about",
    type: "website",
    images: [
      {
        url: "/asset/mav-scan.webp",
        width: 1200,
        height: 800,
        alt: "Mavscan product verification app",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Mavscan",
    description:
      "Learn how Mavscan started and our mission to reduce counterfeit product risk.",
    images: ["/asset/mav-scan.webp"],
  },
};

/** Viewfinder images: full design size at 2xl; smaller in md/lg two-column layouts */
const aboutViewfinderImageClass =
  "relative mx-auto aspect-square w-[min(72vw,280px)] overflow-hidden rounded-[20px] shadow-[0_15px_45px_rgba(15,15,16,0.12)] sm:w-[360px] md:w-full md:max-w-[300px] lg:max-w-[380px] xl:max-w-[480px] 2xl:w-[574px] 2xl:max-w-[574px]";

const missionSectionHeightPx = 806; // 2xl
const missionMdSectionHeightPx = 600; // md
const missionLgSectionHeightPx = 680; // lg
const missionXlSectionHeightPx = 750; // xl
const missionImageWidthPx = 614;
const missionImageOverflowPx = 30;
const missionImageHeightPx = missionSectionHeightPx + missionImageOverflowPx * 2;
const missionMdImageHeightPx = missionMdSectionHeightPx + missionImageOverflowPx * 2;
const missionLgImageHeightPx = missionLgSectionHeightPx + missionImageOverflowPx * 2;
const missionXlImageHeightPx = missionXlSectionHeightPx + missionImageOverflowPx * 2;

/** Body copy scale: design size at 2xl, steps down per breakpoint */
const bodyText =
  "text-[16px] leading-[144%] tracking-[-1.5%] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[23px] 2xl:text-[24px]";

export default function AboutPage() {
  const teamRowOne = teamMembers.slice(0, 3);
  const teamRowTwo = teamMembers.slice(3);

  return (
    <main className="w-full bg-white px-4 pt-4 pb-0 text-zinc-900 sm:px-6 md:px-10 md:pt-8 lg:px-16 lg:pt-8 xl:px-24 xl:pt-9 2xl:px-[151px] 2xl:pt-10">
      <div className="mx-auto flex w-full max-w-8xl flex-col gap-16">
        <SiteNav active="about" />

        {/* Origin story */}
        <section className="mx-auto grid w-full items-center gap-10 py-8 md:grid-cols-2 md:gap-16 md:py-16 lg:gap-12 xl:gap-14 2xl:gap-[58px]">
          <div className="flex flex-col gap-[30px]">
            <h1 className="max-w-[875px] text-[32px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[42px] md:text-[46px] lg:text-[50px] xl:text-[52px] 2xl:text-[55px]">
              We did not start MAVSCAN because it was trendy.
            </h1>
            <p className={`font-medium text-[#64748B] ${bodyText}`}>
              We started it because the problem became personal.
            </p>
            <div className="max-w-[673px] space-y-6">
              <p className={`font-medium text-[#64748B] ${bodyText}`}>
                When fake alcohol, cosmetics, and medicine directly impacted our circle in a
                single week, the danger became personal. These were not distant stories from the
                news, they affected us directly. It left us with one urgent question:
              </p>
              <p className={`font-semibold text-[#2E3F56] ${bodyText}`}>
                How many people are unknowingly putting themselves at risk every single day?
              </p>
              <p className={`font-medium text-[#64748B] ${bodyText}`}>
                <span className="font-semibold text-[#2E3F56]">MAVSCAN</span> was born from that
                question.
              </p>
            </div>
          </div>

          <ViewfinderFrame className="mx-auto w-full max-w-[min(72vw,280px)] shrink-0 sm:max-w-[360px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[480px] 2xl:max-w-[574px]">
            <div className={aboutViewfinderImageClass}>
              <Image
                src={aboutAssets.heroOrigin}
                alt="Person scanning a product with Mavscan"
                fill
                sizes="(min-width: 1536px) 574px, (min-width: 1280px) 480px, (min-width: 1024px) 380px, (min-width: 768px) 300px, (min-width: 640px) 360px, 280px"
                className="object-cover"
                priority
              />
            </div>
          </ViewfinderFrame>
        </section>

        {/* Mission & Vision — image extends 30px above/below the navy band from md up */}
        <section
          className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-visible bg-[#021728] px-4 py-16 sm:px-6 md:min-h-[var(--mission-image-h-md)] md:bg-transparent md:px-10 md:py-0 lg:min-h-[var(--mission-image-h-lg)] lg:px-12 xl:min-h-[var(--mission-image-h-xl)] xl:px-14 2xl:min-h-[var(--mission-image-h)] 2xl:px-16"
          style={
            {
              "--mission-section-h": `${missionSectionHeightPx}px`,
              "--mission-section-h-md": `${missionMdSectionHeightPx}px`,
              "--mission-section-h-lg": `${missionLgSectionHeightPx}px`,
              "--mission-section-h-xl": `${missionXlSectionHeightPx}px`,
              "--mission-image-h": `${missionImageHeightPx}px`,
              "--mission-image-h-md": `${missionMdImageHeightPx}px`,
              "--mission-image-h-lg": `${missionLgImageHeightPx}px`,
              "--mission-image-h-xl": `${missionXlImageHeightPx}px`,
              "--mission-image-w": `${missionImageWidthPx}px`,
            } as CSSProperties
          }
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-[var(--mission-section-h-md)] -translate-y-1/2 bg-[#021728] md:block lg:h-[var(--mission-section-h-lg)] xl:h-[var(--mission-section-h-xl)] 2xl:h-[var(--mission-section-h)]"
          />
          <div className="relative z-10 mx-auto grid w-full items-center gap-10 md:grid-cols-2 md:min-h-[var(--mission-image-h-md)] md:gap-16 lg:min-h-[var(--mission-image-h-lg)] lg:gap-12 xl:min-h-[var(--mission-image-h-xl)] xl:gap-14 2xl:min-h-[var(--mission-image-h)] 2xl:gap-[59px]">
            <div className="relative flex items-center justify-center overflow-visible md:mt-0">
              <div className="relative aspect-[4/5] h-[min(72vw,400px)] w-full shrink-0 overflow-hidden rounded-[28px] sm:h-[420px] md:aspect-auto md:h-[var(--mission-image-h-md)] md:w-full md:max-w-[320px] lg:h-[var(--mission-image-h-lg)] lg:w-[440px] lg:max-w-[440px] xl:h-[var(--mission-image-h-xl)] xl:w-[520px] xl:max-w-[520px] 2xl:h-[var(--mission-image-h)] 2xl:w-[var(--mission-image-w)] 2xl:max-w-[var(--mission-image-w)]">
                <Image
                  src={aboutAssets.missionVision}
                  alt="Person using Mavscan on their phone"
                  fill
                  sizes="(min-width: 1536px) 614px, (min-width: 1280px) 520px, (min-width: 1024px) 440px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-12 px-0 py-4 text-white md:min-h-[var(--mission-section-h-md)] md:py-6 lg:min-h-[var(--mission-section-h-lg)] lg:gap-16 lg:py-8 xl:min-h-[var(--mission-section-h-xl)] xl:gap-20 xl:py-10 2xl:min-h-[var(--mission-section-h)] 2xl:gap-[89px] 2xl:py-12">
              <div className="max-w-[716px]">
                <h2 className="text-[28px] font-semibold leading-[115%] tracking-[0%] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
                  Our Mission
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#FFFFFF] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]">
                  To improve the wellbeing and standard of living of everyday people by reducing
                  the impact counterfeit products have on society.
                </p>
              </div>
              <div className="max-w-[772px]">
                <h2 className="text-[28px] font-semibold leading-[115%] tracking-[0%] lg:text-[32px] xl:text-[34px] 2xl:text-[36px]">
                  Our Vision
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#FFFFFF] sm:text-[18px] md:text-[20px] lg:text-[24px] xl:text-[26px] 2xl:text-[28px]">
                  In the next five years, we see{" "}
                  <strong className="font-semibold text-white">MAVSCAN</strong> becoming part of
                  everyday consumer life, a trusted companion people use whenever they want to
                  learn more about a product before buying or using it. Just as people check
                  reviews before visiting a restaurant or booking a hotel, we believe product
                  transparency should become second nature.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mx-auto w-full py-8 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
          <h2 className="text-center text-[38px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[48px] lg:text-[52px] xl:text-[54px] 2xl:text-[56px]">
            Our Values
          </h2>
          <div className="mt-10 lg:mt-12 xl:mt-[52px] 2xl:mt-14">
            <ValuesMarquee />
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mx-auto w-full py-8 md:py-16 lg:max-w-[1100px] xl:max-w-[1260px] 2xl:max-w-[1420px]">
          <h2 className="text-center text-[38px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[48px] lg:text-[52px] xl:text-[54px] 2xl:text-[56px]">
            Meet the Team
          </h2>
          <p className="mx-auto mt-[20px] max-w-[640px] text-center text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[18px] lg:text-[19px] 2xl:text-[20px]">
            A passionate team driven by one shared goal: helping people make safer and smarter
            product decisions.
          </p>

          <ul className="mx-auto mt-[40px] grid w-full max-w-[1420px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-6 lg:gap-5 xl:mt-[52px] 2xl:mt-14">
            {teamRowOne.map((member, index) => (
              <li
                key={member.name}
                className={`flex w-full justify-center lg:col-span-2 ${index === 2 ? "sm:col-span-2" : ""}`}
              >
                <TeamCard name={member.name} imageSrc={member.imageSrc} />
              </li>
            ))}
            {teamRowTwo.map((member, index) => (
              <li
                key={member.name}
                className={`flex w-full justify-center lg:col-span-2 ${index === 0 ? "lg:col-start-2" : "lg:col-start-4"}`}
              >
                <TeamCard name={member.name} imageSrc={member.imageSrc} />
              </li>
            ))}
          </ul>
        </section>

        {/* Join the Movement */}
        <section className="mx-auto grid w-full items-center gap-10 py-8 md:grid-cols-2 md:gap-16 md:py-16 lg:gap-16 xl:gap-24 2xl:gap-[116px]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="text-[32px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[42px] md:text-[46px] lg:text-[50px] xl:text-[52px] 2xl:text-[55px]">
              Join The Movement
            </h2>
            <p className={`mx-auto mt-[14px] max-w-[673px] font-medium text-[#64748B] md:mx-0 ${bodyText}`}>
              The future of consumer safety starts with awareness. Be among the first to
              experience MAVSCAN and help shape a smarter, more informed marketplace for everyone.
            </p>
            <Link
              href={siteConfig.waitlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[35px] inline-flex h-[56px] w-fit items-center justify-center rounded-[15px] bg-[#0F0F10] px-8 text-[16px] font-bold text-white"
            >
              Join the Waitlist
            </Link>
          </div>

          <ViewfinderFrame className="mx-auto w-full max-w-[min(72vw,280px)] shrink-0 sm:max-w-[360px] md:max-w-[300px] lg:max-w-[380px] xl:max-w-[480px] 2xl:max-w-[574px]">
            <div className={aboutViewfinderImageClass}>
              <Image
                src={aboutAssets.joinWaitlist}
                alt="Mavscan app scan screen on a phone"
                fill
                sizes="(min-width: 1536px) 574px, (min-width: 1280px) 480px, (min-width: 1024px) 380px, (min-width: 768px) 300px, (min-width: 640px) 360px, 280px"
                className="object-cover"
              />
            </div>
          </ViewfinderFrame>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

function  TeamCard({ name, imageSrc }: { name: string; imageSrc: string }) {
  return (
    <article className="relative aspect-square w-full min-w-0 max-w-[460px] overflow-hidden rounded-[24px]">
      <Image
        src={imageSrc}
        alt={name}
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#1a1a1a]/90" />
      <p className="absolute bottom-6 left-0 right-0 text-center text-[18px] font-semibold text-white sm:text-[20px]">
        {name}
      </p>
    </article>
  );
}
