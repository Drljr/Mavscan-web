import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { ViewfinderFrame } from "@/components/viewfinder-frame";
import { aboutAssets, teamMembers, valuesCards } from "@/lib/about-content";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn how Mavscan started and our mission to reduce counterfeit product risk.",
  alternates: { canonical: "/about" },
};

const aboutViewfinderImageClass =
  "relative mx-auto overflow-hidden rounded-[20px] shadow-[0_15px_45px_rgba(15,15,16,0.12)] h-[min(72vw,280px)] w-[min(72vw,280px)] sm:h-[360px] sm:w-[360px] md:h-[480px] md:w-[480px] lg:h-[574px] lg:w-[574px]";

const missionSectionHeightPx = 806;
const missionImageWidthPx = 614;
const missionImageOverflowPx = 32;
const missionImageHeightPx =
  missionSectionHeightPx + missionImageOverflowPx * 2;

export default function AboutPage() {
  const teamRowOne = teamMembers.slice(0, 3);
  const teamRowTwo = teamMembers.slice(3);

  return (
    <main className="w-full bg-white px-4 pt-4 pb-0 text-zinc-900 sm:px-6 md:px-10 md:pt-8 lg:px-16 lg:pt-10">
      <div className="mx-auto flex w-full max-w-8xl flex-col gap-16">
        <SiteNav active="about" />

        {/* Origin story */}
        <section className="mx-auto grid w-full max-w-[1280px] items-center gap-10 py-8 md:grid-cols-2 md:gap-16 md:py-16 lg:gap-20">
          <div className="flex flex-col">
            <h1 className="text-[32px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[42px] lg:text-[52px]">
              We did not start MAVSCAN because it was trendy.
            </h1>
            <p className="mt-4 text-[20px] font-semibold leading-[130%] text-[#334155] sm:text-[24px] lg:text-[28px]">
              We started it because the problem became personal.
            </p>
            <p className="mt-6 text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[18px] lg:text-[20px]">
              When fake alcohol, cosmetics, and medicine directly impacted our circle in a
              single week, the danger became personal. These were not distant stories from the
              news, they affected us directly. It left us with one urgent question:
            </p>
            <p className="mt-6 text-[18px] font-bold leading-[144%] tracking-[-1.5%] text-[#0F0F10] sm:text-[20px] lg:text-[22px]">
              How many people are unknowingly putting themselves at risk every single day?
            </p>
            <p className="mt-6 text-[18px] font-bold leading-[144%] text-[#334155] sm:text-[20px]">
              MAVSCAN was born from that question.
            </p>
          </div>

          <ViewfinderFrame className="mx-auto shrink-0">
            <div className={aboutViewfinderImageClass}>
              <Image
                src={aboutAssets.heroOrigin}
                alt="Person scanning a product with Mavscan"
                fill
                sizes="(min-width: 1024px) 574px, (min-width: 768px) 480px, (min-width: 640px) 360px, 280px"
                className="object-cover"
                priority
              />
            </div>
          </ViewfinderFrame>
        </section>

        {/* Mission & Vision — image extends 32px above/below the 806px navy band */}
        <section
          className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen overflow-visible bg-[#021728] px-4 py-16 sm:px-6 md:px-10 md:py-20 lg:min-h-[var(--mission-image-h)] lg:bg-transparent lg:px-16 lg:py-0"
          style={
            {
              "--mission-section-h": `${missionSectionHeightPx}px`,
              "--mission-image-h": `${missionImageHeightPx}px`,
              "--mission-image-w": `${missionImageWidthPx}px`,
            } as CSSProperties
          }
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 z-0 hidden h-[var(--mission-section-h)] -translate-y-1/2 bg-[#021728] lg:block"
          />
          <div className="relative z-10 mx-auto grid w-full max-w-[1280px] items-center gap-10 md:grid-cols-2 md:gap-16 lg:min-h-[var(--mission-image-h)] lg:gap-12">
            <div className="relative flex items-center justify-center overflow-visible md:-mt-16 lg:mt-0">
              <div className="relative aspect-[4/5] h-[min(72vw,400px)] w-full shrink-0 overflow-hidden rounded-[28px] sm:h-[420px] md:max-w-[520px] lg:aspect-auto lg:h-[var(--mission-image-h)] lg:w-[var(--mission-image-w)] lg:max-w-[var(--mission-image-w)]">
                <Image
                  src={aboutAssets.missionVision}
                  alt="Person using Mavscan on their phone"
                  fill
                  sizes="(min-width: 1024px) 614px, (min-width: 768px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center gap-12 px-0 py-4 text-white md:py-4 lg:min-h-[var(--mission-section-h)] lg:gap-14 lg:py-12">
              <div>
                <h2 className="text-[28px] font-bold leading-[108%] sm:text-[36px] lg:text-[42px]">
                  Our Mission
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#E2E8F0] sm:text-[18px] lg:text-[20px]">
                  To improve the wellbeing and standard of living of everyday people by reducing
                  the impact counterfeit products have on society.
                </p>
              </div>
              <div>
                <h2 className="text-[28px] font-bold leading-[108%] sm:text-[36px] lg:text-[42px]">
                  Our Vision
                </h2>
                <p className="mt-4 text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#E2E8F0] sm:text-[18px] lg:text-[20px]">
                  In the next five years, we see{" "}
                  <strong className="font-bold text-white">MAVSCAN</strong> becoming part of
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
        <section className="mx-auto w-full max-w-[1280px] py-8 md:py-16">
          <h2 className="text-center text-[38px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[48px] lg:text-[56px]">
            Our Values
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {valuesCards.map((card) => (
              <article
                key={card.title}
                className={`flex flex-col items-center rounded-[28px] px-6 pb-0 pt-8 text-center ${card.bgClass}`}
              >
                <h3 className={`text-[22px] font-bold sm:text-[24px] ${card.titleClass}`}>
                  {card.title}
                </h3>
                <p
                  className={`mt-3 max-w-[280px] text-[14px] font-normal leading-[144%] sm:text-[15px] ${card.titleClass} opacity-90`}
                >
                  {card.description}
                </p>
                <div className="relative mt-6 h-[180px] w-full sm:h-[200px]">
                  <Image
                    src={card.imageSrc}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain object-bottom"
                    aria-hidden
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mx-auto w-full max-w-[1280px] py-8 md:py-16">
          <h2 className="text-center text-[38px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[48px] lg:text-[56px]">
            Meet the Team
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-center text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[18px] lg:text-[20px]">
            A passionate team driven by one shared goal: helping people make safer and smarter
            product decisions.
          </p>

          <div className="mt-10 flex flex-col gap-6 lg:mt-14 lg:gap-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {teamRowOne.map((member) => (
                <TeamCard key={member.name} name={member.name} imageSrc={member.imageSrc} />
              ))}
            </div>
            <div className="mx-auto grid w-full max-w-[880px] grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
              {teamRowTwo.map((member) => (
                <TeamCard key={member.name} name={member.name} imageSrc={member.imageSrc} />
              ))}
            </div>
          </div>
        </section>

        {/* Join the Movement */}
        <section className="mx-auto grid w-full max-w-[1280px] items-center gap-10 py-8 md:grid-cols-2 md:gap-16 md:py-16 lg:gap-20">
          <div className="flex flex-col">
            <h2 className="text-[32px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[42px] lg:text-[48px]">
              Join The Movement
            </h2>
            <p className="mt-6 text-[16px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[18px] lg:text-[20px]">
              The future of consumer safety starts with awareness. Be among the first to
              experience MAVSCAN and help shape a smarter, more informed marketplace for everyone.
            </p>
            <Link
              href={siteConfig.waitlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex h-[48px] w-fit items-center justify-center rounded-full bg-[#0F0F10] px-8 text-[16px] font-bold text-white"
            >
              Join the Waitlist
            </Link>
          </div>

          <ViewfinderFrame className="mx-auto shrink-0">
            <div className={aboutViewfinderImageClass}>
              <Image
                src={aboutAssets.joinWaitlist}
                alt="Mavscan app scan screen on a phone"
                fill
                sizes="(min-width: 1024px) 574px, (min-width: 768px) 480px, (min-width: 640px) 360px, 280px"
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

function TeamCard({ name, imageSrc }: { name: string; imageSrc: string }) {
  return (
    <article className="relative aspect-square w-full overflow-hidden rounded-[24px]">
      <Image src={imageSrc} alt={name} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-[#1a1a1a]/90" />
      <p className="absolute bottom-6 left-0 right-0 text-center text-[18px] font-semibold text-white sm:text-[20px]">
        {name}
      </p>
    </article>
  );
}
