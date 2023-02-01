import React from 'react'

const defaultLang = 'en'
export type Languages = 'en'

//언어 추가시 ?은 제거해야 한다.
export function useLocalization<T>(langs: { en: T; ko?: T; jp?: T }) {
    const locale = 'en'

    const texts = React.useMemo(() => langs[locale], [locale, langs])

    return texts
}
