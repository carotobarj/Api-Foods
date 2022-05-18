const { Router } = require('express');
require('dotenv').config();
const { API_KEY } = process.env;
const {Recipe, DietType } = require('../db');
const axios = require('axios');

const router = Router();

const getRecipesApi = async () => {
    try {
        const urlApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?number=100&addRecipeInformation=true&diet&apiKey=${API_KEY}`);
    
        const getApiInfo = await urlApi.data.results.map(e => {
            return {
                id: e.id,
                title: e.title,
                dietType: e.diets,
                summary: e.summary,
                score: e.spoonacularScore,
                healthScore: e.healthScore,
                image: e.image,
                dishTypes: e.dishTypes,
                steps: e.analyzedInstructions[0]?.steps.map(each => {return each.step})    
                }
        })
        return getApiInfo;
     
    
    } catch (error) {
      console.log(error);  
    }
}

    const getRecipesDB = async () => {
        return await Recipe.findAll({
            include: {
                model: DietType,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });
    }
    const getAllRecipes = async () => {
        const recipesApi = await getRecipesApi();
        const recipesDB = await getRecipesDB();
        const totalRecipes = recipesApi.concat(recipesDB);
        return totalRecipes;
    }     

    
router.get('/', async(req, res) => {
const allRecipes = await getAllRecipes()
const {name} = req.query;
if(name){
    let nameRecipe = await allRecipes.filter(el => el.title.toLowerCase().includes(name.toLowerCase()));
     (nameRecipe.length > 0 ? res.json(nameRecipe): res.send({ message: 'Recipe not found' }))
}else{
    res.json(allRecipes)
}
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    const getTotalInfo = await getAllRecipes();
    try {
        getTotalInfo.forEach(el => {
            if (el.id == id) {
                res.json({
                    id: el.id,
                    title: el.title,
                    dietType: el.dietType,
                    summary: el.summary,
                    score: el.score,
                    healthScore: el.healthScore,
                    dishTypes: el.dishTypes,
                    image: el.image,
                    steps: el.steps
                 
                })
            }
        })

    } catch (error) {
        console.log("ID not found");
    }

});      
              


module.exports = router;
