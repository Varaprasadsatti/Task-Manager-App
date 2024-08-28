import CommonDialog from "@/components/common-dialog";
import { addNewTaskFormControls } from "@/config";

function AddNewTask({showDialog, setShowDialog, handleSubmit, taskFormData, currentEditingId ,setCurrentEditingId}){

    return <CommonDialog
       showDialog={showDialog}
       onOpenChange={() => {
        setShowDialog(false);
        currentEditingId ? taskFormData.reset() : null;
        setCurrentEditingId(null)
       }}
       title = { currentEditingId ? "Edit Task" : "Post New Task" }
       formControls={addNewTaskFormControls}
       btnText={"Add"}
       handleSubmit={handleSubmit}
       formData={taskFormData}
    />
}

export default AddNewTask