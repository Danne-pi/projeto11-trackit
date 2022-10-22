import { useContext } from "react"
import styled from "styled-components"
import { Header } from "../components/header"
import { Menu } from "../components/menu"
import { AuthContext } from "../components/Global"
import { UnknownPage } from "./UnknownPage"

export const Today = () => {
const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage msg={1}/>
    }


    return (
        <ThisToday>
            <Header />
            <Menu />
        </ThisToday>
    )
}

const ThisToday = styled.div`
`