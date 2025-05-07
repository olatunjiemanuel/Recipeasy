import {useCallback, useEffect} from 'react';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useFrameworkReady} from '@/hooks/useFrameworkReady';
import {useFonts} from 'expo-font';
import {
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {View} from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    useFrameworkReady();

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Light': Poppins_300Light,
        'Poppins-Regular': Poppins_400Regular,
        'Poppins-Medium': Poppins_500Medium,
        'Poppins-SemiBold': Poppins_600SemiBold,
        'Poppins-Bold': Poppins_700Bold,
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
        <GestureHandlerRootView style={{flex: 1}} onLayout={onLayoutRootView}>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="(auth)" options={{animation: 'fade'}}/>
                <Stack.Screen name="(tabs)" options={{animation: 'fade'}}/>
                <Stack.Screen name="recipe/[id]" options={{animation: 'slide_from_right'}}/>
                <Stack.Screen name="filter"/>
                <Stack.Screen name="+not-found"/>
            </Stack>
            <StatusBar style="auto"/>
        </GestureHandlerRootView>
    );
}