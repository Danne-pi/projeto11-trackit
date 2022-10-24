import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { apiURL, AuthContext, BasicPageLayout, BottomSpace, PageLoad, PercentContext } from "../components/Global"
import { UnknownPage } from "./UnknownPage"
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import check from "../assets/check.svg"
import axios from "axios"

export const Today = () => {
    const [user,] = useContext(AuthContext)
    const [percent, setPercent] = useContext(PercentContext)
    const [todayTasks, setTodayTasks] = useState([])
    dayjs.locale('pt-br')
    let semana = (dayjs().format('dddd'))
    semana = semana.charAt(0).toUpperCase() + semana.slice(1); 
    const data = dayjs().format('DD/MM')
    const [hasLoaded, setHasLoaded] = useState(false)


    function LoadList(){

        setHasLoaded(false)

        const URL = apiURL+"habits/today"

        const promise = axios.get(URL, {
            headers: {'Authorization': 'Bearer ' + user.token}
        })

        promise.then((a)=>{
            setHasLoaded(true)
            setTodayTasks(a.data)
            letsCount(a.data)

        })
        promise.catch((a)=>{
            setHasLoaded(true)
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

        setHasLoaded(false)
    
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
                data-identifier="done-habit-btn"
                className="main-wrapper" 
                key={item.id}
                onClick={hasLoaded === false ?()=>{} : ()=>habitCheck(item.id, item.done)}
                >
                <div className="wrapper" data-identifier="today-infos">
                    <h3>{item.name}</h3>
                    <h4>Sequência atual: <span className={item.done === true ? "checked" : "default"}>{item.currentSequence}</span></h4>
                    <h4>Seu recorde: <span className={(item.highestSequence === item.currentSequence && item.highestSequence>0) ? "checked" : "default"}>{item.highestSequence}</span></h4>
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
        <ThisToday
        subColor={percent === 0 ?"#BABABA" : "#8FC549"}
        >
            {hasLoaded === false ? <PageLoad /> : <></>}
            <BasicPageLayout />
            <h2 className="title" data-identifier="today-infos">{semana+", "+data}</h2>
            <h3 data-identifier="today-infos" className="sub">{
            todayTasks.length<1?
                "Não existem hábitos para hoje": 
            percent === 0 ? 
                "Nenhum hábito concluído ainda":
                percent.toFixed(0)+"% dos hábitos concluídos"
                }</h3>
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
            
            h3{
                margin-bottom: 1vh;
                color: #666666;
                font-weight: 400;
                margin-block: 0;
            }
            h4{
                font-weight: 400;
                margin-block: 0;
                .checked{
                    color: #8FC549;
                }
                .default{
                    color: #666666;
                }
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
    margin-top: 10vh;

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
        color: ${props => props.subColor};
        margin-block: 0px;
    }
`