import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Progress } from "./Global"



export const Menu = (props) => {
    const navigate = useNavigate()

    return (
        <ThisComponent>
            <button 
                data-identifier="habit-page-action"
                onClick={()=>{navigate("/habitos")}}
            >Habitos</button>
            <button
                onClick={()=>{navigate("/hoje")}}
                className="tracker"
            ><Progress percent={props.percent} /></button>
            <button 
                data-identifier="historic-page-action"
                onClick={()=>{navigate("/historico")}}
            >Historico</button>
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