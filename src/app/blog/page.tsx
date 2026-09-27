import { BlogPosts } from "@/components/posts";

export default function Page() {
  return (
    <main className="flex flex-col gap-[32px] items-start">
      <h1>my blog</h1>
      <BlogPosts />
    </main>
  )
}