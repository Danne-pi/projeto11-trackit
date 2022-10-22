import styled from "styled-components"
import { Progress } from "./Global"



export const Menu = () => {
    return (
        <ThisComponent>
            <button>Habitos</button>
            <button className="tracker"><Progress percent={80}/></button>
            <button>Historico</button>
        </ThisComponent>
    )
}


const ThisComponent = styled.div`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 8vh;
    background-color: #FFFFFF;
    z-index: 10;
    display: flex;
    justify-content: space-evenly;
    padding-inline: 18px;
    align-items: center;
    box-shadow: -20px 0 50px rgba(25,25,25,0.35);

    button{
        background-color: transparent;
        border: none;
        font-size: 17px;
        color: #52B6FF;
    }
    .tracker{
        background-color: #52B6FF;
        color: white;
        height: 100px;
        width: 100px;
        transform: translateY(-30px);
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;

    }
`