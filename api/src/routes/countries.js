const { Router } = require('express');
const axios = require('axios');
const router = Router();
const {Country , Activity} = require('../db')

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

router.get('/', async (req, res) => {
    const { name } = req.query
    // Me fijo si hay datos en el modelo de la db
    const consulta = await Country.count();
    if (consulta === 0) {
        await getCountry();
    }
    // Busco y traigo los paises que incluyan una actividad
    const allCountries = await Country.findAll({ include: Activity });

    // Paso el nombre todo a miniscula para no tener errores
    if(name) {
        const countryName = await allCountries.filter((e) => {
            e.name.toLowerCase().includes(name.toLowerCase())
        })

        if(name.length) {
            let name2 = await countryName.map((e) => e.name);
            let pais = await Country.findAll({
                where: { name: name2 },
                include: Activity,
            })
            console.log(pais)
            res.status(200).send(pais);
        } else {
            res.status(404).send("Este pais no existe")
        }
    } else {
        res.status(200).send(allCountries);
    }
})







module.exports = router;