import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteUser, getUsers } from '../services/allapi'
import { registerContext } from './ContextShare'


function Users() {

    const [users, setUsers] = useState([{
        Name: "john", Email: "john@gmail.com", Age: "21"
    }])

    const {registerData,setregisterData}=useContext(registerContext)

    const [alluserData, setalluserData] = useState([])

    useEffect(() => {
        getallEmployees()
    }, [])


    const getallEmployees = async () => {
        const response = await getUsers()
        console.log(response);

        if (response.status === 200) {
            setalluserData(response.data)
        }
        else {
            alert("can't fetch data")
        }

        console.log(alluserData);
    }


    // delete
    const removeUser=async(id)=>{
        const response=await deleteUser(id)

        if(response.status===200){
            getallEmployees()
        }else{
            alert("operation failed")
        }
    }

    return (
        <>

            <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3 '>
                    <Link to="/create" className='btn btn-success '>Add</Link>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                                alluserData.length>0 ?
                                 alluserData.map((item,index)=>(

                                 <tr>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.age}</td>
                                    <td>
                                        <Link to={`/view/${item._id}`}><button className='btn btn-success me-1'>View</button></Link>
                                        <Link to={`/update/${item._id}`}><button className='btn btn-info '>Update</button></Link>
                                        <button onClick={()=>removeUser(item._id)} className='btn btn-danger ms-1'>Delete</button>
                                    </td>
                                  </tr>


                                 )): <tr>error</tr>
                             
                             }

                        </tbody>
                </table>
            </div>

        </div >

    </>
  )
}

export default Users