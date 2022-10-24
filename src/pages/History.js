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
            <h2>Histórico</h2>
            <h3>Em breve você poderá ver o histórico dos seus hábitos aqui!</h3>
        </ThisHistory>
    )
}

const ThisHistory = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    margin-top: 10vh;

    h2{
        width: 90%;
        font-weight: 400;
        color: #126BA5;
        margin-block: 0px;
        margin-top: 20px;
    }
    h3{
        width: 90%;
        font-weight: 400;
        color: #666666;
        margin-block: 0px;
    }
`