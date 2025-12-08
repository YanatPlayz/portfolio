import Link from "next/link";

export default function Header() {
    return (
        <header className="flex gap-[24px] flex-wrap justify-start items-start text-left">
            <Link href="/" className="hover:underline hover:underline-offset-4">home</Link>
            <Link href="/blog" className="hover:underline hover:underline-offset-4">blog</Link>
        </header>
    )
}