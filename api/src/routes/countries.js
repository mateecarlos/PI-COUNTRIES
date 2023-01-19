const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Op, Country , Activity} = require('../db')

///// FUNCION PARA TRAER DATOS DE LA API A LA BASE DE DATOS //////
const getCountry = async () => {
        const countriesApi = await axios.get("https://restcountries.com/v3/all"); // Guardo en countriesApi la info que trae el .get a la api 
        const dataCountries = await countriesApi.data.map((e) => {  // dataCountries pido la informacion que necesito de toda la que me trae la api
            return {
                id: e.cca3,
                name: e.name.common,
                flags: e.flags[1],
                continents: e.region,
                capital: e.capital ? e.capital[0] : "No tiene capital",
                subregion: e.subregion,
                area: e.area,
                population: e.population,
            }
        })
        await Country.bulkCreate(dataCountries); // Lleno la base de datos con BulkCreate
}


///// RUTA PARA TRAER TODOS LOS PAISES O POR NAME(QUERY) //////
router.get('/', async (req, res) => {
    const { name } = req.query // guardo el name que se pasa por query
    try {
        const consulta = await Country.count(); // Me fijo si hay datos en el modelo de la db
        if (consulta === 0) { // Si no hay nada en mi base de datos espero a la funcion getCountry()
            await getCountry(); 
        }
        
        if(!name){ // Si NO hay name en query 
    const allCountries = await Country.findAll({ // Busco todos los paiases que incluyan actividad
        include: [{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {attributes:[]}
        }]})
        res.status(200).send(allCountries) // Devuelvo todos los paises
        
    }else { // Si hay name por queru
        const country = await Country.findAll({ // Busco el pais en la db
            where: { // Donde tenga el name pasado por query
                name: {[Op.iLike]: `%${name}%`}, //Deja que en query se pase mayuscula o minuscula y sea substring
            },
            include: [{ // y que inluya la activadad
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
        })  
        if(country) { // Si hay uno o mas paises lo devuelvo
            res.status(200).json(country);
        } else {
            res.status(404).send("País no encontrado")
        }
    }
    } 
    catch(erorr) {
        res.status(404).send("{País no encontrado}")
    }
})


///// RUTA PARA TRAER UN PAIS POR ID(PARAMS) //////
router.get('/:id', async (req, res) => {
    const id = req.params.id // Guardo en una constante el id que le paso por params
    try {
        const countryDetail = await Country.findOne({ // Busco en la db un pais en especifico y guardo en variable
            where: { // donde el pais que busque sea el pasado por params
                id: {[Op.iLike]: id}, // Permite que la id en params sea en miniscula y mayusucla
            },
            include: [{ // y que incluya el modelo actividades
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }]
        })
        if(countryDetail) { // Si hay el pais pedido por params
            res.status(200).send(countryDetail) // retorno el pais pedido
        } else { // Si no hay pais pedido
            res.status(404).send("ID no encontrado") // retorno error 
        }
    } catch(error) {
        res.status(404).send("ID no encontrado")
    }
    })
    
    module.exports = router;