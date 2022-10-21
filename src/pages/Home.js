import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import logo from "../assets/logo.png"
import { apiURL, AuthContext } from "../Global"

export const Home = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [, setUser] = useContext(AuthContext)

    function submit(e){
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
            }, 500);
        })
        promise.catch((a)=>{
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
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={pass}
                    onChange={e=> setPass(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </ThisHome>
    )
}

export const Register = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const [name, setName] = useState("")
    const [pic, setPic] = useState("")

    function submit(e){
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
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={pass}
                    onChange={e=> setPass(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={e=> setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Foto"
                    value={pic}
                    onChange={e=> setPic(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
            <h4 onClick={()=>{}}>aa</h4>
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

        input{

        }
        button{
            margin-top: 12px;
        }
    }

    h4{
        margin: 0;
    }
`