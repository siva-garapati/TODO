import axios from 'axios'
import React, { useContext, useState } from 'react'
import Context from '../components/Context'

const Popup = ({setFlag, setShowPopup}) => {

    let {ctData}=useContext(Context)

    console.log(ctData)

    let [editTask,setEditTask]=useState({
        "_id":ctData._id,
        "title":ctData.title,
        "description":ctData.description
    })
    let handleSave=()=>{
        if (editTask.title.trim() !== '' && editTask.description.trim() !== '') {
            axios.put("http://localhost:5000/update",editTask).then(()=>{
                setFlag(prev=>!prev)
                setShowPopup(prev=>!prev)
            })
        } else {
            alert("input field doesn't empty")
        }
    }

    let handleCancel=()=>{
        setShowPopup(prev => !prev)
    }
  return (
    <div className="overlay">
        <div className="pop-up">
          <h2>Edit Task</h2>
          <input
              type="text"
              value={editTask.title}
              onChange={(e) => setEditTask(prev=>({...prev,'title':e.target.value}))}
              // onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              autoFocus
            />
            <textarea
             placeholder='Enter Description'
             value={editTask.description}
             onChange={(e) => setEditTask(prev => ({ ...prev, 'description': e.target.value }))}
            />

          <div className="btns">
            <button onClick={handleSave} className="ok">ok</button>
            <button onClick={handleCancel} className="cancel">cancel</button>
          </div>
        </div>
      </div>
  )
}

export default Popup