import { useContext } from "react"
import styled from "styled-components"
import { AuthContext, BasicPageLayout } from "../components/Global"
import { UnknownPage } from "./UnknownPage"

export const History = () => {
    const [user,] = useContext(AuthContext)

    if(user === false){
        return <UnknownPage />
    }

    return (
        <ThisHistory>
            <BasicPageLayout />
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