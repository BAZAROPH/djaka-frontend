import { useCallback } from "react";
import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { configureStore } from "../store";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded, fontError] = useFonts({
        'montserrat-bold': require('../assets/fonts/Montserrat-Bold.otf'),
        'montserrat-extrabold': require('../assets/fonts/Montserrat-ExtraBold.otf'),
        'montserrat-light': require('../assets/fonts/Montserrat-Light.otf')
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
      }, [fontsLoaded, fontError]);
    
      if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <Provider store={configureStore({})}>
            <Stack onLayout={onLayoutRootView} />
        </Provider>
    )
}
export default Layout;