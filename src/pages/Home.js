import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"
import { apiURL, AuthContext, Loading } from "../components/Global"

export const Home = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [, setUser] = useContext(AuthContext)
    const [load, setLoad] = useState(false)
    const [formState, setFormState] = useState("")

    function submit(e){
        setFormState("disabled")
        setLoad(true)
        e.preventDefault()
        const URL = apiURL+"auth/login"
        const body = {
            email: email,
            password: pass
        }
        const promise = axios.post(URL, body)
        
        promise.then((a)=>{
            setUser(a.data)
            setTimeout(() => {
               navigate("/hoje")
            }, 4000);
        })
        promise.catch((a)=>{
            setFormState("")
            setLoad(false)
            const msg = a.response.data.message
            alert(msg)
            setEmail("")
            setPass("")
        })
    }

    return (
        <ThisHome>
            <img src={logo} alt="" />
            <form onSubmit={submit}>
                <input
                    data-identifier="input-email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                    disabled={formState}
                />
                <input
                    data-identifier="input-password"
                    type="password"
                    placeholder="Senha"
                    value={pass}
                    onChange={e=> setPass(e.target.value)}
                    required
                    disabled={formState}
                />
                <button 
                    data-identifier="login-btn"
                    type="submit"
                    disabled={formState}
                >{load ? <Loading /> : "Entrar"}</button>
            </form>
            <button 
                data-identifier="sign-up-action"
                onClick={()=>{navigate("/cadastro")}}
                disabled={formState}
            >Não tem uma conta? Cadastre-se!</button>
        </ThisHome>
    )
}

export const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [pic, setPic] = useState("")
    const [load, setLoad] = useState(false)
    const [formState, setFormState] = useState("")

    function submit(e){
        setFormState("disabled")
        setLoad(true)
        e.preventDefault()
        const URL = apiURL+"auth/sign-up"
        const body = {
            email: email,
	        name: name,
	        image: pic,
	        password: pass
        }
        const promise = axios.post(URL, body)

        promise.then(()=>{
            navigate("/")
        })
        promise.catch((a)=>{
            setFormState("")
            setLoad(false)
            const msg = a.response.data.message
            alert(msg)
            setEmail("")
            setPass("")
        })
    }

    return (
        <ThisHome>
            <img src={logo} alt="" />
            <form onSubmit={submit}>
                <input
                    data-identifier="input-email"
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                    disabled={formState}
                />
                <input
                    data-identifier="input-password"
                    type="password"
                    placeholder="Senha"
                    value={pass}
                    onChange={e=> setPass(e.target.value)}
                    required
                    disabled={formState}
                />
                <input
                    data-identifier="input-name"
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    required
                    disabled={formState}
                />
                <input
                    data-identifier="input-photo"
                    type="text"
                    placeholder="Foto"
                    value={pic}
                    onChange={e=> setPic(e.target.value)}
                    required
                    disabled={formState}
                />
                <button
                    data-identifier="sign-up-btn" 
                    type="submit"
                    disabled={formState}
                >{load ? <Loading /> : "Registrar"}</button>
            </form>
            <button 
                data-identifier="back-to-login-action"
                onClick={()=>{navigate("/")}}
                disabled={formState}
            >Já tem uma conta? Faça login!</button>
        </ThisHome>
    )
}

const ThisHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    form{
        display: flex;
        flex-direction: column;
        width: 70%;

        input{
            border-radius: 5px;
            border: 1px solid #D5D5D5;
            margin-block: 4px;
            padding: 10px;
            ::placeholder{
            color: #DBDBDB ;
        }
        }
        button{
            font-size: 18px;
            color: white;
            border: none;
            border-radius: 5px;
            background-color: #52B6FF;
            height: 48px;
            margin-top: 12px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            text-decoration-line: none;

        }
    }

    button{
        background-color: transparent;
        border: none;
        margin-top: 6px;
        text-align: center;
        text-decoration-line: underline;
        font-size: 14px;
        color: #52B6FF;
    }
`