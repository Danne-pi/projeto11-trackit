import { useContext } from "react"
import styled from "styled-components"
import typo from "../assets/typo.png"
import { AuthContext } from "./Global"


export const Header = () => {
    const [user,] = useContext(AuthContext)

    return (
        <ThisComponent>
            <img src={typo} alt="" className="typo"/>
            <img src={user.image} alt="" className="profile" />

        </ThisComponent>
    )
}

const ThisComponent = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 8vh;
    background-color: #126BA5;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    padding-inline: 18px;
    align-items: center;

    .typo{
        height: 40%;
        width: auto;
    }
    .profile{
        height: 6vh;
        width: 6vh;
        border-radius: 50px;
    }

`