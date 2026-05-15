import Image from "next/image";
import { siteConfig } from "@/lib/site";

export default function Home() {
  const categories = [
    { name: "Health Products", imageSrc: "/asset/Rectangle 1725.png" },
    { name: "Wellness Products", imageSrc: "/asset/Rectangle 1722.png" },
    { name: "Cosmetics", imageSrc: "/asset/Rectangle 1723.png" },
    { name: "Beverages", imageSrc: "/asset/Rectangle 1724.png" },
  ];
  const howItWorksSteps = [
    {
      title: "Scan the item",
      description:
        "Open your app, tap the central Scan icon, and point your phone at the product's barcode or QR code. It's that easy to get started.",
      reverse: false,
      imageSrc: "/asset/Frame-1.png",
    },
    {
      title: "Verify Authenticity",
      description:
        "The app checks against a verified database and tells you if the product is authentic, expired, or suspicious in real-time.",
      reverse: true,
      imageSrc: "/asset/Frame-2.png",
    },
    {
      title: "Review Certification & Details",
      description:
        "See safety certifications, manufacturer info, expiry status, ingredients, and more. Make confident, informed decisions every time.",
      reverse: false,
      imageSrc: "/asset/Frame-3.png",
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
      <div className="mx-auto flex w-full max-w-8xl flex-col gap-16">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-[24px]"
        >
          <a href="#" aria-label="Mavscan home" className="inline-flex items-center">
            <Image
              src="/asset/mavscan-full-black%201.svg"
              alt="Mavscan"
              width={120}
              height={120}
              priority
            />
          </a>
          <div className="flex items-center gap-[24px] text-[16px] font-bold leading-[100%] tracking-[-3%] text-[#0F0F10]">
            <a href="#">Home</a>
            <a href="#how-it-works">How it works</a>
            <a href="#">About us</a>
          </div>
        </nav>

        <section className="flex flex-col items-center text-center">
          <h1 className="max-w-[660px] text-[42px] font-bold leading-[108%] tracking-[0%] text-[#0F0F10] sm:text-[56px] lg:text-[70px]">
            <span className="block">Scan Smart</span>
            <span className="block">Buy Confident</span>
          </h1>
          <p className="mt-[13px] max-w-[479px] text-[18px] font-normal leading-[144%] tracking-[-1.5%] text-[#64748B] sm:text-[20px] lg:text-[22px]">
            Verify the authenticity of cosmetics, wellness products and beverages in seconds
          </p>

          {/* <div className="mt-[31px] inline-flex overflow-hidden rounded-[20px] border-[2px] border-dashed border-[#1D2D4D] p-1 gap-[8px]">
            <button className="flex items-center gap-[10px] rounded-[12px] bg-[#F3F7F8] w-auto px-[24px] h-[48px] text-[16px] font-semibold leading-[100%] tracking-[-3%] text-[#0B142D]">
              <svg
                width="20"
                height="22"
                viewBox="0 0 18 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12.864 3.649C13.67 2.66 14.247 1.297 14.101 0C12.927 0.048 11.504 0.78 10.675 1.77C9.937 2.63 9.286 4.016 9.456 5.266C10.766 5.36 12.036 4.638 12.864 3.649Z"
                  fill="#0B142D"
                />
                <path
                  d="M17.88 15.705C17.359 16.893 17.108 17.422 16.435 18.46C15.495 19.921 14.167 21.741 12.515 21.753C11.046 21.768 10.668 20.797 8.671 20.809C6.674 20.821 6.257 21.771 4.787 21.757C3.134 21.741 1.876 20.1 0.935 18.64C-1.693 14.569 -1.965 9.786 -0.345 7.314C0.808 5.54 2.63 4.501 4.341 4.501C6.086 4.501 7.185 5.472 8.649 5.472C10.067 5.472 10.93 4.5 12.945 4.5C14.466 4.5 16.078 5.331 17.231 6.766C13.47 8.944 14.08 14.29 17.88 15.705Z"
                  fill="#0B142D"
                />
              </svg>
              <span>Get on iPhone</span>
            </button>
            <button className="flex items-center gap-[8px] rounded-[12px] bg-[#0F0F10] w-auto px-[24px] h-[48px] text-[16px] font-semibold leading-[100%] tracking-[-3%] text-[#F3F7F8]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M3 2.5L14.182 12L3 21.5V2.5Z" fill="#34A853" />
                <path d="M14.182 12L18.09 8.679L6.478 1.94C5.67 1.471 4.66 1.834 4.33 2.664L14.182 12Z" fill="#FBBC04" />
                <path d="M14.182 12L4.33 21.336C4.66 22.166 5.67 22.529 6.478 22.06L18.09 15.321L14.182 12Z" fill="#EA4335" />
                <path d="M18.09 8.679L14.182 12L18.09 15.321L21.732 13.206C22.756 12.611 22.756 11.389 21.732 10.794L18.09 8.679Z" fill="#4285F4" />
              </svg>
              <span>Get on Android</span>
            </button>
          </div> */}
          <a
            href={siteConfig.waitlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[31px] inline-flex h-[48px] items-center justify-center rounded-[12px] bg-[#0F0F10] px-[32px] text-[16px] font-bold text-white"
          >
            Join waitlist
          </a>
        </section>

        <section className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] grid w-screen grid-cols-1 gap-5 px-6 md:grid-cols-2 md:px-10 xl:grid-cols-4 xl:gap-8 xl:px-12">
          {categories.map((item) => (
            <article
              key={item.name}
              className="relative aspect-square w-full overflow-hidden rounded-[30px]"
            >
              <Image
                src={item.imageSrc}
                alt={item.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-[20px] left-[20px] right-[20px] text-center text-[20px] font-normal leading-[100%] tracking-[-3%] text-white">
                {item.name}
              </div>
            </article>
          ))}
        </section>

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
                <div className="relative">
                  <div className="relative h-[220px] overflow-hidden rounded-[20px] shadow-[0_15px_45px_rgba(15,15,16,0.12)] md:h-[350px]">
                    <Image
                      src={step.imageSrc}
                      alt={step.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                    {index === 1 && (
                      <div className="absolute right-[-14] top-[-14] flex h-14 w-14 items-center justify-center overflow-hidden rounded-[20px] border border-white/50 bg-white/50 p-2">
                        <Image
                          src="/asset/Group%2018171.svg"
                          alt=""
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>
                  {index === 0 && (
                    <>
                      <div className="absolute -left-4 -top-4 h-[30px] w-[30px] rounded-tl-[12px] border-l-[3px] border-t-[3px] border-[#22C55E]" />
                      <div className="absolute -right-4 -top-4 h-[30px] w-[30px] rounded-tr-[12px] border-r-[3px] border-t-[3px] border-[#22C55E]" />
                      <div className="absolute -bottom-4 -left-4 h-[30px] w-[30px] rounded-bl-[12px] border-b-[3px] border-l-[3px] border-[#22C55E]" />
                      <div className="absolute -bottom-4 -right-4 h-[30px] w-[30px] rounded-br-[12px] border-b-[3px] border-r-[3px] border-[#22C55E]" />
                    </>
                  )}
                </div>

                <div className="mx-auto flex max-w-[544px] flex-col">
                  <div className="mb-[40.5px] h-[48px] w-[39px] bg-[#FF5151]" />
                  <h3 className="font-outfit align-middle text-[30px] font-semibold leading-[116%] tracking-[0%] text-[#0F0F10] sm:text-[34px] lg:text-[40px]">
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
                <h3 className="text-[58px] font-bold leading-[83%] tracking-[0%] sm:text-[74px] lg:text-[100px]">
                  <span className="block">Why</span>
                  <span className="block">Mavscan</span>
                </h3>

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
                    src="/asset/mav-scan.jpg"
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
            <div className="mt-[27px] inline-flex overflow-hidden rounded-[20px] border-[2px] border-dashed border-[#1D2D4D] p-1 gap-[8px]">
              <button className="flex items-center gap-[10px] rounded-[12px] bg-[#F3F7F8] w-auto px-[24px] h-[48px] text-[16px] font-semibold leading-[100%] tracking-[-3%] text-[#0B142D]">
                <svg width="20" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12.864 3.649C13.67 2.66 14.247 1.297 14.101 0C12.927 0.048 11.504 0.78 10.675 1.77C9.937 2.63 9.286 4.016 9.456 5.266C10.766 5.36 12.036 4.638 12.864 3.649Z" fill="#0B142D" />
                  <path d="M17.88 15.705C17.359 16.893 17.108 17.422 16.435 18.46C15.495 19.921 14.167 21.741 12.515 21.753C11.046 21.768 10.668 20.797 8.671 20.809C6.674 20.821 6.257 21.771 4.787 21.757C3.134 21.741 1.876 20.1 0.935 18.64C-1.693 14.569 -1.965 9.786 -0.345 7.314C0.808 5.54 2.63 4.501 4.341 4.501C6.086 4.501 7.185 5.472 8.649 5.472C10.067 5.472 10.93 4.5 12.945 4.5C14.466 4.5 16.078 5.331 17.231 6.766C13.47 8.944 14.08 14.29 17.88 15.705Z" fill="#0B142D" />
                </svg>
                <span>Get on iPhone</span>
              </button>
              <button className="flex items-center gap-[8px] rounded-[12px] bg-[#0F0F10] w-auto px-[24px] h-[48px] text-[16px] font-semibold leading-[100%] tracking-[-3%] text-[#F3F7F8]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 2.5L14.182 12L3 21.5V2.5Z" fill="#34A853" />
                  <path d="M14.182 12L18.09 8.679L6.478 1.94C5.67 1.471 4.66 1.834 4.33 2.664L14.182 12Z" fill="#FBBC04" />
                  <path d="M14.182 12L4.33 21.336C4.66 22.166 5.67 22.529 6.478 22.06L18.09 15.321L14.182 12Z" fill="#EA4335" />
                  <path d="M18.09 8.679L14.182 12L18.09 15.321L21.732 13.206C22.756 12.611 22.756 11.389 21.732 10.794L18.09 8.679Z" fill="#4285F4" />
                </svg>
                <span>Get on Android</span>
              </button>
            </div>
          </div>

          <div className="relative -mb-14 flex items-center justify-center overflow-visible sm:-mb-20 md:mb-0">
            <div className="relative h-[min(72vw,360px)] w-[min(72vw,360px)] overflow-visible rounded-[30px] bg-[#008AFF1A] sm:h-[400px] sm:w-[400px] md:h-[400px] md:w-[400px] lg:h-[521px] lg:w-[521px]">
              <Image
                src="/asset/Layer%201.png"
                alt="Mavscan app preview"
                width={610}
                height={833}
                sizes="(min-width: 1024px) 500px, (min-width: 768px) 390px, (min-width: 640px) 390px, 300px"
                className="pointer-events-none absolute -bottom-[72px] -right-[56px] z-10 h-auto w-[300px] max-w-none sm:-bottom-[49px] sm:-right-[78px] sm:w-[390px] md:-bottom-[185px] md:-right-[75px] md:w-[350px] lg:-bottom-[185px] lg:-right-[110px] lg:w-[500px]"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        </section>

        <footer className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen rounded-t-[32px] bg-[#021728] px-6 pb-12 pt-[93px] text-white md:px-16 md:pb-14 md:pt-[93px]">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16">
            <div className="grid justify-items-center gap-10 md:grid-cols-[1.2fr_1fr] md:justify-items-stretch">
              <div className="flex flex-wrap justify-center gap-10 text-center md:justify-start md:gap-[87px] md:text-left">
                <a href="#" aria-label="Mavscan home" className="inline-flex items-start justify-center pt-[15px] md:justify-start">
                  <Image
                    src="/asset/mavscan-full-white%201.svg"
                    alt="Mavscan"
                    width={150}
                    height={150}
                    className="object-contain"
                    style={{ height: "auto" }}
                  />
                </a>

                <div className="grid grid-cols-2 gap-[40px] pt-[30px] text-[#D6E3F5] sm:gap-[60px]">
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-[24px] font-semibold leading-[100%] tracking-[1%] text-white">Company</h4>
                    <a href="#" className="font-eina01 block text-[24px] text-normal leading-[100%] tracking-[-3%] text-[#94A3B8]">About</a>
                    <a href="#" className="font-eina01 block text-[24px] text-normal leading-[100%] tracking-[-3%] text-[#94A3B8]">Blog</a>
                  </div>
                  <div className="space-y-2 text-center md:text-left">
                    <h4 className="text-[24px] font-semibold leading-[100%] tracking-[1%] text-white">Legal</h4>
                    <a href="#" className="font-eina01 block text-[24px] text-normal leading-[100%] tracking-[-3%] text-[#94A3B8]">Privacy Policy</a>
                    <a href="#" className="font-eina01 block text-[24px] text-normal leading-[100%] tracking-[-3%] text-[#94A3B8]">Terms of Use</a>
                    <a href="#" className="font-eina01 block text-[24px] text-normal leading-[100%] tracking-[-3%] text-[#94A3B8]">Enterprise</a>
                  </div>
                </div>
              </div>

              <div className="justify-self-start mx-auto flex max-w-[430px] flex-col items-center text-center md:mx-0 md:items-end md:justify-self-end md:text-right pb-[100px] md:pb-[240px]">
                <div className="mb-[30px] flex items-center justify-center gap-5 text-[#F5F9FF] md:justify-end">
                  <a href="https://www.linkedin.com/company/mavscan" aria-label="LinkedIn" className="inline-flex">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                      <path d="M19 0H5C2.239 0 0 2.239 0 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5V5c0-2.761-2.239-5-5-5ZM8 19H5V8h3v11ZM6.5 6.732c-.966 0-1.75-.784-1.75-1.75S5.534 3.232 6.5 3.232s1.75.784 1.75 1.75-.784 1.75-1.75 1.75ZM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19Z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="inline-flex">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                      <path d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3Zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9Zm10.1 1.3a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
                    </svg>
                  </a>
                </div>
                <p className="max-w-[359px] text-center text-[24px] font-normal leading-[100%] tracking-[-3%] text-white md:text-right">
                  Adebisi Ogunniyi Crescent, Lagos, Nigeria.
                  <span className="mt-8 block text-[#F5F9FF]">hello@mavscans.com</span>
                  <span className="mt-6 block text-[#F5F9FF]">0806 091 4935</span>
                </p>
              </div>
            </div>

            <p className="text-center text-[24px] font-semibold leading-[108%] tracking-[0%] text-[#F5F9FF]">
              2016 - 2025 Mavscan Ltd - RC 14059722
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
