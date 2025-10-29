import React, { useState } from "react";
import Create from "./Create";
import { useEffect } from "react";
import { BsCheckCircleFill, BsCircleFill } from 'react-icons/bs'

function Home() {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/get')
        .then(result => setTodos(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)
        .then(result => console.log(result))
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
                            {todo.done ? <BsCheckCircleFill className="icon"></BsCheckCircleFill>
                            : <BsCircleFill className='icon'/>
                            }
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>                
                        </div>
                        <div>
                            <span><BsFillTrashFill className='icon'/></span>
                        </div>
                    </div>
            
                ))
            }
        </div>
    )
}

export default Home