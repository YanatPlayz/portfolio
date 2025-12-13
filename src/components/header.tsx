import Link from "next/link";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export default function Header() {
    return (
        <header className="flex justify-between items-start text-left">
            <div className="flex gap-[24px]">
                <Link href="/" className="hover:underline hover:underline-offset-4">home</Link>
                <Link href="/blog" className="hover:underline hover:underline-offset-4">blog</Link>
            </div>
            <AnimatedThemeToggler />
        </header>
    )
}