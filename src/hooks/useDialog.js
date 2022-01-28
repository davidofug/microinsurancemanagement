import { useState } from "react";

const useDialog = (initialState = false) => {
    const [ open, setOpen ] = useState(initialState)

    const handleShow = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return [open, handleShow, handleClose]
}

export default useDialog;