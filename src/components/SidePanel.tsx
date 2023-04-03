import React, {useState} from "react";
import './scssStyles/SidePanel.scss'
import {classNames} from '../utils/classes'
import {ImCross} from 'react-icons/im'
import Tienda from "./Tienda";
interface SidePanelProps {
    viewPanel: boolean;
    setViewPanel: (value: boolean) => void;
}
function SidePanel({viewPanel, setViewPanel}: SidePanelProps){

    const handleClick = ():void => {
    setViewPanel(!viewPanel)
    }

return (
    <div className={classNames('SidePanel', viewPanel? 'expanded' : 'collapsed')}> 
        <div className = "menuButton">
           <button className='burgerButton' onClick={handleClick} >
            <ImCross/> 


           </button>

        </div>
        <Tienda/>

    </div>
)
      
    
}

export default SidePanel;