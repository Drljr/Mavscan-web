import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  const { contact } = siteConfig;
  const displayPhone = contact.phone.replace("+234", "0");

  return (
    <footer className="relative ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] w-screen rounded-t-[32px] bg-[#021728] px-6 pb-12 pt-[93px] text-white md:px-16 md:pb-14 md:pt-[93px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16">
        <div className="grid justify-items-center gap-10 md:grid-cols-[1.2fr_1fr] md:justify-items-stretch">
          <div className="flex flex-wrap justify-center gap-10 text-center md:justify-start md:gap-[87px] md:text-left">
            <Link
              href="/"
              aria-label="Mavscan home"
              className="inline-flex items-start justify-center pt-[15px] md:justify-start"
            >
              <Image
                src="/asset/mavscan-full-white%201.svg"
                alt="Mavscan"
                width={150}
                height={150}
                className="object-contain"
                style={{ height: "auto" }}
              />
            </Link>

            <div className="grid grid-cols-2 gap-[40px] pt-[30px] text-[#D6E3F5] sm:gap-[60px]">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-[24px] font-semibold leading-[100%] tracking-[1%] text-white">
                  Company
                </h4>
                <Link
                  href="/about"
                  className="font-eina01 block text-[24px] font-normal leading-[100%] tracking-[-3%] text-[#94A3B8]"
                >
                  About
                </Link>
                <a
                  href="#"
                  className="font-eina01 block text-[24px] font-normal leading-[100%] tracking-[-3%] text-[#94A3B8]"
                >
                  Blog
                </a>
              </div>
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-[24px] font-semibold leading-[100%] tracking-[1%] text-white">
                  Legal
                </h4>
                <a
                  href="#"
                  className="font-eina01 block text-[24px] font-normal leading-[100%] tracking-[-3%] text-[#94A3B8]"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="font-eina01 block text-[24px] font-normal leading-[100%] tracking-[-3%] text-[#94A3B8]"
                >
                  Terms of Use
                </a>
                <a
                  href="#"
                  className="font-eina01 block text-[24px] font-normal leading-[100%] tracking-[-3%] text-[#94A3B8]"
                >
                  Enterprise
                </a>
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-[430px] flex-col items-center justify-self-start pb-[100px] text-center md:mx-0 md:items-end md:justify-self-end md:pb-[240px] md:text-right">
            <div className="mb-[30px] flex items-center justify-center gap-5 text-[#F5F9FF] md:justify-end">
              <a
                href="https://www.linkedin.com/company/mavscan"
                aria-label="LinkedIn"
                className="inline-flex"
              >
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
              {contact.address}
              <span className="mt-8 block text-[#F5F9FF]">{contact.email}</span>
              <span className="mt-6 block text-[#F5F9FF]">{displayPhone}</span>
            </p>
          </div>
        </div>

        <p className="text-center text-[24px] font-semibold leading-[108%] tracking-[0%] text-[#F5F9FF]">
          2016 - 2025 Mavscan Ltd - RC 14059722
        </p>
      </div>
    </footer>
  );
}
