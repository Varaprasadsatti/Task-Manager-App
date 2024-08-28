import CommonButton from "@/components/common-button";
import AddNewTask from "@/components/tasks/add-new-task";
import TaskItem from "@/components/tasks/task-item";
import { Skeleton } from "@/components/ui/skeleton";
import { TaskManagerContext } from "@/context";
import { addNewTaskApi, deleteTaskApi, getAllTasksApi, updateTaskApi } from "@/services";
import { Fragment, useContext, useEffect, useState } from "react";

function TasksPage(){
    const [showDialog, setShowDialog] = useState(false)

    const {taskList, setTaskList, isLoading, setIsLoading,user, taskFormData ,currentEditingId,setCurrentEditingId} = useContext(TaskManagerContext)

    async function fetchListOfTasks(){
        setIsLoading(true)
        const response = await getAllTasksApi(user?._id)

        if(response){
            setIsLoading(false)
            setTaskList(response?.taskList)
        }   
    }

    async function handleSubmit(getData){
        const response = currentEditingId !== null ? await updateTaskApi({
            ...getData,
            _id: currentEditingId,
            userId : user?._id
        })
        
        : await addNewTaskApi({
            ...getData,
          userId : user?._id
        })
        
        console.log(response,"response")
        
        
        if(response){
            setShowDialog(false)
            taskFormData.reset()
            fetchListOfTasks()
            setCurrentEditingId(null)
        }
        
    }

    async function handleDelete(getTaskId){
        
        const response = await deleteTaskApi(getTaskId)
        

        if (response?.success){
            fetchListOfTasks()
        }
    }

    useEffect(()=>{
        if (user !== null) fetchListOfTasks();
            }, [user]);


    (isLoading) ? <Skeleton /> : null 

    return <Fragment>
        <div className="mb-5">
            <CommonButton onClick={()=>setShowDialog(true)} buttonText={"Add New Task"} />
        </div>
        <div className="mt-5 flex flex-col">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
                {
                    taskList?.length > 0 ?
                    taskList.map((taskItem)=><TaskItem taskFormData={taskFormData} setCurrentEditingId={setCurrentEditingId} setShowDialog={setShowDialog} handleDelete={handleDelete} item={taskItem} />)
                    : <h1>No Tasks Added</h1>
                }
            </div>
        </div>
        <AddNewTask setCurrentEditingId={setCurrentEditingId} currentEditingId={currentEditingId} taskFormData={taskFormData} handleSubmit={handleSubmit} showDialog={showDialog} setShowDialog={setShowDialog} />
    </Fragment>
}

export default TasksPage