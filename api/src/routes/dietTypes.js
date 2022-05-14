const { Router } = require('express');
require('dotenv').config();
const {DietType} = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
const router = Router();


router.get('/', async (req, res) => {

    try {
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const apiDiets = apiInfo.data.results?.map(e => e.diets)
        const repeatedDiets = apiDiets.flat()
        const listOfDiets = [...new Set(repeatedDiets)] //el set solo funciona con valores primitivos, no objetos OJO!

        const diets = listOfDiets.map(name => ({ name }));
        diets.forEach((e) => {
            DietType.findOrCreate({
                where: {
                    name: e.name
                }
            })
        })
        const finalAllDiets = await DietType.findAll()
        //console.log(finalAllDiets)
        res.json(finalAllDiets);
    } catch(err) {
        console.log(err)
    }

        //   let dietTypes = [];
        // const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=${API_KEY}`)
        // apiInfo.data.results.map(e => e.diets.forEach(el => {
        //     if (!dietTypes.includes(el)) {
        //         dietTypes = dietTypes.concat(el)
        //     }
        // }))
        // dietTypes.forEach((e) => {
        //     DietType.findOrCreate({
        //         where: {
        //             name: e
        //         }
        //     })
        // })
        // const finalAllDiets = await DietType.findAll()
        // //console.log(finalAllDiets)
        // res.send(finalAllDiets);
    
})  


module.exports = router;