import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../Global"
import { UnknownPage } from "./UnknownPage"

export const Today = () => {
const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage />
    }


    return (
        <ThisToday>
        </ThisToday>
    )
}

const ThisToday = styled.div`
`