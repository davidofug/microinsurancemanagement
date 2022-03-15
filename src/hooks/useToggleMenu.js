import { useState } from "react";

const useToggleMenu = () => {
    const [ largeContentClass, setLargeContentClass ] = useState(localStorage.getItem('preferredToggleMenu') ? !JSON.parse(localStorage.getItem('preferredToggleMenu')) : false)

    const minimiseMenu = () => {
        setLargeContentClass(true)
        localStorage.setItem('preferredToggleMenu', false)
    }
    const maximiseMenu = () => {
        setLargeContentClass(false)
        localStorage.setItem('preferredToggleMenu', true)
    }

    return [largeContentClass, minimiseMenu, maximiseMenu]
}

export default useToggleMenu