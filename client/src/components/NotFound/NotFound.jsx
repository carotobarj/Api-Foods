import React from "react";
import s from './NotFound.module.css';
import image from '../../images/pageNotFound.png'

export default function NotFound() {

    return (
        <div>
        <img className={s.notFound} src={image}alt=''/>
    </div>
    )
}

