import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { LinkPreview } from "@/components/ui/link-preview";
import { ChevronRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <AnimatedThemeToggler />
        <h1>tanay agrawal</h1>

        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            <LinkPreview
              url="https://sportsai.us/"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-orange-500 to-orange-900"
            >sportsai </LinkPreview>
          </li>
          <li className="mb-2 tracking-[-.01em]">
            <LinkPreview
              url="https://bay2bayhacks.xyz/"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-black"
            >bay2bayhacks </LinkPreview>
          </li>
          <li className="mb-2 tracking-[-.01em]">
            <LinkPreview
              url="https://protest-psi.vercel.app/"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-pink-500 to-red-600"
            >language of resistance </LinkPreview>
          </li>
          <li className="mb-2 tracking-[-.01em]">
            <LinkPreview
              url="https://dev.harker.org/"
              className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-green-600 to-emerald-800"
            >harkerdev parking </LinkPreview></li>
          <li className="tracking-[-.01em]">
            <LinkPreview
              url="https://its4advocacy.vercel.app/"
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
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="mailto:tanayagrawal31@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            contact me
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/tanay-agrawal-28487b307/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin />
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/YanatPlayz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github />
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:tanayagrawal31@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Mail />
        </a>
      </footer>
    </div>
  );
}
