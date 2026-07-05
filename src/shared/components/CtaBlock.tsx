import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CtaBlockProps {
  title: string;
  highlight?: string;
  description?: string;
  buttonText: string;
  buttonHref?: string;
  variant?: "red" | "white" | "bordered";
}

export function CtaBlock({
  title,
  highlight,
  description,
  buttonText,
  buttonHref = "/contato",
  variant = "red",
}: CtaBlockProps) {
  const bgClass =
    variant === "red"
      ? "bg-brand-red-600"
      : variant === "bordered"
        ? "border-2 border-black bg-white"
        : "bg-white";

  return (
    <section className={`${bgClass} py-20 md:py-24 px-6 border-t border-black`}>
      <div className="mx-auto max-w-4xl w-full text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase leading-[0.9] max-w-3xl mx-auto">
          <span className={variant === "red" ? "text-white" : "text-black"}>{title}</span>
          {highlight && (
            <span className={variant === "red" ? "text-white/80" : "text-brand-red-500"}>
              {" "}{highlight}
            </span>
          )}
        </h2>

        <div
          className={`h-[3px] w-24 mx-auto my-6 bg-gradient-to-l from-transparent ${
            variant === "red" ? "to-white/60" : "to-brand-red-500"
          }`}
        />

        {description && (
          <p
            className={`text-base max-w-2xl mx-auto leading-relaxed ${
              variant === "red" ? "text-white/80" : "text-neutral-600"
            }`}
          >
            {description}
          </p>
        )}

        <Button
          asChild
          className={`mt-8 font-bold uppercase tracking-widest px-10 h-14 text-sm rounded-md hover:scale-105 transition-all duration-300 ${
            variant === "red"
              ? "bg-white text-brand-red-600 hover:bg-white/90"
              : "bg-brand-red-500 text-white hover:bg-brand-red-600"
          }`}
        >
          <Link href={buttonHref}>
            {buttonText}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
