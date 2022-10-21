import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../Global"
import { UnknownPage } from "./UnknownPage"

export const Habits = () => {
    const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage />
    }

    return (
        <ThisHabits>
        </ThisHabits>
    )
}

const ThisHabits = styled.div`
`