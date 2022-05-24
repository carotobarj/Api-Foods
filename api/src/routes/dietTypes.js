const { Router } = require('express');
require('dotenv').config();
const {DietType} = require('../db');
const { API_KEY } = process.env;
const axios = require('axios');
const router = Router();
const InfoTotal = require('../../InfoTotal.json');


router.get('/', async (req, res) => {

    let dietTypes = [];
   const apiInfo = InfoTotal
    //const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=${API_KEY}`)
    apiInfo.results.map(e => e.diets.forEach(el => {
        if (!dietTypes.includes(el)) {
            dietTypes = dietTypes.concat(el)
        }
    }))
    dietTypes.forEach((e) => {
        DietType.findOrCreate({
            where: {
                name: e
            }
        })
    })
    const finalAllDiets = await DietType.findAll()
    const mapDiets = finalAllDiets.map(e => e.dataValues.name)
    //console.log(finalAllDiets)
    //console.log(prueba)
    res.send(mapDiets);
})


module.exports = router;