import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'
import AppGradient from '@/components/AppGradient'
import { router } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { TimerContent } from '@/context/TimerContext'

const AjustMeditationDuration = () => {

    // set the duration
    const { setDuration } = useContext(TimerContent)

    const handlePress = (duration: number) => {
        setDuration(duration)
        router.back();

    }
    return (
        <View className='flex-1 relative'>
            <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>

                <Pressable
                    onPress={() => router.back()}
                    className='absolute top-8 left-6 z-10'
                >

                    <AntDesign name='leftcircleo' size={30} color="white" />
                </Pressable>
                <View className='justify-center mt-10 h-4/5'>
                    <Text className='text-center font-bold text-2xl text-white mb-8'>
                        Ajust your meditation duration
                    </Text>

                    <View>
                        <CustomButton
                            title='10 second'
                            onPress={() => handlePress(10)}
                            constainerStyles='mb-5'
                        />
                        <CustomButton
                            title='5 minutes'
                            onPress={() => handlePress(5 * 60)}
                            constainerStyles='mb-5'
                        />
                        <CustomButton
                            title='10 minutes'
                            onPress={() => handlePress(10 * 60)}
                            constainerStyles='mb-5'
                        />
                        <CustomButton
                            title='15 minutes'
                            onPress={() => handlePress(15 * 60)}
                            constainerStyles='mb-5'
                        />
                    </View>
                </View>

            </AppGradient>
        </View>
    )
}

export default AjustMeditationDuration