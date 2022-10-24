import { useContext } from "react"
import styled from "styled-components"
import { AuthContext, BasicPageLayout } from "../components/Global"
import { UnknownPage } from "./UnknownPage"
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import check from "../assets/check.svg"

export const Today = () => {
    const [user,] = useContext(AuthContext)
    dayjs.locale('pt-br')
    const semana = (dayjs().format('dddd'))
    const data = dayjs().format('DD/MM')

    const listafake = [
        {
            titulo: "Ler 1 capítulo de livro",
            sequencia: "2",
            recorde: "3",
        },
        {
            titulo: "Ler 1 capítulo de livro",
            sequencia: "2",
            recorde: "3",
        },
        {
            titulo: "Ler 1 capítulo de livro",
            sequencia: "2",
            recorde: "3",
        },
    ]

    function PrintTasks(){

        return listafake.map((item) => (
            <div className="main-wrapper">
                <div className="wrapper">
                    <h3>{item.titulo}</h3>
                    <h4>Sequência atual: {item.sequencia}</h4>
                    <h4>Seu recorde: {item.recorde}</h4>
                </div>
                <div className="img-wrapper">
                    <img src={check} alt=""/>
                </div>
            </div>
        ))
    }



    if(user === false){
        return <UnknownPage msg={1}/>
    }



    return (
        <ThisToday>
            <BasicPageLayout />
            <h2 className="title">{semana+", "+data}</h2>
            <h3 className="sub">Nenhum hábito concluído ainda</h3>
            <ListTasks>
                <PrintTasks />
            </ListTasks>
        </ThisToday>
    )
}




const ListTasks = styled.div`
    width: 90%;
    margin-top: 20px;

    .main-wrapper{
        border: 1px solid #999999;
        border-radius: 9px;
        padding: 10px;
        width: 100%;
        margin: 0;
        margin-bottom: 16px;
        display: flex;
        justify-content: center;
        align-items: center;

        .wrapper{
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            
            h3, h4{
                color: #666666;
                font-weight: 400;
                margin-block: 0;
            }
            h3{
                margin-bottom: 1vh;
            }
        }

        .img-wrapper{
            width: 8vh;
            height: 8vh;
            border-radius: 8px;
            background-color: #8FC549;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    }
`

const ThisToday = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .title{
        width: 90%;
        font-weight: 400;
        color: #126BA5;
        margin-block: 0px;
        margin-top: 20px;
    }
    .sub{
        width: 90%;
        font-weight: 400;
        color: #BABABA;
        margin-block: 0px;
    }
`