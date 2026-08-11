'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import './bounce-cards.css'

/**
 * next-mdx-remote strips JSX expression attributes ({...}) from MDX by default,
 * so every prop here also accepts a plain string: lists are comma-separated
 * (transforms use `|` since they contain commas) and numbers are parsed.
 */
type List = string[] | string
type Num = number | string

type BounceCardsProps = {
    className?: string
    images?: List
    containerWidth?: Num
    containerHeight?: Num
    animationDelay?: Num
    animationStagger?: Num
    easeType?: string
    transformStyles?: List
    enableHover?: boolean | string
}

const toList = (value: List | undefined, separator: string): string[] => {
    if (Array.isArray(value)) return value
    if (typeof value !== 'string') return []
    return value.split(separator).map((item) => item.trim()).filter(Boolean)
}

const toNum = (value: Num | undefined, fallback: number): number => {
    const parsed = typeof value === 'string' ? parseFloat(value) : value
    return typeof parsed === 'number' && !Number.isNaN(parsed) ? parsed : fallback
}

export default function BounceCards({
    className = '',
    images: imagesProp,
    containerWidth: containerWidthProp,
    containerHeight: containerHeightProp,
    animationDelay: animationDelayProp,
    animationStagger: animationStaggerProp,
    easeType = 'elastic.out(1, 0.8)',
    transformStyles: transformStylesProp,
    enableHover = true
}: BounceCardsProps) {
    const images = toList(imagesProp, ',')
    const containerWidth = toNum(containerWidthProp, 400)
    const containerHeight = toNum(containerHeightProp, 400)
    const animationDelay = toNum(animationDelayProp, 0.5)
    const animationStagger = toNum(animationStaggerProp, 0.06)
    const transformStyles = toList(transformStylesProp, '|').length
        ? toList(transformStylesProp, '|')
        : [
            'rotate(10deg) translate(-170px)',
            'rotate(5deg) translate(-85px)',
            'rotate(-3deg)',
            'rotate(-10deg) translate(85px)',
            'rotate(2deg) translate(170px)'
        ]

    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.card',
                { scale: 0 },
                {
                    scale: 1,
                    stagger: animationStagger,
                    ease: easeType,
                    delay: animationDelay
                }
            )
        }, containerRef)
        return () => ctx.revert()
    }, [animationStagger, easeType, animationDelay])

    const getNoRotationTransform = (transformStr: string) => {
        const hasRotate = /rotate\([\s\S]*?\)/.test(transformStr)
        if (hasRotate) {
            return transformStr.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)')
        } else if (transformStr === 'none') {
            return 'rotate(0deg)'
        }
        return `${transformStr} rotate(0deg)`
    }

    const getPushedTransform = (baseTransform: string, offsetX: number) => {
        const translateRegex = /translate\(([-0-9.]+)px\)/
        const match = baseTransform.match(translateRegex)
        if (match) {
            const newX = parseFloat(match[1]) + offsetX
            return baseTransform.replace(translateRegex, `translate(${newX}px)`)
        }
        return baseTransform === 'none'
            ? `translate(${offsetX}px)`
            : `${baseTransform} translate(${offsetX}px)`
    }

    const pushSiblings = (hoveredIdx: number) => {
        if (!enableHover || !containerRef.current) return

        const q = gsap.utils.selector(containerRef)

        images.forEach((_, i) => {
            const target = q(`.card-${i}`)
            gsap.killTweensOf(target)

            const baseTransform = transformStyles[i] || 'none'

            if (i === hoveredIdx) {
                gsap.to(target, {
                    transform: getNoRotationTransform(baseTransform),
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    overwrite: 'auto'
                })
            } else {
                const offsetX = i < hoveredIdx ? -120 : 120
                gsap.to(target, {
                    transform: getPushedTransform(baseTransform, offsetX),
                    duration: 0.4,
                    ease: 'back.out(1.4)',
                    delay: Math.abs(hoveredIdx - i) * 0.05,
                    overwrite: 'auto'
                })
            }
        })
    }

    const resetSiblings = () => {
        if (!enableHover || !containerRef.current) return

        const q = gsap.utils.selector(containerRef)

        images.forEach((_, i) => {
            const target = q(`.card-${i}`)
            gsap.killTweensOf(target)
            gsap.to(target, {
                transform: transformStyles[i] || 'none',
                duration: 0.4,
                ease: 'back.out(1.4)',
                overwrite: 'auto'
            })
        })
    }

    return (
        <div className="bounceCardsScaler my-8">
            <div
                className={`bounceCardsContainer ${className}`}
                ref={containerRef}
                style={{
                    position: 'relative',
                    width: containerWidth,
                    height: containerHeight
                }}
            >
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className={`card card-${idx}`}
                        style={{ transform: transformStyles[idx] ?? 'none' }}
                        onMouseEnter={() => pushSiblings(idx)}
                        onMouseLeave={resetSiblings}
                    >
                        <Image
                            className="image"
                            src={src}
                            alt={`Photo ${idx + 1}`}
                            width={400}
                            height={400}
                            sizes="200px"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
