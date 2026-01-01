import fs from 'fs'
import path from 'path'

export type Metadata = {
    title: string
    publishedAt: string
    summary: string
    category: string
    image?: string
}

export const categoryStyles: Record<string, { text: string; badge: string }> = {
    Sanskrit: {
        text: 'text-amber-600 dark:text-amber-400',
        badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/50'
    },
    Projects: {
        text: 'text-emerald-600 dark:text-emerald-400',
        badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/50'
    },
    Computer: {
        text: 'text-purple-600 dark:text-purple-400',
        badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/50'
    },
    Linguistics: {
        text: 'text-rose-600 dark:text-rose-400',
        badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/50'
    },
}

export function getCategoryStyles(category: string) {
    return categoryStyles[category] || {
        text: 'text-neutral-900 dark:text-neutral-100',
        badge: 'bg-neutral-100 text-neutral-900 border-neutral-200'
    }
}

function parseFrontmatter(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    const match = frontmatterRegex.exec(fileContent)
    const frontMatterBlock = match![1]
    const content = fileContent.replace(frontmatterRegex, '').trim()
    const frontMatterLines = frontMatterBlock.trim().split('\n')
    const metadata: Partial<Metadata> = {}

    frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(': ')
        let value = valueArr.join(': ').trim()
        value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
        metadata[key.trim() as keyof Metadata] = value
    })

    return { metadata: metadata as Metadata, content }
}

function getMDXFiles(dir: string) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath: string) {
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    return parseFrontmatter(rawContent)
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir)
    return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file))
        const slug = path.basename(file, path.extname(file))

        return {
            metadata,
            slug,
            content,
        }
    })
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), 'src', 'app', 'blog', 'posts'))
}

export function formatDate(date: string, includeRelative = false) {
    const currentDate = new Date()
    if (!date.includes('T')) {
        date = `${date}T00:00:00`
    }
    const targetDate = new Date(date)

    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
    const daysAgo = currentDate.getDate() - targetDate.getDate()

    let formattedDate = ''

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`
    } else {
        formattedDate = 'Today'
    }

    const fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    })

    if (!includeRelative) {
        return fullDate
    }

    return `${fullDate} (${formattedDate})`
}