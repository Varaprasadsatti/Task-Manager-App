import { callUserAuthApi } from "@/services";
import { Description } from "@radix-ui/react-dialog";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";


export const TaskManagerContext = createContext(null)

function TaskManagerProvider ({children}){
    const [user,setUser] = useState(null)

    const [isLoading,setIsLoading] = useState(false);
    const [taskList,setTaskList] = useState([]);
    const [currentEditingId,setCurrentEditingId] = useState(null);

    const navigate = useNavigate()
    const location = useLocation()

    const taskFormData = useForm({
        defaultValues : {
            title : "",
            description : "",
            priority : "",
            status : "",
        }
    })


    useEffect(()=>{
        
        const verifyUserCookie = async () => {
            
            const data = await callUserAuthApi();

            if(data?.userInfo){
                setUser(data?.userInfo)
            }

            return (data?.success) ? navigate(location.pathname === "/auth" || location.pathname ==="/" ? "/tasks/list" : `${location.pathname}` ) : navigate("/auth")
        };

    
        verifyUserCookie()

    },[navigate, location.pathname])

    return <TaskManagerContext.Provider value={{user, setUser,taskFormData, isLoading,setIsLoading, taskList, setTaskList, currentEditingId,setCurrentEditingId}} >{children}</TaskManagerContext.Provider>
}

export default TaskManagerProvider;