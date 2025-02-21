import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CompletedTasks = () => {

    let [data,setData]=useState([])
    let navigate=useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:5000/completedtasks').then((res)=>{
            setData(res.data)
        })
    },[])

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
        {data && data.map((obj)=>{
            return <div className='task' key={obj._id} onClick={() => navigate(`/task/${obj._id}`)}>
                <div className='details'>
                    <h4>{obj.title}</h4>
                    <p>{obj.description.length < 80 ? obj.description : obj.description.slice(0, 80) + '...'}</p>
                </div>
                <div>
                    <p>{'completed in '+calculateDuration(obj['created at'],obj['completed at'])}</p>
                </div>
            </div>
        })}
    </div>
  )
}

export default CompletedTasks