import React, { useContext } from 'react'
import axios from 'axios'
import Context from './Context'
import { useNavigate } from 'react-router-dom'

const Tasks = ({ data, setFlag, setShowPopup }) => {

  let {setCtData}=useContext(Context)
  let navigate=useNavigate()

  let handleDelete=(id)=>{
    axios.delete(`http://localhost:5000/delete/${id}`).then((res)=>{
      console.log(res.data)
      setFlag(prev=>!prev)
    })
  }

  let viewTask=(id)=>{
    navigate(`/task/${id}`)
  }

  let handleEdit=(obj)=>{
    setCtData({...obj})
    setShowPopup(prev=>!prev)
  }

  let handleSelect=(e,id)=>{
    axios.put('http://localhost:5000/changestatus', { '_id': id, "status": e.target.value, "completed at": new Date().toISOString() }).then(()=>{
      setFlag(prev=>!prev)
    })
  }
  return (
    <div className='tasks'>
      <h2>Pending Tasks</h2>
        {
            data.length>0 ? (data.map((obj,index)=>{
                return <div style={{borderBottom:"2px solid"}} className='task' key={index}>
                    <div className='details'  onClick={()=>viewTask(obj._id)}>
                      <h4>{obj.title}</h4>
                      <p>{obj.description.length<80?obj.description:obj.description.slice(0,80)+'...'}</p>
                    </div>
                    <select id="status" onChange={(e)=>handleSelect(e,obj._id)}>
                      <option value="pending" defaultChecked>Pending</option>
                      <option value="completed">Completed</option>
                    </select>
                    <div className='btns'>
                      <button onClick={() => handleDelete(obj._id)}><i className="fa-solid fa-trash"></i></button>
                      <button onClick={() => handleEdit(obj)}><i className="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            })):(<h4>No More Pending Tasks</h4>)
        }
    </div>
  )
}

export default Tasks