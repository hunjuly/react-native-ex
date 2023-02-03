import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useCachedResources } from '@/theme'
import { PopupContext, RequestContext, ToastContext, usePopup, useRequest, useToast } from './hooks'
import Navigation from './navigation'

export default function App() {
    const isLoadingComplete = useCachedResources()
    const request = useRequest()
    const toast = useToast()
    const popup = usePopup()

    return isLoadingComplete ? (
        <RequestContext.Provider value={request}>
            <PopupContext.Provider value={popup}>
                <ToastContext.Provider value={toast}>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
                </ToastContext.Provider>
            </PopupContext.Provider>
        </RequestContext.Provider>
    ) : (
        <View />
    )
}
