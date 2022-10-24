import { ThreeDots } from "react-loader-spinner"
import { createContext, useContext, useState } from 'react';
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components";
import { Header } from "./header";
import { Menu } from "./menu";

export const AuthContext = createContext([false, () => {}])
export const PercentContext = createContext([0, () => {}])

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(false)
    const [percent, setPercent] = useState(0)

    return (
        <PercentContext.Provider value={[percent, setPercent]}>
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
        </PercentContext.Provider>
        
    )
}

export const apiURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/"

export const Loading = (props) => {
    return <ThreeDots
        height={props.height} //24 
        width={props.width} //50
        radius={props.radius} //9
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
    const [percent,] = useContext(PercentContext)

    return <>
        <Header />
        <Menu percent={percent}/>
    </>
}

export const BottomSpace = styled.div`
    height: 10vh;
`

export const PageLoad = ()=>{
    return (
        <ThisLoad>
            <Loading />
        </ThisLoad>
    )
}
const ThisLoad = styled.div`
    height: 15vh;
    width: 15vh;
    border-radius: 12px;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #52B6FF;
    transform: translate(-50%,-50%);
    z-index: 12;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ThisCheckDelete = styled.div`
    height: 20vh;
    width: 30vh;
    border-radius: 12px;
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: #52B6FF;
    transform: translate(-50%,-50%);
    z-index: 12;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .question{
        text-align: center;
        color: white;
    }
    span{
        button{
            border: none;
            margin-inline: 8px;
            padding: 8px;
            border-radius: 8px;
        }
    }
`