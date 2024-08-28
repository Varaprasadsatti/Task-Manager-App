import CommonCard from "@/components/common-card"
import { scrumBoardOptions } from "@/config"
import { TaskManagerContext } from "@/context"
import { getAllTasksApi, updateTaskApi } from "@/services"
import { Fragment, useContext, useEffect } from "react"

function ScrumBoardPage(){

    const {user, setTaskList, taskList, setIsLoading} = useContext(TaskManagerContext)

    async function fetchListOfTasks(){
        setIsLoading(true)
        const response = await getAllTasksApi(user?._id)

        if(response){
            setIsLoading(false)
            setTaskList(response?.taskList)
        }   
    }

    async function renderTasksByChangedStatus(currentTask){
        await updateTaskApi(currentTask),
        await fetchListOfTasks()
    }

    function onDragStart(event,getTaskId){
        event.dataTransfer.setData("id",getTaskId);
    }

    function onDrop(event,getCurrentTask){
        const getDraggedTaskId = event.dataTransfer.getData("id")

        let currentTask = taskList.find((item)=>item?._id.toString()===getDraggedTaskId)

        currentTask = {
            ...currentTask,
            status : getCurrentTask
        }

        renderTasksByChangedStatus(currentTask)
    }

    function renderTaskByStatus(){
        const taskStatuses = {
            todo: [],
            inProgress: [],
            blocked: [],
            review: [],
            done: [],
          };
      
        taskList.forEach((taskItem)=>{
            taskStatuses[taskItem.status].push(
                <div
                onDragStart={taskItem?.status !== "done" ? (event)=>onDragStart(event,taskItem._id):null}
                 draggable={taskItem.status !== "done" ? true : false} 
                 className="mb-3" >
                    <CommonCard extraTextStyles={taskItem.status === "done" ? "line-through" : null} title={taskItem?.title} description={taskItem?.status}/>
                </div>
            )
        })

        return taskStatuses;
    }

    useEffect(()=>{
        if(user !== null) fetchListOfTasks()
    },[user])

    return (
        <Fragment>
            <div className="grid lg:grid-cols-5 gap-2 h-full grid-cols-2 sm:grid-cols-3">
                {
                    scrumBoardOptions.map(item => ( 
                        <div onDrop={(event)=>onDrop(event,item?.id)} onDragOver={(event)=>event.preventDefault()}  key={item.id} className="border bg-gray-700 border-[gray] rounded overflow-auto"     >
                            <div className="px-1 py-3 text-center bg-gray-950 border-none mb-3">
                                <h3 className="text-2xl font-extrabold text-white" >{item?.label}</h3>
                            </div>
                            <div className="p-3">{renderTaskByStatus()[item.id]}</div>
                        </div>
                    ))
                }
            </div>
        </Fragment>
    )
}

export default ScrumBoardPage