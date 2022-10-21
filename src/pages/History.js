import { useContext } from "react"
import styled from "styled-components"
import { AuthContext } from "../Global"
import { UnknownPage } from "./UnknownPage"

export const History = () => {
    const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage />
    }

    return (
        <ThisHistory>
        </ThisHistory>
    )
}

const ThisHistory = styled.div`
`