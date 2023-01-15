import React from "react";

import styles from "./modules/card.module.css"

export default function Card ({ name, flag, continents}) {
    return (
        <div className={styles.container}>
            <img className={styles.img} src={flag} alt='notFound' width='250px' height='150px'/>
            <div className={styles.info}>
                <h4 className={styles.name}>{name}</h4>
                <h5 className={styles.continent}>{continents}</h5>
            </div>
        </div>
    )
}