import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Context from './Context'
import { useNavigate } from 'react-router-dom'

const AllTasks = () => {

  let [tasks, setTasks]=useState([])
  let {email}=useContext(Context)
  let [statusSelect,setStatusSelect]=useState('all')
  let navigate=useNavigate()

  const fetchTasks = async (status) => {
    try {
      const path = status === 'all' ? 'http://localhost:5000/alltasks' : `http://localhost:5000/tasks/${status}`;
      const res = await axios.get(path, { headers: { uid: email } });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks(statusSelect);
    console.log(tasks)
  }, [statusSelect]);

  let viewTask = (id) => {
    navigate(`/task/${id}`)
  }

  return (
    <div className='alltasks'>
      <h2>All Tasks</h2>
      <div>Show
        <select id="status" onChange={(e)=>setStatusSelect(e.target.value)} value={statusSelect}>
          <option value='all' defaultChecked>All Tasks</option>
          <option value="pending">Pending Tasks</option>
          <option value="completed">Completed Tasks</option>
        </select>
      </div>
      {tasks && tasks.map((obj)=>{
        return <div className='task' key={obj._id}>
          <div className='details' onClick={()=>viewTask(obj._id)} >
            <h4>{obj.title}</h4>
            <p>{obj.description.length < 80 ? obj.description : obj.description.slice(0, 80) + '...'}</p>
          </div>
          <div>
            <p style={{color:obj.status==='pending'?'red':'green',fontWeight:'bold'}}>{obj.status}</p>
          </div>
        </div>
      })}
    </div>
  )
}

export default AllTasks