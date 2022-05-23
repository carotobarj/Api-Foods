import React from "react";
import image from '../../images/notFoundID.png';
import s from './NotFoundId.module.css';


export default function NotFound() {

    return (
        <div>
            <img className={s.imageID} src={image}alt=''/>
        </div>
    )
}
