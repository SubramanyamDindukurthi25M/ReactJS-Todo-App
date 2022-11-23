import { useEffect } from "react"

export const ModalText = ({msg,type,hideMessage,data}) => {
    // To disppear alert message
    useEffect(() => {
        const timeOut = setTimeout(() => {
            hideMessage()
        }, 3000)
        return () => clearTimeout(timeOut)
    }, [data])
    return (
        <div className={`alert alert-${type} text-capitalize`} role='alert'>
            {msg}
        </div>
    )
}