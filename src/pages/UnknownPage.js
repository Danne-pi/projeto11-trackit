import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../Global"

export const UnknownPage = ()=>{
    const navigate = useNavigate()

    const [user,] = useContext(AuthContext)

    return (
        <ThisPage>
            {user === false ?
            <h1>Por favor, faça login antes de acessar outras páginas.</h1>
            :
            <h1>Erro 404. Pagina não encontrada!</h1>
        }
        <button onClick={user === false ? ()=>navigate("/") : navigate("/hoje")}>Voltar</button>
        </ThisPage>)
}

const ThisPage = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 32px;

    h1{
        text-align: center;
    }

`