import { ThreeDots } from "react-loader-spinner"
import { createContext, useState } from 'react';
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";

export const AuthContext = createContext([false, () => {}])

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(false)

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const apiURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/"

export const Loading = () => {
    return <ThreeDots
        height="24" 
        width="50" 
        radius="9"
        color="#FFFFFF" 
        ariaLabel="three-dots-loading"
        visible={true}
    />
}

export const Progress = (percentage) => {
    return <CircularProgressbarWithChildren 
        value={percentage} 
        styles={buildStyles({
            pathColor: "#52B6FF",
            trailColor: `rgba(0,0,0,0)`
        })}>
            <h1>HojeS2</h1>
        </CircularProgressbarWithChildren>;
}