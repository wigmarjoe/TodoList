import React, { useState, useEffect } from "react";
import Create from "./Create";
import { BsCheckCircleFill, BsCircleFill, BsFillTrashFill } from 'react-icons/bs'
import  Axios  from "axios";

function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        Axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        Axios.put(`http://localhost:3001/update/${id}`)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`)
        .then(result => {
            location.reload()
        })
        .catch(err => console.log(err))
    }
    

    return (
        <div className='home'>
            <h2>Todo List</h2>
            <Create />
            <br />
            {
                todos.length === 0 
                ?
                <div><h2>No Record</h2></div>
                :
                todos.map(todo => (
                    <div className='task'>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                                <BsCheckCircleFill className="icon"></BsCheckCircleFill>
                            : <BsCircleFill className='icon'/>
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>                
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon' 
                                onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
            
                ))
            }
        </div>
    )
}

export default Home