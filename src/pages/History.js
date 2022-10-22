import { useContext } from "react"
import styled from "styled-components"
import { Header } from "../components/header"
import { Menu } from "../components/menu"
import { AuthContext } from "../components/Global"
import { UnknownPage } from "./UnknownPage"

export const History = () => {
    const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage />
    }

    return (
        <ThisHistory>
            <Header />
            <h1>Historico</h1>
            <Menu />
        </ThisHistory>
    )
}

const ThisHistory = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`