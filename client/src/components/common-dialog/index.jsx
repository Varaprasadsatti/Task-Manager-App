import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import CommonForm from "../common-form";



function CommonDialog( {showDialog, onOpenChange, title, formControls, btnText, formData, handleSubmit}){

    return (
        <Dialog open={showDialog} onOpenChange={onOpenChange} >
            <DialogContent className="sm:max-w-screen h-[450px] overflow-auto" >
                <DialogTitle>{title}</DialogTitle>
                <div>
                    <CommonForm formControls={formControls} form={formData} handleSubmit={handleSubmit} btnText={btnText} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommonDialog