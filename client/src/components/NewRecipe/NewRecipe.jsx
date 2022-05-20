import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { postRecipe, getAllDiets } from '../../actions/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import s from './NewRecipe.module.css';
import image from '../../images/food6.jpeg';

function validate(input) {
    let errors = {};
    input.title
        ? (errors.title = "")
        : (errors.title = "You must name the recipe");
    input.summary
        ? (errors.summary = "")
        : (errors.summary = "You must provide a summary");
    input.diets === 0
        ? (errors.diets = "Choose at least one diet")
        : (errors.diets = "");
    if (!input.score) {
        errors.score = 'You must provide a score'
    } else if (input.score > 100 || input.score < 0) {
        errors.score = 'the range must be between 1 and 100'
    }
    if (!input.healthScore) {
        errors.healthScore = 'You must provide a healthScore'
    } else if (input.healthScore > 100 || input.healthScore < 0) {
        errors.healthScore = 'The range must be between 1 and 100'
    }
    const imgValidate = /(https?:\/\/.*\.(?:png|jpg))/
    if (!input.image || !imgValidate.test(input.image)) {
        errors.image = 'Please insert an image type URL'
    } else {
        errors.image = "";
    }
    return errors;
}
export default function NewRecipe() {
    const dispatch = useDispatch();
    const history = useHistory();
    const dietType = useSelector((state) => state.dietType);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title: '',
        summary: '',
        image: '',
        dietType: [],
        score: '',
        healthScore: '',
        steps: []
    });


    function handleChange(e) {
        setInput((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }
    function handleSelect(e) {
        setInput({
            ...input,
            dietType: [...input.dietType, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.title && input.summary && input.image && input.healthScore && input.steps && input.dietType) {
            console.log(input)
            dispatch(postRecipe(input))
            alert('Recipe created succesfully!')
            setInput({
                title: '',
                summary: '',
                image: '',
                dietType: [],
                score: '',
                healthScore: '',
                steps: []
            })
            history.push('/home')
        } else {
            alert('Please complete all fields')
        }
    }

    function handleDelete(el) {
        setInput({
            ...input,
            dietType: input.dietType.filter(dietType => dietType !== el)
        })
    }

    useEffect(() => {
        dispatch(getAllDiets());
    }, [dispatch]);

    return (
        <div className={s.container}>
 <img className={s.image} src={image}alt=''/>
            <h1 className={s.titulo}>New Recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={s.formGral}>
                    <label>Title:</label>
                    <input type='text' placeholder='Complete here...' value={input.title} name='title' onChange={(e) => handleChange(e)} />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div>
                    <label>Summary:</label>
                    <input type='text' placeholder='Complete here...' value={input.summary} name='summary' onChange={(e) => handleChange(e)} />
                    {errors.summary && <p>{errors.summary}</p>}
                </div>
                <div className={s.image2}>
                    <label>Imagen:</label>
                    <input type='text' placeholder='Complete here...' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                    {errors.image && <p> {errors.image}</p>}
                </div>
                <div className={s.diet}>
                    <label>Diet Types:</label>
                    <select onChange={(e) => handleSelect(e)}>
                        <option value={"gluten free"}>gluten free</option>
                        <option value={"dairy free"}>dairy free</option>
                        <option value={"lacto ovo vegetarian"}>lacto ovo vegetarian</option>
                        <option value={"vegan"}>vegan</option>
                        <option value={"pescatarian"}>pescatarian</option>
                        <option value={"primal"}>primal</option>
                        <option value={"fodmap friendly"}>fodmap friendly</option>
                        <option value={"paleolithic"}>paleolithic</option>
                        <option value={"whole 30"}>whole 30</option>
                    </select>
                    <ul><li>{input.dietType}</li></ul>
                    {errors.diets && <p>{errors.diets}</p>}
                </div>

                <div>
                    <label>score:</label>
                    <input type='text' placeholder='Complete here...' value={input.score} name='score' onChange={(e) => handleChange(e)} />
                    {errors.score && <p>{errors.score}</p>}
                </div>
                <div>
                    <label>healthScore:</label>
                    <input type='text' placeholder='Complete here...' value={input.healthScore} name='healthScore' onChange={(e) => handleChange(e)} />
                    {errors.healthScore && <p>{errors.healthScore}</p>}
                </div>
                <div className={s.instructions}>
                    <label className='labelInstruct'>Instructions:</label>
                    <textarea type='text' className={s.instructions} placeholder='Complete here...' value={input.analyzedInstructions} name='analyzedInstructions'
                        onChange={(e) => handleChange(e)} />

                </div>
                <button type='submit'>Create</button>
            </form>
            {input.dietType.map(el =>
                <div key={el} className={s.delDiet}>
                    <p> {el}</p>
                    <button className='btnX' onClick={() => handleDelete(el)}>X</button>
                </div>

            )}
            <br/>

            <Link to="/home"><button>Go Back to Home</button></Link>
        </div>
    )
}
