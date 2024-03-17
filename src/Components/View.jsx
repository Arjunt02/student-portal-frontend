import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getUsers } from '../services/allapi';


function View() {

  const [user,setuser]=useState({})

  useEffect(() => {
    getUser()
  }, [])
  

  const {id}=useParams()
  console.log(id);

  const getUser=async ()=>{
    const {data}=await getUsers("")
    console.log(data);
    console.log(data.find(item=>item._id===id))
    setuser(data.find(item=>item._id===id))
  }




  return (
    <>

   { 

      user?

          <div className='ms-5 d-flex flex-column  justify-content-center  align-items-center mt-5 shadow p-3 w-50 '>
              <h3>Name : {user.name}</h3>
              <h3>Email : {user.email}</h3>
              <h3>Age :{user.age}</h3>
          </div>:""
    
    }
    
    </>
  )
}

export default View