import React from 'react'
import { Callback } from '@/common'

//TODO 모든 팝업의 옵션을 여기에 정의하는 것은 나쁘다. 나중에 개선해라.
export type PopupOptions = {
    yes?: Callback
    no?: Callback
    close?: Callback
    callbacks?: any[]
    data?: any[]
}

export function usePopup() {
    const [options, setOptions] = React.useState<PopupOptions>({})

    return { setOptions, options }
}

export const popupContext = {
    options: {} as PopupOptions,
    setOptions: (opts: PopupOptions) => {}
}

export const PopupContext = React.createContext(popupContext)
