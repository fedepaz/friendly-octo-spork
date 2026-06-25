// app/components/data-display/feature-card/feature-card.tsx

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  href: string;

  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  href,
  className,
}: FeatureCardProps) {
  return (
    <Link href={href} className="block group cursor-pointer focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2">
      <Card
        className={cn(
          "bg-card/20 border-border/40 shadow-premium rounded-none h-full transition-premium hover:bg-card/40 hover:border-primary/40 relative overflow-hidden",
          className,
        )}
      >
        <div className="absolute top-0 right-0 w-12 h-12 bg-primary/5 -rotate-45 translate-x-6 -translate-y-6 group-hover:bg-primary/10 transition-premium" />
        <CardHeader className="p-5 relative">
          <div className="flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-none bg-primary/10 border border-primary/20 text-primary shadow-etched group-hover:bg-primary/20 transition-premium">
              <Icon className="size-5 opacity-80 group-hover:opacity-100" />
            </div>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-40 transition-premium">
              <span className="text-[9px] font-black uppercase tracking-widest">Acceder</span>
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
          <div className="mt-5 space-y-2">
            <CardTitle className="text-xs font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-premium">
              {title}
            </CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground/40 leading-relaxed tracking-tight line-clamp-2">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
