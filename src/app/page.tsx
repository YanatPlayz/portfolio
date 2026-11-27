import fs from "fs";
import path from "path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkPreview } from "@/components/ui/link-preview";
import { Greeting } from "@/components/greeting";
import { CopyButton } from "@/components/copy-button";
import { getBlogPosts, readingTime } from "@/app/blog/utils";

const EMAIL = "tanayagrawal31@gmail.com";

type Item = {
  title: string;
  url: string;
  date: string;
  image?: string;
  livePreview?: boolean;
  accent: { light: string; dark: string };
};

const research: Item[] = [
  {
    title: "semantic change in sanskrit",
    url: "https://arxiv.org/abs/2609.25012",
    date: "oct '25",
    accent: { light: "#d97706", dark: "#fbbf24" },
  },
  {
    title: "language of resistance",
    url: "https://languageofresistance.org/",
    date: "may '25",
    accent: { light: "#e11d48", dark: "#fb7185" },
  },
  {
    title: "ucsc sip: altaic ellipsis",
    url: "/documents/ellipsis-altaic.pdf",
    date: "summer '25",
    accent: { light: "#7c3aed", dark: "#a78bfa" },
  },
  {
    title: "ucla cosmos: synthetic speech",
    url: "/documents/deepfake-poster.pdf",
    date: "summer '26",
    accent: { light: "#2774ae", dark: "#5aa9e6" },
  },
];

const projects: Item[] = [
  {
    title: "bay2bayhacks",
    url: "https://bay2bayhacks.xyz/",
    date: "march '25",
    image: "/images/bay2bayhacks.png",
    accent: { light: "#2563eb", dark: "#60a5fa" },
  },
  {
    title: "harkerdev",
    url: "https://dev.harker.org/",
    date: "dec '24",
    livePreview: true,
    accent: { light: "#059669", dark: "#34d399" },
  },
  {
    title: "its4advocacy",
    url: "https://its4advocacy.org/",
    date: "may '25",
    image: "/images/its4advocacy.png",
    accent: { light: "#57534e", dark: "#a8a29e" },
  },
  {
    title: "sports ai",
    url: "https://sportsai.us/",
    date: "july '23",
    image: "/images/sportsai.png",
    accent: { light: "#ea580c", dark: "#fb923c" },
  },
];

const FEATURED_POSTS: Record<string, string | true> = {
  "slogans-travel": true,
  "sanskrit-results": true,
  "sanskrit-stacks": true,
  "sanskrit-segmentation": true,
  "semantic-embeddings": "how computers can help us understand word meanings as they change",
};

const STAGGER = 65;
const delay = (step: number) =>
  ({ "--appear-delay": `${step * STAGGER}ms` }) as React.CSSProperties;

function Label({ children }: { children: React.ReactNode }) {
  return <span className="link-label">{children}</span>;
}

function TextLink({
  href,
  accent,
  children,
}: {
  href: string;
  accent?: Item["accent"];
  children: React.ReactNode;
}) {
  const external = /^https?:\/\//.test(href) || href.endsWith(".pdf");
  return (
    <a
      href={href}
      className="home-link"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-accent={accent ? "" : undefined}
      style={
        accent
          ? ({
              "--accent-light": accent.light,
              "--accent-dark": accent.dark,
            } as React.CSSProperties)
          : undefined
      }
    >
      <Label>{children}</Label>
    </a>
  );
}

function ItemRows({ items }: { items: Item[] }) {
  return (
    <div className="home-rows">
      {items.map((item) => [
        <div key={`${item.title}-name`} className="home-names">
          {item.image ? (
            <LinkPreview
              url={item.url}
              isStatic
              imageSrc={item.image}
              accent={item.accent}
              className="home-link"
            >
              <Label>{item.title}</Label>
            </LinkPreview>
          ) : item.livePreview ? (
            <LinkPreview url={item.url} accent={item.accent} className="home-link">
              <Label>{item.title}</Label>
            </LinkPreview>
          ) : (
            <TextLink href={item.url} accent={item.accent}>
              {item.title}
            </TextLink>
          )}
        </div>,
        <div key={`${item.title}-date`} className="home-dates">
          {item.date}
        </div>,
      ])}
    </div>
  );
}

export default function Home() {
  const posts = getBlogPosts()
    .filter((post) => post.slug in FEATURED_POSTS)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime(),
    );

  return (
    <main className="home">
      <h1 className="sr-only">Tanay Agrawal</h1>

      <div className="appear" style={delay(0)}>
          <img className="home-avatar" src={"/images/avatar.jpg"} alt="" draggable={false} />
      </div>

      <div className="home-stack">
        <div className="home-intro">
          <Greeting style={delay(1)} />
          <div className="home-bio">
            <p className="appear" style={delay(2)}>
              I’m Tanay, a student researcher interested in linguistics and computer science.
            </p>
            <p className="appear" style={delay(3)}>
              Currently a senior at The Harker School, exploring low-resource language
              preservation and building community-oriented software.
            </p>
            <p className="appear" style={delay(4)}>
              Follow my research on the <TextLink href="/blog">blog series</TextLink> or
              take a look at my{" "}
              <TextLink href="/documents/resume.pdf">résumé</TextLink>.
            </p>
          </div>
        </div>

        <div className="home-groups">
          <div className="home-divider" aria-hidden="true" />
          <section className="home-section appear" style={delay(6)} aria-labelledby="research-title">
            <h2 id="research-title">Research</h2>
            <ItemRows items={research} />
          </section>

          <div className="home-divider" aria-hidden="true" />
          <section className="home-section appear" style={delay(7)} aria-labelledby="projects-title">
            <h2 id="projects-title">Projects</h2>
            <ItemRows items={projects} />
          </section>

          <div className="home-divider" aria-hidden="true" />
          <section className="home-section appear" style={delay(8)} aria-labelledby="blog-title">
            <h2 id="blog-title">Journal</h2>
            <div className="home-rows">
              {posts.map((post) => [
                <div key={`${post.slug}-name`} className="home-names">
                  <Link href={`/blog/${post.slug}`} className="home-link">
                    <Label>
                      {FEATURED_POSTS[post.slug] === true
                        ? post.metadata.title.toLowerCase()
                        : FEATURED_POSTS[post.slug]}
                    </Label>
                  </Link>
                </div>,
                <div key={`${post.slug}-time`} className="home-dates">
                  {readingTime(post.content)} min
                </div>,
              ])}
            </div>
            <Link href="/blog" className="home-muted-link home-view-all inline-flex items-center gap-1">
              View all posts
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </section>

          <div className="home-divider" aria-hidden="true" />
          <section className="home-section appear" style={delay(9)} aria-labelledby="connect-title">
            <div className="home-connect">
              <p>
                Let's connect! The best way to reach me is at{" "}
                <span className="whitespace-nowrap mr-1">
                  <TextLink href={`mailto:${EMAIL}`}>{EMAIL}</TextLink>
                  <CopyButton value={EMAIL} label="email" />
                </span>
                . I'm also on {" "}
                <TextLink href="https://www.linkedin.com/in/tanayagrawal31/">
                  LinkedIn
                </TextLink>{" "}
                and <TextLink href="https://github.com/YanatPlayz">GitHub</TextLink>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
