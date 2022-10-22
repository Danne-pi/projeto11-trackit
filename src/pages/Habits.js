import { useContext } from "react"
import styled from "styled-components"
import { Header } from "../components/header"
import { Menu } from "../components/menu"
import { AuthContext } from "../components/Global"
import { UnknownPage } from "./UnknownPage"

export const Habits = () => {
    const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage />
    }

    return (
        <ThisHabits>
            <Header />
            <h1>Habitos</h1>
            <Menu />
        </ThisHabits>
    )
}

const ThisHabits = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`