
import React, { useContext, useState } from 'react'
import { addUser } from '../services/allapi'
import { registerContext } from './ContextShare'
import { useNavigate } from 'react-router-dom'


function Create() {

  const {registerData,setRegisterData}=useContext(registerContext)
  const navigate=useNavigate()

  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    age:""
  })

  const getInputs=(e)=>{
    const {name,value}=e.target
    setInputs({...inputs,[name]:value})
                // rest operator
  }
  console.log(inputs);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {name,email,age}=inputs

    if(!name||!email||!age){
      alert("please fill the form completly")
    }else{
      // alert("successfully added")

      // --------------------------------------------------
      const data=new FormData
      data.append("name",name)
      data.append("email",email)
      data.append("age",age)
      const headers={"content-type":"application/json"}
      // ---------------------------------------------------

      // api section
      const result = await addUser(data,headers)
      console.log(result);

      // ----------------------------------------------
      // api call success aanegil input box empty aakan
      if(result.status===200){
        setInputs({...setInputs,name:"",email:"",age:""})
        setRegisterData(result.data)
        navigate("/")
      }else{
        alert("request failed")
      }
      // ------------------------------------------------

    }


  }

  

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 bg-primary' >
      <div className='w-50 bg-white rouded p-3 '>
        
      <form>
        <h2>Add user</h2>

        <div className="form-floating mt-4 mb-3">
            <input onChange={e=>getInputs(e)} name='name' value={inputs.value} type="text" className="form-control" id="floatingInput" placeholder="Name"/>
            <label for="floatingInput">Name</label>
        </div>

        <div className="form-floating mb-3 ">
            <input onChange={e=>getInputs(e)} name='email' value={inputs.value} type="email" className="form-control" id="floatingPassword" placeholder="Email"/>
            <label for="floatingPassword">Email</label>
        </div>

        <div className="form-floating mb-3 ">
            <input onChange={e=>getInputs(e)} name='age' value={inputs.value} type="text" className="form-control" id="floatingPassword" placeholder="Age"/>
            <label for="floatingPassword">Age</label>
        </div>

        <button onClick={e=>handleSubmit(e)} className='btn btn-success '>Submit</button>

      </form>
      </div>
    </div>
  )
}

export default Create