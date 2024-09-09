import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    textStyles?: string;
    constainerStyles?: string
}

const CustomButton = ({ onPress, title, textStyles = "", constainerStyles = "" }: CustomButtonProps) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`bg-white rounded-xl min-h-[62px] justify-center items-center ${constainerStyles}`}
            onPress={onPress}
        >
            <Text
                className={`font-semibold text-lg ${textStyles}`}
            >{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomButton