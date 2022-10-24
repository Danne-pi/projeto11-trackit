import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { apiURL, AuthContext, BasicPageLayout, BottomSpace, PercentContext } from "../components/Global"
import { UnknownPage } from "./UnknownPage"
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import check from "../assets/check.svg"
import axios from "axios"

export const Today = () => {
    const [user,] = useContext(AuthContext)
    const [,setPercent] = useContext(PercentContext)
    const [todayTasks, setTodayTasks] = useState([])
    dayjs.locale('pt-br')
    let semana = (dayjs().format('dddd'))
    semana = semana.charAt(0).toUpperCase() + semana.slice(1); 
    const data = dayjs().format('DD/MM')


    function LoadList(){
        const URL = apiURL+"habits/today"

        const promise = axios.get(URL, {
            headers: {'Authorization': 'Bearer ' + user.token}
        })

        promise.then((a)=>{
            setTodayTasks(a.data)
            letsCount(a.data)

        })
        promise.catch((a)=>{
            console.log(a.response.data.message)
        })

        
    }

    useEffect(()=>{
        LoadList()
    },[])

    function letsCount(list){
        let max=list.length
        let min=0
        for (let i = 0; i < list.length; i++) {
            if(list[i].done === true){
                min ++
            }            
        }
        if(min > 0){
            setPercent((min/max) * 100)
        }
        else {setPercent(0)}
    }

    function habitCheck(id, stage){
        
        let checker = stage === true ? "uncheck" : "check"
        
        const URL = apiURL+"habits/"+id+"/"+checker

        const body = {
            id: id
        }

        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }

        const promise = axios.post(URL, body, config)

        promise.then((a)=>{
            LoadList()
        })
        promise.catch((a)=>{
            console.log(a.response.data.message)
        })
    }

    function PrintTasks(){
        return todayTasks.map((item) => (
            <div 
                className="main-wrapper" 
                key={item.id}
                onClick={()=>habitCheck(item.id, item.done)}
                >
                <div className="wrapper">
                    <h3>{item.name}</h3>
                    <h4>Sequência atual: {item.currentSequence}</h4>
                    <h4>Seu recorde: {item.highestSequence}</h4>
                </div>
                <div className={"img-wrapper " + (item.done === false ? "hide":"")}>
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
                <BottomSpace />
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
        .hide{
            opacity: 0;
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