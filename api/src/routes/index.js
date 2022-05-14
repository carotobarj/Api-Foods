const { Router } = require('express');
const dietTypes = require('./dietTypes');
const recipes = require('./recipes');




// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/types', dietTypes);
router.use('/recipes', recipes);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
