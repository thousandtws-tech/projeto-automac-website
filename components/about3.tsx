import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/src/components/kibo-ui/marquee";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface About3Props {
  className?: string;
  title: string;
  description?: string;
  mainImage: {
    src: string;
    alt: string;
  };
  secondaryImage: {
    src: string;
    alt: string;
  };
  breakout: {
    src?: string;
    alt?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companies?: Array<{
    src: string;
    alt: string;
  }> | null;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
  contentSections?: Array<{
    title: string;
    content: string;
  }>;
}

const About3 = ({
  className,
  title = "About Us",
  description = "We are a passionate team dedicated to creating innovative solutions that empower businesses to thrive in the digital age. With years of experience in design and development, we craft beautiful, accessible components that help teams build faster.",
  mainImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-MChSQHxGZrQ-unsplash.jpg",
    alt: "about",
  },
  secondaryImage = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/photos/annie-spratt-AkftcHujUmk-unsplash.jpg",
    alt: "about",
  },
  breakout = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "logo",
    title: "Hundreds of blocks at Shadcnblocks.com",
    description:
      "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
    buttonText: "Discover more",
    buttonUrl: "https://www.shadcnblocks.com",
  },
  achievementsTitle = "Our Achievements in Numbers",
  achievementsDescription = "Providing businesses with effective tools to improve workflows, boost efficiency, and encourage growth.",
  achievements = [
    { label: "Companies ", value: "300+" },
    { label: "Projects Finalized", value: "800+" },
    { label: "Happy Customers", value: "99%" },
    { label: "Recognized Awards", value: "10+" },
  ],
  contentSections = [
    {
      title: "Our Vision",
      content:
        "For years, the process of building custom software has remained challenging. Today, visual builders exist, but tailored solutions still require technical expertise and a lot of time. This is a problem for businesses and individuals alike.\n\nWhat if you could create custom software without writing a single line of code? What if you could build your own tools.\n\nWith our platform, you can! Our tools let you design layouts and create functionality—all without needing to code.\n\nWe believe that everyone should be able to build their own solutions, regardless of their technical background.",
    },
    {
      title: "Our Creators",
      content:
        "Our company has been building web tools for over a decade, focusing on efficiency and user control in every project. We know that the best solutions are the ones that you can create yourself.\n\nWe initially developed these solutions for our own team, and now everyone can benefit from them too. We are proud to offer a platform that is accessible to all, regardless of technical expertise.\n\nOur team is made up of talented individuals who are passionate about creating tools that empower users to build their own solutions with ease. We are dedicated to helping you achieve your goals.",
    },
  ],
}: About3Props) => {
  return (
    <section className={cn("bg-white", className)}>
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col gap-4 lg:w-2/3">
          <h1 className="text-4xl lg:text-6xl font-black tracking-tighter text-black uppercase">
            {title}
          </h1>
          <p className="text-base text-neutral-600 md:text-lg leading-relaxed">
            {description}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] border border-black object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-6 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-5 border border-black bg-white p-6 md:w-1/2 lg:w-auto">
              <img
                src={breakout.src}
                alt={breakout.alt}
                className="mr-auto h-10 grayscale opacity-80"
              />
              <div>
                <p className="mb-2 text-lg font-black uppercase tracking-tight text-black">{breakout.title}</p>
                <p className="text-neutral-600 leading-relaxed text-sm">{breakout.description}</p>
              </div>
              <Button className="mr-auto bg-brand-red-500 hover:bg-brand-red-600 text-white font-bold uppercase tracking-widest px-6 h-11" asChild>
                <a href={breakout.buttonUrl} target="_blank">
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 border border-black object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        <div className="mt-14 md:mt-20 border-2 border-black bg-white p-8 md:p-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
              {achievementsTitle}
            </h2>
            <p className="max-w-xl text-neutral-600 leading-relaxed">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:flex md:flex-wrap md:justify-between">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-1" key={item.label + idx}>
                <span className="text-4xl md:text-5xl font-black text-brand-red-500 tracking-tighter">
                  {item.value}
                </span>
                <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {contentSections && contentSections.length > 0 && (
          <div className="mx-auto grid max-w-5xl gap-12 py-20 md:grid-cols-2 md:gap-20">
            {contentSections.map((section, idx) => (
              <div key={section.title + idx}>
                <h2 className="mb-4 text-2xl font-black text-black uppercase tracking-tight">{section.title}</h2>
                <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export { About3 };
