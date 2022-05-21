import React from 'react';
import s from './RecipeCard.module.css';


export default function RecipeCard({ title, summary, score, healthScore, image, steps, dietTypes, dishTypes, createdInDB, createdAt, updatedAt }) {
   
    return (
        <div className={s.container}>
            <div className="s.image">
                <img src={image} alt='Not Found' width='250px' height='200px' />
            </div>
            <div className="s.content">
                <p>{title}</p>
                <p> {summary}</p>
                <p>{score}</p>
                <p>{healthScore}</p>
                <p>{steps}</p>
                <p>{dietTypes}</p>
                <p> {dishTypes}</p>
            </div>
        </div>
    )
}