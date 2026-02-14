import { Linkedin, Github, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer className="flex gap-[24px] flex-wrap justify-start">
            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://www.linkedin.com/in/tanayagrawal31/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="">linkedin</span>
                <Linkedin size={14} />
            </a>

            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="https://github.com/YanatPlayz"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="">github</span>
                <Github size={14} />
            </a>

            <a
                className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                href="mailto:tanayagrawal31@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <span className="">email</span>
                <Mail size={14} />
            </a>
        </footer>
    )
}