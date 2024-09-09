import { Children, Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"


interface TimerContextType {
    duration: number;
    setDuration: Dispatch<SetStateAction<number>>
}


export const TimerContent = createContext<TimerContextType>({
    duration: 10,
    setDuration: () => { },
});

interface TimerProviderProps {
    children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps) => {
    const [duration, setDuration] = useState(10)

    return (
        <TimerContent.Provider
            value={{ duration, setDuration }}
        >
            {children}
        </TimerContent.Provider>
    )
}

export default TimerProvider;