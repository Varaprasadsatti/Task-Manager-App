import CommonForm from "@/components/common-form"
import { signInFormControls } from "@/config"
import { callLoginUserApi } from "@/services"
import { get, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

function SignIN() {

    const navigate = useNavigate()

    const formData = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    async function handleSubmit(getData) {
        const data = await callLoginUserApi(getData)
        if (data?.success) navigate("/tasks/list")

    }

    return (
        <div>
            <CommonForm form={formData} btnText={"signIn"} handleSubmit={handleSubmit} formControls={signInFormControls} />
        </div>
    )
}

export default SignIN