import Image from "next/image";
import { Marquee } from "@/components/marquee";

const categories = [
  { name: "Health Products", imageSrc: "/asset/category-health-products.webp" },
  { name: "Wellness Products", imageSrc: "/asset/Rectangle%201722.webp" },
  { name: "Cosmetics", imageSrc: "/asset/Rectangle%201723.webp" },
  { name: "Beverages", imageSrc: "/asset/category-beverages.webp" },
] as const;

type Category = (typeof categories)[number];

function CategoryCard({ item, hidden }: { item: Category; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className="relative h-[min(85vw,280px)] w-[min(85vw,280px)] shrink-0 overflow-hidden rounded-[30px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px] lg:h-[480px] lg:w-[480px] xl:h-[520px] xl:w-[520px] 2xl:h-[583px] 2xl:w-[583px]"
    >
      <Image
        src={item.imageSrc}
        alt={item.name}
        fill
        draggable={false}
        sizes="(min-width: 1536px) 583px, (min-width: 1280px) 520px, (min-width: 1024px) 480px, (min-width: 768px) 400px, (min-width: 640px) 320px, 280px"
        className="object-cover object-center select-none"
      />
      <div className="absolute bottom-[20px] left-[20px] right-[20px] text-center text-[18px] font-normal leading-[100%] tracking-[-3%] text-white sm:text-[20px]">
        {item.name}
      </div>
    </article>
  );
}

export function CategoriesMarquee() {
  return (
    <Marquee
      label="Product categories"
      trackClassName="gap-5 px-4 sm:px-6 md:gap-6 lg:gap-5 2xl:gap-8"
      clone={categories.map((item) => (
        <CategoryCard key={`clone-${item.name}`} item={item} hidden />
      ))}
    >
      {categories.map((item) => (
        <CategoryCard key={item.name} item={item} />
      ))}
    </Marquee>
  );
}
