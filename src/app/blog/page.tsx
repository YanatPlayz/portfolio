import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <main className="flex flex-col gap-[32px] items-start">
      <AnimatedThemeToggler />
      <h1>blog</h1>
      <BlogPosts />
    </main>
  )
}