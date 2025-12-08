import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LinkPreview } from "@/components/ui/link-preview";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
      <main className="flex flex-col gap-[32px] items-start">
        <AnimatedThemeToggler />
        <h1>tanay agrawal</h1>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-left">
          <li className="mb-2">
            <LinkPreview
              url="https://sportsai.us/"
              imageSrc="/images/sportsai.png"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-orange-900"
            >sportsai </LinkPreview>
          </li>
          <li className="mb-2">
            <LinkPreview
              url="https://bay2bayhacks.xyz/"
              imageSrc="/images/bay2bayhacks.png"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-black"
            >bay2bayhacks </LinkPreview>
          </li>
          <li className="mb-2">
            <LinkPreview
              url="https://languageofresistance.org/"
              imageSrc="/images/languageofresistance.png"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-red-600"
            >language of resistance </LinkPreview>
          </li>
          <li className="mb-2">
            <LinkPreview
              url="https://dev.harker.org/"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-600 to-emerald-800"
            >harkerdev parking </LinkPreview></li>
          <li className="mb-2">
            <LinkPreview
              url="https://its4advocacy.vercel.app/"
              imageSrc="/images/its4advocacy.png"
              isStatic
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-stone-500 to-stone-800"
            >its4advocacy </LinkPreview></li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="/documents/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            view cv <ChevronRight />
          </Link>

          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="mailto:tanayagrawal31@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            contact me
          </a>
        </div>
      </main>
  );
}
