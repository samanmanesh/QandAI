import { cn } from "@/app/utils/cn";
import { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main className={cn(" h-full flex w-full    ", className)} {...props}>
      <div className=" absolute inset-0 mx-auto my-auto right-80 w-[25rem] h-[25rem] rounded-full bg-[#C30A8F] opacity-50 mix-blend-multiply filter blur-3xl animate-pulse " />
      <div className=" absolute inset-0 mx-auto my-auto left-80  w-[25rem] h-[25rem] rounded-full bg-[#561CA0] opacity-50 mix-blend-multiply filter blur-3xl animate-spin " />
      <div className=" absolute inset-0 mx-auto my-auto -bottom-56  w-[25rem] h-[25rem] rounded-full bg-[#5E88D8] opacity-50 mix-blend-multiply filter blur-3xl animate-spin" />
      <div className=" absolute inset-0 mx-auto -top-56  w-[5rem] h-[5rem] rounded-full  opacity-50 mix-blend-multiply filter blur-3xl animate-ping bg-gradient-to-t from-orange-600 via-neutral-600 to-green-400 transition-all duration-1000 " />
      {children}
    </main>
  );
};
