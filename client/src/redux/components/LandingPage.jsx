import React from "react";
import { Link } from "react-router-dom";
import styles from "./modules/landing.module.css"

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.container2}>
            <h1 className={styles.title}>Countries</h1>
            <Link to ='/home'>
                <button className={styles.button}>JOIN</button>
            </Link>
            </div>
            <h1 className={styles.info}>🔧 Developed by:  <a href="https://github.com/mateecarlos" target="_blank">Mateo Carlos </a> </h1>
        </div>
    )
}