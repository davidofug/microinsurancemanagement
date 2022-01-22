import { useState } from "react";

const useDialog = () => {
    const [ open, setOpen ] = useState(false)

    const handleShow = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return [open, handleShow, handleClose]
}

export default useDialog;