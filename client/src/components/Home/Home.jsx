import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, filterByCreator, filterByDiets, getAllDiets, orderByName, orderByScore } from '../../actions';
import { Link } from 'react-router-dom';
import RecipeCard from '../RecipeCard/RecipeCard';
import PaginationRecipes from '../PaginationRecipes/PaginationRecipes';
import SearchBar from '../SearchBar/SearchBar';
import s from '../Home/Home.module.css';
//import image from '../../images/control.jpg';

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [, setOrden] = useState('false');
    const [pageCurrent, setPageCurrent] = useState(1);
    const [pageSize,] = useState(9);
    const indexOfLastRecipe = pageCurrent * pageSize;
    const indexOfFirstRecipe = indexOfLastRecipe - pageSize;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const allDiets = useSelector((state) => state.dietType);

    const page = (pageNumber) => {
        setPageCurrent(pageNumber)
    }
    const goToNextPage = () => setPageCurrent(pageCurrent + 1);
    const goToPreviousPage = () => {
        if (pageCurrent > 1) setPageCurrent(pageCurrent - 1)
    }

    useEffect(() => {
        dispatch(getAll());
        dispatch(getAllDiets());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getAll());
    }
    function handleFilterByCreator(e) {
        e.preventDefault();
        dispatch(filterByCreator(e.target.value));
    }

    function handlefilterByDiets(e) {
        e.preventDefault();
        dispatch(filterByDiets(e.target.value));

    }
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setPageCurrent(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    function handleScore(e) {
        e.preventDefault();
        dispatch(orderByScore(e.target.value))
        setPageCurrent(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    return (

        <div className={s.container}>
            {/* <img className={s.image} src={image}alt=''/> */}
            <h1 className={s.Titulo}>RECIPES APP</h1>
            {console.log(allRecipes)}
            <div className={s.titulo}>
                <Link to="/recipes"> Create your own Recipe </Link>
            </div>
            <div className={s.titulo1}>
            </div>
            <h1 className={s.titulo2}>ALL RECIPES</h1>
            <div className={s.titulo3}>
                <button onClick={e => (handleClick(e))} className={s.btn}> Recargar </button>

            </div>
            <div className={s.busqueda}>
                <SearchBar/>
                </div>
            <div>

                <select onChange={e => handleSort(e)} >
                    <option value='ALPHABETICAL ORDER'> ALPHABETICAL ORDER </option>
                    <option value='AZ'> Ordenar A-Z </option>
                    <option value='ZA'> Ordenar Z-A </option>
                </select>
                <select onChange={e => handleFilterByCreator(e)}>
                    <option value='ALL'> Total Recipes </option>
                    <option value='createdInDb'> Recipes Created </option>
                    <option value='JE'> Recipes Api </option>
                </select>
                <select onChange={e => handlefilterByDiets(e)}>
                    <option value='ALL'> Diet Types </option>
                    {allDiets.map((el) => (
                        <option key={el.id} value={el.name}>{el.name}</option>
                    ))}

                </select>
                <select onChange={e => handleScore(e)}>
                    <option value='ORDER BY SCORE'> ORDER BY SCORE </option>
                    <option value='Score-+'> Score -+</option>
                    <option value='Score+-'> Score +- </option>
                </select>
            </div>
            <div >
                {
                    currentRecipes.length > 0 ? (
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
                                            dietType={el.dietType}
                                            dishTypes={el.dishTypes}
                                        />

                                    </Link>

                                </div>
                            )
                        })
                    ) : <p>"There are no recipes"</p>
                }

                <PaginationRecipes
                    pageSize={pageSize}
                    allRecipes={allRecipes.length}
                    page={page}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                />
            </div>
        </div>

    )
}

