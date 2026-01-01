import { notFound } from 'next/navigation'
import { CustomMDX } from '@/components/mdx'
import { formatDate, getBlogPosts, getCategoryStyles } from '@/app/blog/utils'
import { baseUrl } from '@/app/sitemap'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export async function generateStaticParams() {
    const posts = getBlogPosts()

    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPosts().find((post) => post.slug === slug)
    if (!post) {
        return
    }

    const {
        title,
        publishedAt: publishedTime,
        summary: description,
        image,
    } = post.metadata
    const ogImage = image
        ? image
        : `${baseUrl}/og?title=${encodeURIComponent(title)}`

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime,
            url: `${baseUrl}/blog/${post.slug}`,
            images: [
                {
                    url: ogImage,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImage],
        },
    }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = getBlogPosts().find((post) => post.slug === slug)

    if (!post) {
        notFound()
    }

    const styles = getCategoryStyles(post.metadata.category)

    return (
        <section>
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BlogPosting',
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image: post.metadata.image
                            ? `${baseUrl}${post.metadata.image}`
                            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                        url: `${baseUrl}/blog/${post.slug}`,
                        author: {
                            '@type': 'Person',
                            name: 'My Portfolio',
                        },
                    }),
                }}
            />
            <h1 className="title font-semibold text-2xl">
                {post.metadata.title}
            </h1>
            <div className="flex justify-between items-center mt-2 mb-8 text-sm">
                <div className="flex items-center gap-2">
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Tanay Agrawal
                    </p>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400 mb-0.5">|</span>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {formatDate(post.metadata.publishedAt)}
                    </p>
                    <Badge variant="default" className={cn("font-medium", styles.badge)}>
                        {post.metadata.category}
                    </Badge>
                </div>
            </div>
            <article className="prose">
                <CustomMDX source={post.content} />
            </article>
        </section>
    )
}
