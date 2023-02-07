import { RootTabScreenProps } from '@/navigation/types'

export type Props = RootTabScreenProps<'Home'>

export function useModel(P: Props) {
    const { navigation } = P

    return {}
}
