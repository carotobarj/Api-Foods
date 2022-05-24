import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAll, getAllDiets, filterByDiets, orderByScore, orderByName, filterByCreator} from '../../actions/index';
import { useDispatch, useSelector } from 'react-redux';
import PaginationRecipes from '../PaginationRecipes/PaginationRecipes';
import SearchBar from '../SearchBar/SearchBar';
import RecipeCard from '../RecipeCard/RecipeCard';
import s from './Home.module.css';
import image from '../../images/food3.jpeg';
import Loading from '../Loading/Loading';
import NotFoundRecipe from '../NotFound/NotFoundRecipe';

export default function Home() {

    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const dietType = useSelector((state) => state.dietType);
    const [loading, setLoading] = useState(true);

    // eslint-disable-next-line
    const [order, setOrder] = useState('');
   
    const [pageCurrent, setPageCurrent] = useState(1);
    const pageSize = 9;
    const indexOfLastRecipes = pageCurrent * pageSize;
    const indexOfFirstRecipes = indexOfLastRecipes - pageSize;
    const currentRecipes = allRecipes?.slice(indexOfFirstRecipes, indexOfLastRecipes)

if(allRecipes.length > 0 && loading){
    setLoading(false);
}


    const page = (pageNumber) => {
        setPageCurrent(pageNumber)
    };

    const goToNextPage = () => setPageCurrent(pageCurrent + 1);
    const goToPreviousPage = () => {
        if (pageCurrent > 1) setPageCurrent(pageCurrent - 1)
    }
    useEffect(() => {
        dispatch(getAllDiets());
        dispatch(getAll())
    }, [dispatch]);

    function handleOnClick(e) {
        window.location.reload();
        //dispatch(getAll())
        //e.preventDefault();
        
       

    }
    function handleFilterByCreator(e) {
        e.preventDefault();
        dispatch(filterByCreator(e.target.value));
    }
    function handleFilterByDiets(e) {
        dispatch(filterByDiets(e.target.value))
        setPageCurrent(1)
        setOrder(`${e.target.value}`)
    }
    function handleScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`)
    }
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setPageCurrent(1);
        setOrder(`Ordenado ${e.target.value}`)
    }
    return (
        <div className={s.container}>
             <img className={s.image} src={image}alt=''/> 
            <h1 className={s.Titulo}>MY RECIPES ☕️</h1>
            <button className={s.btnR} onClick={e => (handleOnClick(e))}>Reload all Recipes</button>
            <div> 
                <Link to="/recipe" className={s.vinculo}> Create you own recipe </Link>
            </div>
            <div className={s.busqueda}>
                <SearchBar
                />
            </div>
            <div className={s.filros}>

                <select onChange={e => handleSort(e)} className={s.selected}>
                    <option value='Alphabetical Order'> ALPHABETICAL ORDER </option>
                    <option value='AZ'> Ordenar A-Z </option>
                    <option value='ZA'> Ordenar Z-A </option>
                </select>

                <select onChange={e => handleFilterByCreator(e)} className={s.selected}>
                    <option value='ALL'> ALL RECIPES </option>
                    <option value='createdInDb'> Recipes Created </option>
                    <option value='JE'> Recipes Api </option>
                </select>

                <select onChange={(e) => handleFilterByDiets(e)} className={s.selected}>
                <option value='ALL'> TOTAL RECIPES </option>
                {dietType?.map(el => (
                            <option key={el} value={el}>{el}</option>
                        ))
                        }
                </select>
                <select onChange={e => handleScore(e)} className={s.selected}>
                    <option value='Order By Score'> ORDER BY SCORE </option>
                    <option value='Score-+'> Score -+</option>
                    <option value='Score+-'> Score +- </option>
                </select>
            </div>

            <div className={s.card2}>
                {
                    currentRecipes.length > 0 && !loading ? (
                        currentRecipes && currentRecipes.map(el => {

                            return (
                                <div key={el.id} className={s.card2} >

                                    <Link to={'/recipes/' + el.id}>
                                        <RecipeCard
                                            key={el.id}
                                            title={el.title}
                                            image={el.image}
                                            score={el.score}
                                            healthScore={el.healthScore}
                                            dietType={el.dietType|| el.dietTypes.map(el => el.name)}
                                            dishTypes={el.dishTypes}
                                            createdInDB={el.createdInDB}
                                    
                                        />

                                    </Link>

                                </div>
                            )
                        })
                    ) : !currentRecipes.length > 0 && loading ? (
                        <Loading/>
                    ) : (
                        <NotFoundRecipe/>
                    )
                }
            </div>
            <PaginationRecipes
                pageSize={pageSize}
                allRecipes={allRecipes.length}
                page={page}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
            />
        </div>
    )
}