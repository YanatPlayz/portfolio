'use client'

import { useState } from 'react'
import FlexCarouselEngine from './flex-carousel-engine'

type List = string[] | string
type Num = number | string
type Bool = boolean | string

type FlexCarouselProps = {
    images?: List
    captions?: List
    height?: Num
    cardHeight?: Num
    gap?: Num
    radius?: Num
    preset?: 'liquid' | 'ribbon' | 'vortex' | 'arch'
    intro?: 'rise' | 'bloom' | 'spin' | 'deal' | 'none'
    fit?: 'natural' | 'portrait' | 'square' | 'landscape'
    curl?: 'twist' | 'rise' | 'fall'
    lensWidth?: Num
    bend?: Num
    captureWheel?: Bool
    focusOnClick?: Bool
}

const toList = (value: List | undefined, separator: string): string[] => {
    if (Array.isArray(value)) return value
    if (typeof value !== 'string') return []
    return value.split(separator).map((item) => item.trim())
}

const toNum = (value: Num | undefined): number | undefined => {
    const parsed = typeof value === 'string' ? parseFloat(value) : value
    return typeof parsed === 'number' && !Number.isNaN(parsed) ? parsed : undefined
}

const toBool = (value: Bool | undefined, fallback: boolean): boolean => {
    if (value === undefined) return fallback
    return value === true || value === '' || value === 'true'
}

const optimized = (src: string) =>
    src.startsWith('/') ? `/_next/image?url=${encodeURIComponent(src)}&w=1200&q=75` : src

export default function FlexCarousel({
    images,
    captions,
    height,
    cardHeight,
    gap,
    radius,
    preset = 'liquid',
    intro = 'rise',
    fit = 'natural',
    curl = 'twist',
    lensWidth,
    bend,
    captureWheel,
    focusOnClick,
}: FlexCarouselProps) {
    const [active, setActive] = useState(0)
    const captionList = toList(captions, '|')
    const items = toList(images, ',')
        .filter(Boolean)
        .map((src, idx) => ({
            src: optimized(src),
            alt: captionList[idx] || `Photo ${idx + 1}`,
        }))
    const caption = captionList[active]

    return (
        <div className="mt-8">
            <div className="flexCarouselBleed" style={{ height: toNum(height) ?? 380 }}>
                <FlexCarouselEngine
                    items={items}
                    preset={preset}
                    intro={intro}
                    fit={fit}
                    curl={curl}
                    cardHeight={toNum(cardHeight) ?? 0.6}
                    gap={toNum(gap) ?? 12}
                    radius={toNum(radius) ?? 12}
                    lensWidth={toNum(lensWidth)}
                    bend={toNum(bend)}
                    captions={false}
                    captureWheel={toBool(captureWheel, true)}
                    focusOnClick={toBool(focusOnClick, true)}
                    onChange={setActive}
                />
            </div>
            {captionList.length > 0 && (
                <div className="flex items-baseline justify-center gap-3 mt-3 text-sm text-muted-foreground">
                    <span key={active} className="animate-in fade-in duration-300 text-center">
                        {caption}
                    </span>
                    <span className="shrink-0 tabular-nums text-xs opacity-60">
                        {active + 1} / {items.length}
                    </span>
                </div>
            )}
        </div>
    )
}
