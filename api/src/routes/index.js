const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require ('./auth.js');
const countryRouter = require('./countries') // Creo constante de las funciones controladoras para countries
const activityRouter = require('./activities') //Creo constante de las funciones controladoras para activities

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countryRouter)
router.use('/activities', activityRouter)


module.exports = router;
