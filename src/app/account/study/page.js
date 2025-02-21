'use client'
import React, { useState, useEffect } from 'react'
import LoadingState from '../../components/LoadingState/LoadingState'
import PomodoroTimer from '../../components/PomodoroTimer/PomodoroTimer'


export default function route() {
    const [isLoading, setisLoading] = useState(false)
    const [serverError, setServerError] = useState(false)

    return (
        <div>
            <PomodoroTimer />
        </div>

    )
}
