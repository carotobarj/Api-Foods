const { Router } = require('express');
const {Recipe, DietType } = require('../db');


const router = Router();

router.post('/' , async (req, res) => {
    try {
        const {title, summary, score, healthScore, image, steps, dietType, dishTypes} = req.body;
const newRecipe = await Recipe.create({
    title,
    summary,
    score,
    healthScore,
    image,
    steps,
    dietType,
    dishTypes
    });
    let dietTypesDB = await DietType.findAll({
        where:{ name: dietType }
    });
    newRecipe.addDietType(dietTypesDB);
    res.status(200).json({mensaje: 'Receta creada exitosamente'})

    } catch (error) {
        console.log(error);
    }
})    

module.exports = router;