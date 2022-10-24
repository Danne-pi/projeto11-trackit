import axios from "axios"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { apiURL, AuthContext, BasicPageLayout } from "../components/Global"
import { UnknownPage } from "./UnknownPage"
import trash from "../assets/trash.png"

export const Habits = () => {
    const weekDays = ["D","S","T","Q","Q","S","S"]
    const [user,] = useContext(AuthContext)
    const [taskList, setTaskList] = useState([])
    const [createHabit, setCreateHabit] = useState(false)
    const [name, setName] = useState("")
    const [formState, setFormState] = useState("")
    const [selectedList, setSelectedList] = useState([])


    function LoadList(){
        const URL = apiURL+"habits"

        const promise = axios.get(URL, {
            headers: {'Authorization': 'Bearer ' + user.token}
        })

        promise.then((a)=>{
            setTaskList(a.data)
        })
        promise.catch((a)=>{
            alert(a.response.data.message)
        })
    }

    function submit(e){
        e.preventDefault()
        setFormState("disabled")
        
        const URL = apiURL+"habits"
        
        const body = {
            name: name,
	        days: selectedList // segunda, quarta e sexta
        }

        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }

        const promise = axios.post(URL, body, config)

        promise.then((a)=>{
            LoadList()
            CancelForm()
            setFormState("")
        })
        promise.catch((a)=>{
            alert(a.response.data.message)
            CancelForm()
            setFormState("")
        })
    }

    function deleteId(id){
        const URL = apiURL+"habits/"+id

        const config = {
            headers: {'Authorization': 'Bearer ' + user.token}
        }

        const promise = axios.delete(URL, config)

        promise.then((a)=>{
            LoadList()
        })
        promise.catch((a)=>{
            alert(a.response.data.message)
        })
    }



    useEffect(()=>{
        LoadList()
    }, [])


    

    function CancelForm(){
        setName("")
        setSelectedList([])
        setCreateHabit(false)
    }

    function SelectDay(index){
        let newArr = [...selectedList]
        if(newArr.length < 1){
            newArr.push(index+1)
        }
        else{
            if(!newArr.includes(index+1)){
                newArr.push(index+1)
            }
            else{
                newArr = newArr.filter(e => e !== index+1)
            }
        }
        setSelectedList(newArr)
    }

    const DrawWeekBtns = () => {
        
        return weekDays.map((item, index) => (
            <div 
            key={index}
            className={selectedList.includes(index+1)?"selected":""}
            onClick={()=>{SelectDay(index)}}
            disabled={formState}
            >
                {item}
            </div>
        ))
    }

    const DrawTaskList = ()=>{
        return taskList.map((item) => (
            <div 
                className="task-wrapper"
                key={item.id}
                id={item.id}
                >
                <div className="head-wrapper">
                    <span>{item.name}</span>
                    <img src={trash} alt="" onClick={()=>{deleteId(item.id)}} />
                </div>
                <div className="day-wrapper">
                    {weekDays.map((d, index) => (
                        <div
                            className={item.days.includes(index+1) ? "selected":""}
                            key={index}
                        >
                            {d}
                        </div>
                    ))}
                </div>
            </div>
        ))
    }






    if(user === false){
        return <UnknownPage />
    }

    return (
        <ThisHabits>
            <BasicPageLayout />
            <div className="title-wrapper">
                <h2>Meus hábitos</h2>
                <div onClick={()=>{setCreateHabit(true)}}>+</div>
            </div>
            {createHabit === true ? 
            <ThisHabitCreator
                btnColor = {(selectedList.length < 1 || name.length < 5 || !formState === "")? "#DBDBDB":"#52B6FF"}
            >
                <form onSubmit={submit}>
                    <input
                        type="text"
                        placeholder="nome do hábito"
                        value={name}
                        onChange={e=> setName(e.target.value)}
                        required
                        disabled={formState}
                    />
                    <div className="day-wrapper">
                        <DrawWeekBtns />
                    </div>
                    <div className="btn-wrapper">
                        <button className="cancel" onClick={()=>{CancelForm()}}>Cancelar</button>
                        <button 
                            className="save" 
                            type="submit"
                            disabled={(selectedList.length < 1 || name.length < 5 || !formState === "")? "disabled":""}
                        >Salvar</button>
                    </div>
                </form>
            </ThisHabitCreator>
            :<></>}
            {taskList.length === 0 ? <h3>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h3>
            :<ThisTaskList><DrawTaskList /></ThisTaskList>}
        </ThisHabits>
    )
}


const ThisTaskList = styled.div`
    width: 90%;
    margin-top: 40px;

    .task-wrapper{
        margin-bottom: 40px;
        width: 100%;
        .head-wrapper{
            display: flex;
            justify-content: space-between;

            span{
                font-size: 19px;
                color: #666666;
            }

            img{
                margin-top: 5px;
                margin-right: 7px;
                width: 18px;
                height: 20px;
            }
        }

        .day-wrapper{
            display: flex;
            gap: 4px;
            margin-block: 12px;

            div{
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 4.5vh;
                width: 4.5vh;
                border: 1px solid #D5D5D5;
                color: #D5D5D5;
                border-radius: 8px;
            }
            .selected{
                background-color: #CFCFCF;
                color: #FFFFFF;

            }
        }
    }
    
`

const ThisHabitCreator = styled.div`
    width: 90%;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    form{
        width: 90%;
        input{
            color: #666666;
            border: 1px solid #D5D5D5;
            font-size: 19px;
            padding: 8px;
            border-radius: 5px;
            margin-top: 5px;
            margin-bottom: 10px;
            width: 100%;
        }
        input::placeholder{
            color: #DBDBDB;
        }
        .day-wrapper{
            display: flex;
            gap: 4px;
            margin-bottom: 28px;
            
            div{
                font-size: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 4.5vh;
                width: 4.5vh;
                border: 1px solid #D5D5D5;
                color: #D5D5D5;
                border-radius: 8px;
            }
            .selected{
                background-color: #CFCFCF;
                color: #FFFFFF;

            }
        }
        .btn-wrapper{
            display: flex;
            justify-content: end;

            .cancel{
                font-size: 16px;
                border: none;
                margin-right: 8px;
                color: #52B6FF;
                padding: 8px;
            }
            .save{
                font-size: 16px;
                border: none;
                border-radius: 5px;
                margin-right: 8px;
                color: white;
                background-color: ${props => props.btnColor};
                padding: 8px;
                padding-inline: 16px;
            }
        }
    }

`

const ThisHabits = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .title-wrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-inline: 5vw;

        div{
            transform: translateY(3px);
            background-color: #52B6FF;
            border-radius: 6px;
            color: white;
            width: 4vh;
            height: 4vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 28px;
            padding-bottom: 0.5vh;
        }
        h2{
            font-weight: 400;
            color: #126BA5;
            margin-block: 0px;
            margin-top: 20px;
        }
    }

    h3{
        font-weight: 400;
        color: #666666;
        margin-inline: 5vw;
    }
`