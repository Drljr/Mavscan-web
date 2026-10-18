import type { Metadata } from "next";
import Image from "next/image";
import { CategoriesMarquee } from "@/components/categories-marquee";
import { JoinWaitlistButton } from "@/components/join-waitlist-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { StoreButtons } from "@/components/store-buttons";
import { ViewfinderFrame } from "@/components/viewfinder-frame";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const howItWorksSteps = [
    {
      title: "Scan the item",
      description:
        "Open your app, tap the central Scan icon, and point your phone at the product's barcode or QR code. It's that easy to get started.",
      reverse: false,
      imageSrc: "/asset/Frame-1.webp",
    },
    {
      title: "Verify Authenticity",
      description:
        "The app checks against a verified database and tells you if the product is authentic, expired, or suspicious in real-time.",
      reverse: true,
      imageSrc: "/asset/Frame-2.webp",
    },
    {
      title: "Review Certification & Details",
      description:
        "See safety certifications, manufacturer info, expiry status, ingredients, and more. Make confident, informed decisions every time.",
      reverse: false,
      imageSrc: "/asset/Frame-3.webp",
    },
  ];
  const whyMavscanPoints = [
    "Prevent Fake Product Use",
    "Make Safer Health Choices",
    "Get Verified Product Data",
    "Backed by Trusted Certification Bodies",
    "Simple, Fast, Free to Use",
  ];

  return (
    <main className="w-full bg-white px-4 pt-4 pb-0 text-zinc-900 sm:px-6 md:px-10 md:pt-8 lg:px-16 lg:pt-10">
      <div className="mx-auto flex w-full flex-col gap-16">
        <SiteNav active="home" />

        <section className="flex flex-col items-center text-center">
          <h1 className="max-w-[660px] text-[42px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[56px] lg:text-[70px]">
            <span className="block">Scan Smart</span>
            <span className="block">Buy Confident</span>
          </h1>
          <p className="mt-[13px] max-w-[479px] text-[18px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[20px] lg:text-[22px]">
            Verify the authenticity of cosmetics, wellness products and beverages in seconds
          </p>

          {/* <StoreButtons className="mt-[31px]" /> */}
          <JoinWaitlistButton className="mt-[31px] inline-flex h-[48px] items-center justify-center rounded-[12px] bg-[#0F0F10] px-[32px] text-[16px] font-bold text-white">
            Join waitlist
          </JoinWaitlistButton>
        </section>

        <CategoriesMarquee />

        <section id="how-it-works" className="mx-auto w-full max-w-[1180px] rounded-[32px] px-4 py-12 sm:px-6 md:px-10 md:py-16 scroll-mt-24">
          <h2 className="text-center text-[38px] font-semibold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[48px] lg:text-[60px]">
            How it Works
          </h2>

          <div className="mt-12 flex flex-col gap-12 md:mt-16 md:gap-16">
            {howItWorksSteps.map((step, index) => (
              <article
                key={step.title}
                className={`grid items-center gap-[56px] md:grid-cols-2 ${step.reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
              >
                <ViewfinderFrame
                  showCorners={index === 0}
                  className={index === 1 ? "relative z-10" : undefined}
                >
                  <div className="relative overflow-visible">
                    <div className="relative h-[220px] overflow-hidden rounded-[20px] shadow-[0_15px_45px_rgba(15,15,16,0.12)] md:h-[350px]">
                      <Image
                        src={step.imageSrc}
                        alt={step.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    {index === 1 && (
                      <div className="verified-badge-border">
                        <div className="verified-badge-inner">
                          <Image
                            src="/asset/Group%2018171.svg"
                            alt=""
                            width={90}
                            height={90}
                            unoptimized
                            className="h-full w-full object-contain"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </ViewfinderFrame>

                <div className="mx-auto flex max-w-[544px] flex-col">
                  <div className="mb-[40.5px] h-[48px] w-[39px] bg-[#FF5151]" />
                  <h3 className="align-middle text-[30px] font-semibold leading-[116%] tracking-[0%] text-[#0F0F10] sm:text-[34px] lg:text-[40px]">
                    {step.title}
                  </h3>
                  <p className="mt-[15px] max-w-[529px] text-[18px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[20px] lg:text-[24px]">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] mb-10 mt-20 flex h-auto min-h-[620px] w-screen items-center overflow-visible rounded-[36px] bg-[#001B3D] py-16 sm:mb-12 sm:mt-24 lg:mb-16 lg:mt-36 lg:h-[800px] lg:min-h-0 lg:py-0">
          <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-10">
            <div className="grid items-stretch justify-center gap-6 md:grid-cols-2 lg:-my-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-8 xl:-my-36 xl:grid-cols-[580px_580px] 2xl:-my-48 2xl:grid-cols-[700px_700px]">
              <article className="rounded-[28px] bg-[#1E90FF] px-6 py-10 text-white sm:px-7 md:px-8 md:py-12 lg:px-10 lg:pt-[79px]">
                <h2 className="text-[58px] font-bold leading-[83%] tracking-[0%] sm:text-[74px] lg:text-[100px]">
                  <span className="block">Why</span>
                  <span className="block">Mavscan</span>
                </h2>

                <ul className="mt-10 space-y-6 sm:mt-12 lg:mt-[58px] lg:space-y-[40px]">
                  {whyMavscanPoints.map((point) => (
                    <li key={point} className="flex items-start gap-4 text-[22px] font-semibold leading-[130%] tracking-[0%] sm:text-[27px] lg:gap-[40px] lg:text-[35px] lg:leading-[52px]">
                      <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center self-center rounded-full bg-white/90 text-[#1E90FF] lg:h-[36px] lg:w-[36px]">
                        <svg
                          viewBox="0 0 16 16"
                          className="h-4 w-4"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M3.2 8.2L6.2 11.2L12.8 4.8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="relative overflow-hidden rounded-[28px]">
                <div className="relative h-full min-h-[360px] w-full sm:min-h-[460px] lg:min-h-[860px] xl:min-h-[768px] 2xl:min-h-[927px]">
                  <Image
                    src="/asset/mav-scan.webp"
                    alt="Mavscan product preview"
                    fill
                    sizes="(min-width: 1536px) 700px, (min-width: 1280px) 580px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[1350px] items-center gap-12 lg:gap-10 py-16 md:grid-cols-2 md:py-[120px]">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h2 className="max-w-[620px] text-[32px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[52px] md:text-[42px]">
              Ready to Scan Your <span className="lg:block">First Product?</span>
            </h2>
            <p className="mt-[25px] text-[20px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] md:text-[22px]">
              Download Mavscan for Free
            </p>
            <StoreButtons className="mt-[27px]" />
          </div>

          <div className="relative -mb-14 flex items-center justify-center overflow-visible sm:-mb-20 md:mb-0">
            <div className="relative h-[min(72vw,360px)] w-[min(72vw,360px)] overflow-visible rounded-[30px] bg-[#008AFF1A] sm:h-[400px] sm:w-[400px] md:h-[400px] md:w-[400px] lg:h-[521px] lg:w-[521px]">
              <Image
                src="/asset/Layer%201.png"
                alt="Mavscan app preview"
                width={1764}
                height={2013}
                sizes="(min-width: 1024px) 500px, (min-width: 640px) 390px, 300px"
                className="pointer-events-none absolute -bottom-[72px] -right-[56px] z-10 h-auto w-[300px] max-w-none sm:-bottom-[49px] sm:-right-[78px] sm:w-[390px] md:-bottom-[185px] md:-right-[75px] lg:-bottom-[185px] lg:-right-[110px] lg:w-[500px]"
              />
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
