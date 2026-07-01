import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  image: string;
  title: string;
  model: string;
  href: string;
  buttonText?: string;
  className?: string;
}

export function ProductCard({
  image,
  title,
  model,
  href,
  buttonText = "Acessar Simulador",
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-8 shadow-sm border",
        "flex flex-col items-center text-center",
        "transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative w-full h-64 mb-8">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-2 mb-8">
        <h3 className="text-3xl font-normal leading-tight">
          {title}
        </h3>

        <p className="text-4xl font-bold">
          {model}
        </p>
      </div>

      <Button
        asChild
        size="lg"
        className="w-full rounded-xl h-14 text-lg font-semibold bg-red-600 hover:bg-red-700"
      >
        <Link href={href} target="_blank">
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}