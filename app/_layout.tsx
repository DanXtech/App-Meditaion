import TimerProvider from "@/context/TimerContext";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

// This will prevent the splash screen from auto hiding until loading all the fnt assets.s
SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
    const [fontsLoaded, error] = useFonts({
        "Roboto-Mono": require("../assets/fonts/RobotoMono-Regular.ttf")
    })


    useEffect(() => {
        if (error) throw error
        if (fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded, error])

    // if is not loaded than it will be null
    if (!fontsLoaded) return null;
    if (!fontsLoaded && !error) return null;
    return (
        <TimerProvider>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="index"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="meditate/[id]"
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="(modal)/ajust-meditation-duration"
                    options={{ headerShown: false, presentation: 'modal' }}
                />
            </Stack>
        </TimerProvider>
    )
}