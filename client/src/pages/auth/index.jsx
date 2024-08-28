import SignIN from "@/components/auth/sign-in"
import SignUp from "@/components/auth/sign-up"
import CommonButton from "@/components/common-button"
import { useState } from "react"

function AuthPage(){

    const [isLoginView, setIsLoginView] = useState(false)

    return (
        <div className="flex flex-auto justify-center items-center p-5 sm:p-10 min-h-screen h-full bg-gray-900">
            <div className="flex h-full flex-auto flex-col justify-center items-center bg-white py-5 min-w-10 max-w-2xl rounded-2xl">
                <h3 className="text-3xl font-bold text-gray-900">{isLoginView ? "Welcome Back!" : "Join Us Today!"}</h3>
                <div className="mt-5">
                {
                   isLoginView ? 
                   <SignIN /> : <SignUp />
                }
                </div>
                <div className="mt-5">
                <CommonButton onClick={()=>setIsLoginView(!isLoginView)}
                buttonText={ isLoginView? "Create New Account" : "Already Registered ?" }
                type={"button"}
                />
                </div> 
            </div>
            </div>
    )
}

export default AuthPage