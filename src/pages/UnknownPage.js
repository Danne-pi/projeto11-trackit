import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { AuthContext } from "../components/Global"

export const UnknownPage = (props)=>{
    const navigate = useNavigate()

    const [user, setUser] = useContext(AuthContext)

    useEffect(()=>{
        if(localStorage.length > 0){
         setUser(JSON.parse(localStorage.getItem('user')))
         setTimeout(() => {
             navigate("/hoje")
         }, 1000);
        }
     },[])

    return (
        <ThisPage>
        <h1>{props.msg === 1 ?
        "Por favor, faça login antes de acessar essa página."
        :
        "Erro 404. Pagina não encontrada!"
        }</h1>
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