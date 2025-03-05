import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const OneTask = () => {
    let {id}=useParams()
    let navigate=useNavigate()
    let [taskDetails,setTaskDetails]=useState({})

    useEffect(()=>{
        axios.get(`http://localhost:5000/task/${id}`).then((res)=>{
            setTaskDetails(res.data)
        })
    },[id])

    let handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            axios.delete(`http://localhost:5000/delete/${id}`).then((res) => {
                console.log(res.data)
                navigate('/')
            })
        }
    }

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
    <div className='task-details'>
        <h2>Task Info</h2>
        <table>
            <tr>
                <th>Title</th>
                <td>{taskDetails.title}</td>
            </tr>
            <tr>
                <th>Description</th>
                <td>{taskDetails.description}</td>
            </tr>
            <tr>
                <th>Status</th>
                <td>{taskDetails.status}</td>
            </tr>
            <tr>
                <th>Created On</th>
                  <td>{new Date(taskDetails['createdAt']).toLocaleString()}</td>
            </tr>
            <tr>
                <th>Completed On</th>
                <td>
                    { taskDetails['completedAt']!==null?(
                        new Date(taskDetails['createdAt']).toLocaleDateString()
                    ):(
                        "Not yet Completed"
                    )}
                </td>
            </tr>
            <tr>
                <th>Time Taken</th>
                <td>{calculateDuration(taskDetails['createdAt'],taskDetails['completedAt'])}</td>
            </tr>
        </table>
        <button onClick={handleDelete}>Delete &nbsp;<i className="fa-solid fa-trash"/></button>
    </div>
  )
}

export default OneTask