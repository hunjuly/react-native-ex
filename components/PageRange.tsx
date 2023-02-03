export type PageRange = {
    total: number
    current: number
    to?: number
    progress?: number
}

export type Pagination = {
    total: number
    current: number
}

export type RGB = {
    r: number
    g: number
    b: number
    a: number
}

export function rgbToStr(rgb: RGB) {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`
}

export function medianColor(from: RGB, to: RGB, progress: number) {
    const newRgb = {
        r: Math.round(from.r + (to.r - from.r) * progress),
        g: Math.round(from.g + (to.g - from.g) * progress),
        b: Math.round(from.b + (to.b - from.b) * progress),
        a: from.a + (to.a - from.a) * progress
    }

    return newRgb
}
