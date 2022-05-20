import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { recipeDetail, cleanData, } from "../../actions";
import s from "./RecipeDetail.module.css";
import image from '../../images/food5.jpeg';


export default function RecipeDetail() {

    const { id } = useParams();
    const detail = useSelector((state) => state.recipeDetail);
    console.log(detail)
    const dispatch = useDispatch();


    useEffect(() => {
        
        dispatch(recipeDetail(id));
                return function () {
            dispatch(cleanData())
        }
    }, [dispatch, id])

    console.log(detail)

    let detailRecipe = useSelector((state) => state.recipeDetail);
    
    function detailSummary() {
        return { __html: detailRecipe.summary }
    }

    return (

        <div className={s.container}>
            <img className={s.image} src={image}alt=''/>
            {
                detail ?

                    <div>
                        <h1>{detail.title}</h1>
                        <img src={detail.image} alt="" width="300px" />
                        <p>{detail.score}</p>
                        <p>{detail.healthScore}</p>
                        <p> Dish Type:</p>
                        <p>{detail.dishTypes}</p>
                        <p> Diet Type:</p>
                        {detail.DietType ? detail.DietTypeDietType.map(e =>e.name) : detail.dietType}
                        <p> Summary:</p>
                        <p dangerouslySetInnerHTML={detailSummary()}></p>
                        {/* <span>{detail.summary}</span> */}
                        <p> Instructions:</p>
                        <span>{detail.steps}</span>
                        <div>
                        <br/>
                            <Link to={'/home'}>
                                <button>Go back to Home</button>
                            </Link>
                        </div>
                    </div> : <h1>Loading...</h1>
            }


        </div>
    )

}