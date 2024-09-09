import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import MEDITATION_IMAGES from '@/constants/meditation-images'
import AppGradient from '@/components/AppGradient'
import { router, useLocalSearchParams } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import CustomButton from '@/components/CustomButton'
import { Audio } from "expo-av"
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import { TimerContent } from '@/context/TimerContext'


const Meditate = () => {
    // step 1
    const { id } = useLocalSearchParams();

    const { duration: secoundRemaining, setDuration } = useContext(TimerContent)

    // step 2
    // const [secoundRemaining, setSecondsRemaining] = useState(10);

    // step 6 setting another useState
    const [isMeditating, setMeditating] = useState(false)

    // seting state for the audio sound
    const [audioSound, setSound] = useState<Audio.Sound>()


    const [isPlayingAudio, setPlayingAudio] = useState(false);

    // step 3
    useEffect(() => {
        let timerId: NodeJS.Timeout;

        // Exit
        if (secoundRemaining === 0) {
            // step 7 when secoundRemaining is equal to zero then setMeditating will be false
            setMeditating(false)
            return
        }

        // step 8 i don't want to call timeout when the component is mount. i just want to call it incase whenthe user has call it
        if (isMeditating) {
            // other wise step 4
            timerId = setTimeout(() => {
                setDuration(secoundRemaining - 1);
            }, 1000)
        }

        // // other wise step 4
        // timerId = setTimeout(() => {
        //     setSecondsRemaining(secoundRemaining - 1);
        // }, 1000)

        // step 5
        return () => {
            clearTimeout(timerId)
        }
    }, [secoundRemaining, isMeditating])

    // useEffect for the audio sound to stop sound
    useEffect(() => {
        return () => {
            setDuration(10)
            audioSound?.unloadAsync()
        }
    }, [])
    // Meditation Audio/Song So in case when the user start the Meditation and it come to zero then i will reset ti to ten seconds 

    const toggleMeditationSessionStatus = async () => {
        if (secoundRemaining === 0) setDuration(10);

        // This will toggle the Meditating state
        setMeditating(!isMeditating);


        await toggleSound()
    }

    const toggleSound = async () => {
        // if the autio sound is true the i will initialize but if it is false then i will call the iinitializeSound
        const sound = audioSound ? audioSound : await initializeSound()

        const status = await sound?.getStatusAsync()

        if (status?.isLoaded && !isPlayingAudio) {
            await sound.playAsync()
            setPlayingAudio(true)
        } else {
            await sound.pauseAsync()
            setPlayingAudio(false)
        }
    }

    // Next is to create a method that it should stop playing with sound. 
    const initializeSound = async () => {
        const audioFileName = MEDITATION_DATA[Number(id) - 1].audio

        const { sound } = await Audio.Sound.createAsync(
            AUDIO_FILES[audioFileName]
        );

        setSound(sound)
        return sound
    }



    // Last application for meditation -----------------😁
    const handleAjustDuration = () => {
        if (isMeditating) toggleMeditationSessionStatus()

        router.push("/(modal)/ajust-meditation-duration");
    }
    // Format the time left to ensure two digits are displayed
    const formattedTimeMinutes = String
        (Math.floor(secoundRemaining / 60)
        ).padStart(2, "0")

    const formattedTimeSecounds = String(secoundRemaining % 60).padStart(2, "0")



    return (
        <View className='flex-1'>
            <ImageBackground
                source={MEDITATION_IMAGES[Number(id) - 1]}
                resizeMode='cover'
                className='flex-1'
            >
                <AppGradient colors={["transparent", "rgba(0, 0, 0, 0.8)"]}>
                    <Pressable onPress={() => router.back()}
                        className='absolute top-16 left-6 z-10'
                    >

                        <AntDesign name='leftcircleo' size={30} color="white" />
                    </Pressable>


                    <View className='flex-1 justify-center'>
                        <View className='mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center'>
                            <Text className='text-3xl text-blue-800 font-rmono'>
                                {formattedTimeMinutes}:{formattedTimeSecounds}
                            </Text>
                        </View>
                    </View>

                    <View className='mb-5 '>
                        <CustomButton
                            title='Ajust Duration'
                            onPress={handleAjustDuration} />
                        <CustomButton
                            title={isMeditating ? 'Stop' : "Start Meditation"}
                            onPress={toggleMeditationSessionStatus}
                            constainerStyles='mt-4'

                        />
                    </View>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default Meditate