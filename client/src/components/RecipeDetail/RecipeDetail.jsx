import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { recipeDetail, cleanData, } from "../../actions";
import s from "./RecipeDetail.module.css";
import image from '../../images/food5.jpeg';
import NotFoundId from "../NotFound/NotFoundId";
import Loading from "../Loading/Loading";


export default function RecipeDetail() {
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const detail = useSelector((state) => state.recipeDetail);
    console.log(detail);
    const dispatch = useDispatch();

    if(Object.keys(detail).length > 0 && loading){
        setLoading(false);
    }
    useEffect(() => {
      dispatch(recipeDetail(id));
     return dispatch(cleanData(id))
        
    }, [dispatch, id])

    
    function detailSummary() {
        return { __html: detail.summary }
    }

    return (

        <div className={s.container}>
            <img className={s.image} src={image}alt=''/>
            
                {
                    Object.keys(detail).length > 0 && !loading ?

                    <div>
                        <h1>{detail.title}</h1>
                        <img src={detail.image} alt="" width="300px" />
                        <p>{detail.score}</p>
                        <p>{detail.healthScore}</p>
                        <p> Dish Type:</p>
                        <p>{detail.dishTypes}</p>
                        <p> Diet Type:</p>
                        {detail.dietType?.map((el) => el).join(", ")}
                        <p> Summary:</p>
                        <p dangerouslySetInnerHTML={detailSummary()}></p>
                        <p> Instructions:</p>
                        <span>{!detail.steps? "not instructions avalailable" : detail.steps}</span>
                        <div>
                        <br/>
                            <Link to={'/home'}>
                                <button>Go back to Home</button>
                            </Link>
                        </div>
                    </div> : !Object.keys(detail).length > 0 && loading ? (
                        <Loading/>
                    ): detail.length === 0 && (
                        <NotFoundId/>
                     )
            }

        </div>
    )

}