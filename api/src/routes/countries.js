const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Op, Country , Activity} = require('../db')

///// FUNCION PARA TRAER DATOS DE LA API A LA BASE DE DATOS //////
const getCountry = async () => {
    const countriesApi = await axios.get("https://restcountries.com/v3/all");
    const dataCountries = await countriesApi.data.map((e) => {
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
    await Country.bulkCreate(dataCountries);
    // console.log("Se lleno la base de datos")
}

///// RUTA PARA TRAER TODOS LOS PAISES O POR NAME(QUERY) //////
router.get('/', async (req, res) => {
    const { name } = req.query
    // Me fijo si hay datos en el modelo de la db
    const consulta = await Country.count();
    if (consulta === 0) {
        await getCountry();
    }
    // Busco y traigo los paises que incluyan una actividad
    if(!name){
    const allCountries = await Country.findAll({ 
        include: [{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {attributes:[]}
        }]})
        res.status(200).send(allCountries)
    }else {
        const country = await Country.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`},
            },
            include: [{ 
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
        })  
        if(country) {
            res.status(200).json(country);
        } else {
            res.status(404).send("País no encontrado")
        }
    }
})


///// RUTA PARA TRAER UN PAIS POR ID(PARAMS) //////
router.get('/:id', async (req, res) => {
    const id = req.params.id

    const countryDetail = await Country.findOne({
        where: {
            id: {[Op.iLike]: id},
        },
        include: [{
            model: Activity,
            attributes: [ 'name', 'difficulty', 'duration', 'season',],
            through: { attributes: [] }
        }]
    })
    if(countryDetail) {
        res.status(200).send(countryDetail)
    } else {
        res.status(404).send("ID no encontrado")
    }
})

module.exports = router;