import { useContext } from "react"
import styled from "styled-components"
import { Header } from "../components/header"
import { Menu } from "../components/menu"
import { AuthContext } from "../components/Global"
import { UnknownPage } from "./UnknownPage"
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

export const Today = () => {
    const [user,] = useContext(AuthContext)
    dayjs.locale('pt-br')
    const semana = (dayjs().format('dddd'))
    const data = dayjs().format('DD/MM')
    

    if(user === false){
        return <UnknownPage msg={1}/>
    }


    return (
        <ThisToday>
            <Header />
            <div className="spacer"></div>
            <h1>{semana+", "+data}</h1>
            <Menu />
        </ThisToday>
    )
}

const ThisToday = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .spacer{
        height: 8vh;
    }
    h1{
        width: 90%;
        font-weight: 400;
        color: #126BA5;
    }
`