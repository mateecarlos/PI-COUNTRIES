const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { Activity, Country } = require('../db');


//// RUTA PARA TRAER TODAS LAS ACTIVIDADES CREADAS/////
router.get('/', async (req, res) => {
    try {
        const getAllActivities = await Activity.findAll({
            inlude: Country,
        })
        res.status(200).send(getAllActivities);
    } catch(error) {
        res.status(404).send("No se encontraron activdades");
    }
})

//// RUTA PARA CREAR LAS ACTIVIDADES ////
router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        const createActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });

        const findAcivity = await Country.findAll({
            where: {
                name: countries,
            }
        });

        createActivity.addCountries(findAcivity);
        res.status(200).send("La actividad ha sido creada con exito")
    } catch(error) {
        res.status(404).send("Los datos son incorrectos")
    }
})









module.exports = router;