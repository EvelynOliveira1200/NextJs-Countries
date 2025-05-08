import React from "react";
import styles from "../styles/Loading.module.css";
import Image from "next/image"

export default function Loading() {
    return (
        <div className={styles.loading}>
            <Image src="/images/world.gif" alt="Loading" height={200} width={200}/>
            <p>Carregando países...</p>
        </div>
    );
}
