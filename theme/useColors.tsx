import React from 'react'

export type ColorsType = {
    primary: string
    tint1: string
    tint2: string
    tint3: string
    tint4: string
    shade1: string
    shade2: string
    accent: string
    background2: string
    background3: string
    elements1: string
    elements2: string
    elements3: string
    elements4: string
    elements5: string
    elements6: string
    elements7: string
    elements8: string
    elements9: string
}

export function useColors() {
    const schemes = {
        light: {
            primary: '#004AB1',
            tint1: '#0968ED',
            tint2: 'rgba(0, 74, 177, 0.1)',
            tint3: 'rgba(255, 255, 255, 0.9)',
            tint4: 'rgba(0, 74, 177, 0.9)',
            tint5: 'rgba(237, 237, 237, 0.6)',
            warning: 'rgba(202, 67, 60, 0.1)',
            shade1: '#04285A',
            shade2: '#063576',
            shade3: '#052D64',
            accent: '#CA433C',
            background2: '#F3F3F4',
            background3: '#1D315E',
            background4: '#DAE3EF',
            background5: '#D9D9D9',
            background6: 'rgba(255, 255, 255, 0.85)',
            background7: 'rgba(0, 74, 177, 0.1)',
            background8: 'rgba(243, 243, 244, 0.3)',
            background9: 'rgba(9, 104, 237, 0.1)',
            background10: '#1F2739',
            elements1: '#020725',
            elements2: '#59554C',
            elements3: '#ACACAC',
            elements4: '#EDEDED',
            elements5: '#000000',
            elements6: '#FFFFFF',
            elements7: '#E3E3E3',
            elements8: '#003A8A',
            elements9: '#EAEEF3',
            elements10: '#6B6B6B',
            elements11: '#3CCA5B',
            elements12: '#0AB93B'
        }
    }

    const theme = 'light'

    const scheme = React.useMemo(() => {
        return schemes[theme]
    }, [theme])

    return scheme
}
