import { BASE_URL } from "./baseurl";
import { commonapi } from "./commonapi";


// add user

export const addUser=async(body,header)=>{
    return await commonapi("POST",`${BASE_URL}/create`,body,header)
}


// get all users

export const getUsers=async()=>{
    return await commonapi("GET",`${BASE_URL}/get/allusers`,"")
}

// delete user

export const deleteUser=async(id)=>{
    return await commonapi("DELETE",`${BASE_URL}/delete/user/${id}`,{})
}

// edit user

export const editUser=async(id,body,header)=>{
    return await commonapi("PUT",`${BASE_URL}/edit/user/${id}`,body,header)
}