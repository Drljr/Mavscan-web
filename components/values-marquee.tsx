import Image from "next/image";
import { Marquee } from "@/components/marquee";
import { valuesCards } from "@/lib/about-content";

type ValueCard = (typeof valuesCards)[number];

function ValueCardArticle({ card, hidden }: { card: ValueCard; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className={`flex h-[350px] w-[320px] shrink-0 flex-col items-center rounded-[28px] px-6 pb-0 pt-8 text-center sm:h-[350px] sm:w-[360px] lg:h-[500px] lg:w-[420px] xl:h-[540px] xl:w-[560px] 2xl:h-[571px] 2xl:w-[675px] ${card.bgClass}`}
    >
      <h3 className={`text-[22px] font-bold sm:text-[24px] lg:text-[36px] xl:text-[42px] 2xl:text-[50px] ${card.titleClass}`}>
        {card.title}
      </h3>
      <p
        className={`mt-3 text-[14px] font-medium leading-[129%] tracking-[-1.5%] lg:text-[20px] xl:text-[24px] 2xl:text-[24px] ${card.descriptionMaxWClass} ${card.titleClass} opacity-90`}
      >
        {card.description}
      </p>
      <div className="relative mt-auto h-[180px] w-full sm:h-[200px] lg:h-[280px] xl:h-[320px] 2xl:h-[390px]">
        <Image
          src={card.imageSrc}
          alt=""
          fill
          draggable={false}
          sizes="675px"
          className="object-contain object-bottom select-none"
        />
      </div>
    </article>
  );
}

export function ValuesMarquee() {
  return (
    <Marquee
      label="Our values"
      trackClassName="gap-6 px-4 sm:px-6 lg:gap-5 2xl:gap-[24px]"
      clone={valuesCards.map((card) => (
        <ValueCardArticle key={`clone-${card.title}`} card={card} hidden />
      ))}
    >
      {valuesCards.map((card) => (
        <ValueCardArticle key={card.title} card={card} />
      ))}
    </Marquee>
  );
}
