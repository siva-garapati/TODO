import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from './Context'

const CompletedTasks = () => {

    let [data,setData]=useState([])
    let navigate=useNavigate()

    let {token, email}=useContext(Context)

    useEffect(()=>{
        axios.get('http://localhost:5000/completedtasks',{
            headers: {
                Authorization: token,
                uid: email
            }
        }).then((res)=>{
            setData(res.data)
        })
    },[email,token])

    const calculateDuration = (createdAt, completedAt) => {
        if (!completedAt) return "Not completed yet";

        const start = new Date(createdAt);
        const end = new Date(completedAt);
        const durationMs = end - start;

        const minutes = Math.floor(durationMs / (1000 * 60));
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return hours > 0 ? `${hours}h ${remainingMinutes}m` : `${minutes} min`;
    };
  return (
    <div className='completed'>
        <h2>Tasks you are completed</h2>
        {data.length>0 ? (data.map((obj)=>{
            return <div className='task' key={obj._id} onClick={() => {navigate(`/task/${obj._id}`)}}>
                <div className='details'>
                    <h4>{obj.title}</h4>
                    <p>{obj.description.length < 80 ? obj.description : obj.description.slice(0, 80) + '...'}</p>
                </div>
                <div>
                    <p>{'completed in '+calculateDuration(obj['createdAt'],obj['completedAt'])}</p>
                </div>
            </div>
        })):(<h4>You haven't Completed any Task</h4>)}
    </div>
  )
}

export default CompletedTasks