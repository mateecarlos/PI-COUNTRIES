const axios = require('axios');
const { Router } = require('express');
const router = Router();
const { Activity, Country } = require('../db');


//// RUTA PARA TRAER TODAS LAS ACTIVIDADES CREADAS/////
router.get('/', async (req, res) => {
    try { // Si encuentro
        const getAllActivities = await Activity.findAll({ // Creo constante para guardar todas las actividades encontradas en el modelo de la db
            inlude: Country, // que inluyan modelo Country
        })
        res.status(200).send(getAllActivities); // Si encuentro retorno todas las actividaddes
    } catch(error) { // Sino encuentro
        res.status(404).send("No se encontraron activdades"); // Retorno error
    }
})

//// RUTA PARA CREAR LAS ACTIVIDADES ////
router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries, coste } = req.body; // constasnte para pasar por body los datos de la actividad a crear
    try { // Si
        const createActivity = await Activity.create({ // Constante para crear la actividad en con el modelo Activity
            // Atributos necesarios
            name,
            difficulty,
            duration,
            season,
            coste
        });

        const findAcivity = await Country.findAll({ // Constante para guardar la busqueda en la db Country
            where: { // Donde el id sea countries
                id: countries,
            }
        });

        const resultado = createActivity.addCountries(findAcivity); // A la actividad creada le agrego el pais 
        res.status(200).send(resultado) // Devuelvo el la actividad creada
    } catch(error) { // Sino
        res.status(404).send("Los datos son incorrectos") // Retorno el error
    }
})









module.exports = router;