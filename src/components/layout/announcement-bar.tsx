"use client"

import { cn } from "@/lib/utils"

const Marquee = ({ className, reverse, children, ...props }: {
    className?: string,
    reverse?: boolean,
    children: React.ReactNode
}) => {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        className
      )}
    >
      <div
        className={cn("flex min-w-full shrink-0 animate-marquee items-center [gap:var(--gap)]", {
          "[animation-direction:reverse]": reverse,
        })}
      >
        {children}
      </div>
      <div
        className={cn("flex min-w-full shrink-0 animate-marquee items-center [gap:var(--gap)]", {
          "[animation-direction:reverse]": reverse,
        })}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}

export function AnnouncementBar() {
    return (
        <div className="bg-primary text-primary-foreground">
            <Marquee className="text-sm font-medium">
                 <span className="mx-4">Your Best Online Marketplace In Kurdistan</span>
                 <span className="mx-4">Your Best Online Marketplace In Kurdistan</span>
                 <span className="mx-4">Your Best Online Marketplace In Kurdistan</span>
                 <span className="mx-4">Your Best Online Marketplace In Kurdistan</span>
            </Marquee>
        </div>
    )
}
