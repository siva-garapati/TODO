import axios from 'axios'
import React, { useContext, useState } from 'react'
import Context from './Context';

const Add = () => {
    
    let [inputData, setInputdata] = useState({ 'title': '', "description": ''})
    const [toast, setToast] = useState({ show: false, message: "" });
    let {email}=useContext(Context)

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: "" }), 3000);
    };

    let handleClick=()=>{
        const addObj={...inputData, "createdAt": new Date(), email}
        if (Object.values(inputData).some(val=>val!=='')){
            axios.post("http://localhost:5000/add", addObj).then((res) => {
                if (res.data.msg === 'Task saved') {
                    console.log(res.data)
                    setInputdata({ 'title': '', "description": '' })
                    showToast("Task added")
                    // setFlag(prev => !prev)
                }else{
                    alert('task not saved')
                }
            })
        }else{
            alert('fields not to be Empty')
        }
    }
  return (
    <div className='add'>
        <h2>Add your Tasks</h2>
        <div className='addFields'>
              <input
                  type='text'
                  placeholder='Enter Title'
                  value={inputData.title}
                  onChange={(e) => setInputdata(prev => ({ ...prev, 'title': e.target.value }))}
              />
              <textarea
                  placeholder='Enter Description'
                  value={inputData.description}
                  onChange={(e) => setInputdata(prev => ({ ...prev, 'description': e.target.value }))}
              />
              <button onClick={handleClick}>Add Task</button>
        </div>
        <div className='message'>

        </div>
        {toast.show && <div className="toast">{toast.message}</div>}
    </div>
  )
}

export default Add