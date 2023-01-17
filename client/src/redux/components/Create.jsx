import {React, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postActivity, getCountries } from "../actions";
import styles from "./modules/create.module.css"


function validate(input) {
    let errors= {}
    let dur = Number(input.duration)

    if(!input.name) errors.name = "Necessary field"
    else if(/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = "Name cannot have special characters"

    if(!input.difficulty) errors.difficulty = "Necessary field"
    else if(dur <= 0 || dur > 24) errors.duration = "The duration should be between 1 and 24"

    if(!input.season || input.season === "") errors.season = "Necessary field"

    if(!input.countries) errors.countries = "Necessary field"

    return errors;
}

export function CreateActivity(){
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries)
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries:[]
    })


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    function handleSelect(e) {
        setInput((estado) => {
            if(e.target.name === "countries") {
                return {
                    ...estado,
                    countries: [...estado.countries, e.target.value]
                }
            } else {
                return {
                    ...estado,
                    [e.target.name] : e.target.value
                }
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countries) {
            return alert("You must complete the form correctly before submitting it.")
        }

        dispatch(postActivity(input))
        alert("Activity created correctly.")
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countries:[]
        })
        history.push("/home")
    }

    function handleDelete(e){
        setInput({
            ...input,
            countries: input.countries.filter(con => con !== e)
        })
    }


    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])


    return(
        <div className={styles.container}>
            <Link to='/home'><button className={styles.buton}>Back</button></Link>
            <div className={styles.contenedor}>
            <h1 className={styles.title}>CREATE YOUR ACTIVITY!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.name}>
                    <label className={styles.nombre}>NAME: </label>
                    <input
                    className={styles.input}
                    type="text"
                    placeholder="Name..."
                    value={input.name}
                    name="name"
                    onChange={(e) => handleSelect(e)}
                    />
                    {errors.name && (<p className={styles.error1}>{errors.name}</p>)}
                </div>
                <div className={styles.difficulty}>
                    <label className={styles.dificultad}>DIFFICULTY (1 - 5): </label>
                    <input className={styles.input2}
                    type="range" name="difficulty" min="1" max="5" value={input.difficulty} onChange={(e) => handleChange(e)}
                    />
                    {errors.difficulty && (<p className={styles.error2}>{errors.difficulty}</p>)}
                </div>
                <div className={styles.duration}>
                    <label className={styles.duracion}>DURATION IN HOURS: </label>
                    <input className={styles.input3}
                    type="number" placeholder="Duration of the activity..." name="duration" value={input.duration} onChange={(e) => handleChange(e)}
                    />
                    {errors.duration && (<p className={styles.error3}>{errors.duration}</p>)}
                </div>
                <div className={styles.season}>
                    <label className={styles.estacion}>SEASON: </label>
                    <select className={styles.input4}
                    name='season' 
                    value={input.season}
                    id="season"
                    onChange={(e) => handleSelect(e)} >
                        <option value="" selected disabled>Season</option>
                        <option>Summer🌞</option>
                        <option>Autumn🍂</option>
                        <option>Winter❄️</option>
                        <option>Spring🌱</option>
                    </select>
                    {errors.season && (<p className={styles.error4}>{errors.season}</p>)}
                </div>
                <div className={styles.countries}>
                    <label className={styles.paises}>COUNTRIES: </label>
                    <select className={styles.input5} name="countries" id="countries" onChange={(e) => handleSelect(e)}>
                        <option selected="false" disabled>Select the country</option>
                        {
                            countries.map((e) => (
                                <option key={e.key}value={e.id}>{e.name}</option>
                                ))
                            }
                    </select>
                    {errors.countries && (<p className={styles.error5}>{errors.countries}</p>)}
                </div>
                <div>
                    <button className={styles.buton2} type="submit">CREATE!</button>
                </div>
            </form>
            <div className={styles.contenedorr}>
            {input.countries.map(e =>
                <div className={styles.agregados}>
                    <button className={styles.eliminar} onClick={()=> handleDelete}>X</button>
                    <p className={styles.code}>{e}</p>
                </div>)}
            </div>
            </div>
        </div>
    )
}


