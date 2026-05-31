// src/components/common/logo.tsx
import { cn } from "@/lib/utils";
import { MarioIcon } from "./icons/marioIcon";
import { MarioSidebar } from "./icons/marioSidebar";
import { MarioFull } from "./icons/marioFull";
interface LogoProps {
  variant?: "full" | "icon" | "sidebar";
  className?: string;
  blend?: boolean;
}
export function Logo({
  variant = "full",
  className,
  blend = false,
}: LogoProps) {
  const blendClass = blend ? "mix-blend-multiply" : "";

  if (variant === "icon")
    return <MarioIcon className={cn(blendClass, className)} />;
  if (variant === "sidebar")
    return <MarioSidebar className={cn(blendClass, className)} />;
  return <MarioFull className={cn(blendClass, className)} />;
}
