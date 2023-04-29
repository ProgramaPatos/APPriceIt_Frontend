import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCoffee, faLaptop, faBeer , faMap, faStore } from "@fortawesome/free-solid-svg-icons";
const Icons = () => {
    // definir un arrelgo de iconos
    const icons = [faCoffee, faLaptop, faBeer, faMap, faStore]
    const getIcon = () => {
        const random = Math.floor(Math.random() * icons.length)
        return icons[random]   
    }

    const [icon, setIcon] = useState(getIcon())

    

    return (
        <>
        <FontAwesomeIcon  icon={icon} />
        </>

    )
}

export default Icons