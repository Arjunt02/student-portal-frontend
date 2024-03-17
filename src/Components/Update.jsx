import React, { useContext, useEffect, useState } from 'react'
import { addUser, editUser, getUsers } from '../services/allapi'
import { registerContext } from './ContextShare'
import { useNavigate, useParams } from 'react-router-dom'


function Update() {

  const {registerData,setRegisterData}=useContext(registerContext)
  const navigate=useNavigate()

  const [inputs,setInputs]=useState({
    name:"",
    email:"",
    age:""
  })



  // view (single view) page code
 
  const {id}=useParams()
  console.log(id);

  const getUser=async ()=>{
    const {data}=await getUsers("")
    console.log(data);

    let existingUser=data.find(item=>item._id===id)
    console.log(existingUser);

    setInputs(existingUser)

  }

  useEffect(() => {
    getUser()
  }, [])
  // ----------------------------------





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
      const result = await editUser(id,data,headers)
      console.log(result);

      
      if(result.status===200){
        navigate("/")
      }else{
        alert("request failed")
      }
     

    }


  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center vh-100 bg-primary' >
        <div className='w-50 bg-white rouded p-3 '>

          <form>
            <h2>Update user details</h2>

            <div className="form-floating mt-4 mb-3">
              <input onChange={e => getInputs(e)} name='name' value={inputs.name} type="text" className="form-control" id="floatingInput" placeholder="Name" />
              <label for="floatingInput">Name</label>
            </div>

            <div className="form-floating mb-3 ">
              <input onChange={e => getInputs(e)} name='email' value={inputs.email} type="email" className="form-control" id="floatingPassword" placeholder="Email" />
              <label for="floatingPassword">Email</label>
            </div>

            <div className="form-floating mb-3 ">
              <input onChange={e => getInputs(e)} name='age' value={inputs.age} type="text" className="form-control" id="floatingPassword" placeholder="Age" />
              <label for="floatingPassword">Age</label>
            </div>

            <button onClick={e => handleSubmit(e)} className='btn btn-success '>Submit</button>

          </form>
        </div>
      </div>



    </>
  )
}

export default Update