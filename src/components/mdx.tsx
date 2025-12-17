import Link from 'next/link'
import remarkGfm from 'remark-gfm'
import Image, { ImageProps } from 'next/image'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'

type TableData = {
    headers: string[]
    rows: string[][]
}

function Table({ data }: { data: TableData }) {
    const headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))
    const rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ))

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

function CustomLink(props: React.ComponentProps<typeof Link>) {
    const href = props.href

    if (typeof href === 'string' && href.startsWith('/')) {
        return (
            <Link {...props}>
                {props.children}
            </Link>
        )
    }

    if (typeof href === 'string' && href.startsWith('#')) {
        return <a {...(props as React.ComponentProps<'a'>)} />
    }

    return <a target="_blank" rel="noopener noreferrer" {...(props as React.ComponentProps<'a'>)} />
}

function RoundedImage(props: ImageProps) {
    return <Image className="rounded-lg" {...props} />
}

function Code({ children, ...props }: React.ComponentProps<'code'>) {
    const codeHTML = highlight(children as string)
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str: string | React.ReactNode): string {
    return (str?.toString() || "")
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
}

function createHeading(level: 1 | 2 | 3 | 4 | 5 | 6) {
    const Heading = ({ children }: { children: React.ReactNode }) => {
        let slug = slugify(children)
        let text = children

        if (slug === 'footnotes') {
            text = 'References'
            slug = 'references'
        }

        return React.createElement(
            `h${level}`,
            { id: slug },
            [
                React.createElement('a', {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: 'anchor',
                }),
            ],
            text
        )
    }

    Heading.displayName = `Heading${level}`

    return Heading
}

const components = {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    Image: RoundedImage,
    a: CustomLink,
    code: Code,
    Table,
    blockquote: Blockquote,
}

function Blockquote(props: React.ComponentProps<'blockquote'>) {
    return (
        <blockquote
            className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-4 rounded"
            {...props}
        />
    )
}

export function CustomMDX(props: MDXRemoteProps) {
    return (
        <MDXRemote
            {...props}
            components={{ ...components, ...(props.components || {}) }}
            options={{
                ...props.options,
                mdxOptions: {
                    ...props.options?.mdxOptions,
                    remarkPlugins: [
                        ...(props.options?.mdxOptions?.remarkPlugins || []),
                        remarkGfm
                    ]
                }
            }}
        />
    )
}