import { ThreeDots } from "react-loader-spinner"
import { createContext, useState } from 'react';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components";
import { Header } from "./header";
import { Menu } from "./menu";

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

export const Progress = (props) => {
    return <CircularProgressbar 
        text="Hoje"
        value={props.percent} 
        styles={buildStyles({
            pathColor: "white",
            trailColor: `transparent`,
            textColor: 'white',
            textSize: '18px'
        })}/>
}

export const BasicPageLayout = () => {
    const Spacer = styled.div`
    height: 8vh;
    `
    return <>
        <Spacer />
        <Header />
        <Menu />
    </>
}
