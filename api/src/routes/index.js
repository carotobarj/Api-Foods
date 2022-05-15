const { Router } = require('express');
const dietTypes = require('./dietTypes');
const recipes = require('./recipes');
const recipe = require('./recipe');




// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/types', dietTypes);
router.use('/recipes', recipes);
router.use('/recipe', recipe);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
