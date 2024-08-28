import { baseUrl } from "@/urls";
import axios from "axios";



export const callRegisterUserApi = async (formData) => {
    const response = await axios.post(`${baseUrl}/api/user/register`,
        formData,
        {withCredentials : true}
    )

    return response?.data
}

export const callLoginUserApi = async (formData) => {
    const response = await axios.post(`${baseUrl}/api/user/login`,
        formData,
        {withCredentials : true}
    )
    

    return response?.data
}

export const callUserAuthApi = async () => {   
    
    const response = await axios.post(`${baseUrl}/api/user/auth` , {}, { withCredentials: true });
    
    return response?.data;
}

export const callLogoutApi = async () => {
    const response = await axios.post(`${baseUrl}/api/user/logout`,{},{ withCredentials : true }) ;
    return response?.data;
}

export const addNewTaskApi = async (formData) => {
    
    const response = await axios.post(`${baseUrl}/api/task/add-new-task`,formData) ;
    return response?.data;
}


export const getAllTasksApi = async (currentUserId) => {
    const response = await axios.get(`${baseUrl}/api/task/get-all-tasks-by-id/${currentUserId}`) ;
    return response?.data;
}

export const deleteTaskApi = async (currentTaskId) => {
    const response = await axios.delete(`${baseUrl}/api/task/delete-task/${currentTaskId}`) ;
    return response?.data;
}

export const updateTaskApi = async (formData) => {
    const response = await axios.put(`${baseUrl}/api/task/update-task`,formData) ;
    return response?.data;
}