import React, { useState } from 'react'
import styles from './TaskButton.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export default function TaskButton({ openModal }) {

    return (
        <button className={styles.newButton} onClick={openModal}>
            <FontAwesomeIcon icon={faPlus} className="icon fa-solid" />
            <p>New task...</p>
        </button>
    )
}
