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
        input.dishTypes
        ? (errors.dishTypes = "")
        : (errors.dishTypes = "You must provide a dish type");
        input.instructions
        ? (errors.instructions = "")
        : (errors.instructions = "You must provide an instruction");
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
        dishTypes:'',
        healthScore: '',
        instructions: '',
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
        if (input.title) {
            console.log(input)
            dispatch(postRecipe(input))
            alert('Recipe created succesfully!')
            setInput({
                title: '',
                summary: '',
                image: '',
                dietType: [],
                score: '',
                dishTypes:'',
                healthScore: '',
                instructions: '',
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
            <img className={s.image} src={image} alt='' />
            <h1 className={s.titulo}>New Recipe</h1>
            <form className={s.formGral}onSubmit={(e) => handleSubmit(e)}>
                   <label className={s.label}>Title:</label>
                <div >
                    <input className={s.input} type='text' placeholder='Complete here...' value={input.title} name='title' onChange={(e) => handleChange(e)} />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                    <label className={s.label}>Summary:</label>
                <div >
                    <input className={s.input} type='text' placeholder='Complete here...' value={input.summary} name='summary' onChange={(e) => handleChange(e)} />
                    {errors.summary && <p>{errors.summary}</p>}
                </div>
                    <label className={s.label}>Imagen:</label>
                <div >
                    <input className={s.input} type='text' placeholder='Complete here...' value={input.image} name='image' onChange={(e) => handleChange(e)} />
                    {errors.image && <p> {errors.image}</p>}
                </div>
                    <label className={s.label}>Diet Types:</label>
                <div >
                       <select onChange={(e) => handleSelect(e)} className={s.select}>
                        {dietType?.map(el => (
                            <option key={el} value={el}>{el}</option>
                        ))
                        }
                    </select>
                    <ul><li>{input.dietType}</li></ul>
                    {errors.diets && <p>{errors.diets}</p>}
                </div>
                <label className={s.label}>Dish Type:</label>
                <div>
                    <input className={s.input} type='text' placeholder='Complete here...' value={input.dishTypes} name='dishTypes' onChange={(e) => handleChange(e)} />
                    {errors.dishTypes && <p>{errors.dishTypes}</p>}
                </div>
                    <label className={s.label}>score:</label>
                <div >
                    <input className={s.input} type='text' placeholder='Complete here...' value={input.score} name='score' onChange={(e) => handleChange(e)} />
                    {errors.score && <p>{errors.score}</p>}
                </div>
                <div >
                    <label className={s.label}>healthScore:</label>
                    <input className={s.input} type='text' placeholder='Complete here...' value={input.healthScore} name='healthScore' onChange={(e) => handleChange(e)} />
                    {errors.healthScore && <p>{errors.healthScore}</p>}
                </div>
                <label className='labelInstruct'>Instructions:</label>
                <div className={s.label}>
                    <textarea type='text' className={s.input} placeholder='Complete here...' value={input.instructions} name='instructions'
                        onChange={(e) => handleChange(e)} />
                    {errors.instructions && <p>{errors.instructions}</p>}
      

                </div>
                <button type='submit'>Create</button>
            </form>
            {input.dietType.map(el =>
                <div key={el} className={s.delDiet}>
                    <p> {el}</p>
                    <button className='btnX' onClick={() => handleDelete(el)}>X</button>
                </div>

            )}
          
            <br />

            <Link to="/home"><button>Go Back to Home</button></Link>
        </div>
    )
}
