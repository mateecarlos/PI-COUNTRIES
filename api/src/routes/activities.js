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
        // if(getAllActivities.length) {
        //     getAllActivities = getAllActivities.map((e) => {
        //         return {
        //             id: e.id,
        //             name: e.name,
        //             difficulty: e.difficulty,
        //             duration: e.duration,
        //             season: e.season,
        //             countries: e.countries.length? e.countries.map((e) => {
        //                 e.name
        //             }) : "No se encontro el pais"
        //         }
        //     })
        // }
        res.status(200).send(getAllActivities);
    } catch(error) {
        res.status(404).send("No se encontraron activdades");
    }
})

//// RUTA PARA CREAR LAS ACTIVIDADES ////
router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    console.log(req.body)
    try {
        const createActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season
        });

        const findAcivity = await Country.findAll({
            where: {
                id: countries,
            }
        });

        const resultado = createActivity.addCountries(findAcivity);
        res.status(200).send(resultado)
    } catch(error) {
        res.status(404).send("Los datos son incorrectos")
    }
})









module.exports = router;