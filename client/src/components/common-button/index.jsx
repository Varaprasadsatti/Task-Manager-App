import { Button } from "../ui/button"


function CommonButton({onClick,buttonText,type,disabled}){
    return <Button 
    className="h-11 bg-gray-900 text-white font-bold border-none rounded p-2 hover:bg-gray-950 hover:text-white"
    onClick={onClick} disabled={disabled || false} type={type || "submit"}>
        {buttonText}
    </Button>
}

export default CommonButton