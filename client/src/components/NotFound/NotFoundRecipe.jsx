import React from "react";
import s from "./NotFoundRecipe.module.css";
import image from '../../images/recipeNotFound.png';



export default function NotFound() {

    return (
        <div>
            <div>
                <img className={s.imageR} src={image} alt='' />

            </div>
        </div>
    )
}
