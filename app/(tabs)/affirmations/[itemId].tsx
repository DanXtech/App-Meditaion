import { View, Text, ImageBackground, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallary'
import AppGradient from '@/components/AppGradient'
import { AntDesign } from '@expo/vector-icons'

const AffirmationsPractice = () => {

    // step 1  Retrieve the itemId from search params
    const { itemId } = useLocalSearchParams()

    // step 2 State to hold the selected affirmation data
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>()
    // step 4 setting the use State
    const [sentences, setSentences] = useState<string[]>([])

    // step 3 Fetch the affirmation when itemId changes
    useEffect(() => {
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
            const affirmationsDate = AFFIRMATION_GALLERY[idx].data;

            // step 3.1
            const affirmationsToStart = affirmationsDate.find(
                (a) => a.id === Number(itemId)
            );


            // step 3.2 Find the affirmation by id
            if (affirmationsToStart) {
                setAffirmation(affirmationsToStart)

                // step 3.3 split the text
                const affirmationArray = affirmationsToStart.text.split(".")

                // step 3.4 Remover the last element  if it's an empty string
                if (affirmationArray[affirmationArray.length - 1] === '') {
                    affirmationArray.pop();
                }

                setSentences(affirmationArray)
                return;
            }
        }
    }, [])
    return (
        <View className='flex-1'>
            <ImageBackground
                source={affirmation?.image}
                resizeMode='cover'
                className='flex-1'
            >
                <AppGradient colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}>
                    <Pressable onPress={() => router.back()}>
                        <AntDesign name="leftcircleo" size={30} color="white"
                            className='absolute top-16 left-6 z-10'
                        />
                    </Pressable>

                    <ScrollView className='mt-10'
                        showsVerticalScrollIndicator={false}>
                        <View className='h-hull justify-center'>
                            <View className='h-3/5 justify-center'>
                                {sentences.map((sentences, idx) => (
                                    <Text key={idx} className='text-white text-2xl mb-12 font-bold text-center'>
                                        {sentences}.
                                    </Text>
                                ))}

                            </View>
                        </View>
                    </ScrollView>
                </AppGradient>
            </ImageBackground>
        </View>
    )
}

export default AffirmationsPractice