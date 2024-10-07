import { cn } from "@/app/utils/cn";
import { ReactNode } from "react";

interface BlobBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const BlobBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: BlobBackgroundProps) => {
  return (
    <main className={cn("h-full w-full", className)} {...props}>
      <div className=" absolute inset-0 mx-auto my-auto right-96 w-72 h-72 md:w-[25rem] md:h-[25rem] rounded-full bg-gradient-to-t from-[#C30A8F] to-[#561CA0] opacity-60 mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className=" absolute inset-0 mx-auto my-auto left-96  w-72 h-72 md:w-[25rem] md:h-[25rem] rounded-full bg-gradient-to-r from-[#561CA0] to-[#5E88D8] opacity-60 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      <div className=" absolute inset-0 mx-auto my-auto -bottom-36  w-72 h-72 md:w-[25rem] md:h-[25rem] rounded-full bg-gradient-to-tl from-[#5E88D8] to-[#C30A8F] opacity-60 mix-blend-multiply filter blur-3xl  animate-blob " />

      {children}
    </main>
  );
};
