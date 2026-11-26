import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <main className="flex flex-col gap-[32px] items-start">
      <Link href="/" className="home-muted-link text-sm inline-flex items-center gap-1">
        <ArrowLeft size={14} aria-hidden="true" />
        home
      </Link>
      <h1>my blog</h1>
      <BlogPosts />
    </main>
  )
}
