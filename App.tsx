import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useCachedResources } from '@/theme'
import Navigation from './navigation'

export default function App() {
    const isLoadingComplete = useCachedResources()

    return isLoadingComplete ? (
        <SafeAreaProvider>
            <Navigation />
        </SafeAreaProvider>
    ) : (
        <View />
    )
}
