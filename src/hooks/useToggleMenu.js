import { useState } from "react";

const useToggleMenu = () => {
    const [ largeContentClass, setLargeContentClass ] = useState(localStorage.getItem('preferredToggleMenu') ? !JSON.parse(localStorage.getItem('preferredToggleMenu')) : false)

    const minimiseMenu = () => setLargeContentClass(true)
    const maximiseMenu = () => setLargeContentClass(false)

    return [largeContentClass, minimiseMenu, maximiseMenu]
}