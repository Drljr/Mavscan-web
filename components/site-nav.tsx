import Image from "next/image";
import Link from "next/link";

type SiteNavProps = {
  active?: "home" | "about";
};

const linkClass = "text-[16px] leading-[100%] tracking-[-3%] text-[#0F0F10]";

export function SiteNav({ active = "home" }: SiteNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-[24px]"
    >
      <Link href="/" aria-label="Mavscan home" className="inline-flex items-center">
        <Image
          src="/asset/mavscan-full-black%201.svg"
          alt="Mavscan"
          width={120}
          height={120}
          priority
        />
      </Link>
      <div className="flex items-center gap-[24px]">
        <Link
          href="/"
          className={`${linkClass} ${active === "home" ? "font-bold" : "font-normal"}`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`${linkClass} ${active === "about" ? "font-bold" : "font-normal"}`}
        >
          About us
        </Link>
      </div>
    </nav>
  );
}
