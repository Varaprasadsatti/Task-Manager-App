import CommonForm from "@/components/common-form"
import { useToast } from "@/components/ui/use-toast"
import { signUpFormControls } from "@/config"
import { callRegisterUserApi } from "@/services"
import { Description } from "@radix-ui/react-dialog"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function SignUp(){

    const {toast} = useToast()
    const navigate = useNavigate()

    const formData = useForm({
        defaultValues : {
            name : "",
            email :"",
            password : "",
        }
    })

    async function onSubmit(getData){
        const data = await callRegisterUserApi(getData)
        
        if(data?.success){
            toast({
                title : "User Registration Successful",
                description : "Welcome"
            })
        }
        else{
            toast({
                title : "Error",
                description : "some error occured"
            })
        }

        navigate("/tasks/list")
        
    }

    return <div>
        <CommonForm formControls={signUpFormControls} form={formData} handleSubmit={onSubmit} btnText={"SignUp"} />
    </div>
}

export default SignUp