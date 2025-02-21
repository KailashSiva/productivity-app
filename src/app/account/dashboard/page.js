'use client'
import React, { useState, useEffect } from 'react'
import TaskButton from '../../components/CreateTask/CreateTaskButton/TaskButton'
import TaskModal from '../../components/CreateTask/CreateTaskModal/TaskModal'
import LoadingState from '../../components/LoadingState/LoadingState'

export default function route() {
    const [isLoading, setisLoading] = useState(false)
    const [tasks, setTasks] = useState([])
    const [serverError, setServerError] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    useEffect(() => {
        // make request to api
        setisLoading(true)
        const fetchTasks = async () => {
            try {
                const res = await fetch('/api/tasks')

                if (!res.ok) {
                    console.log('failed to fetch', res)
                    throw new Error('failed to fetch')
                }

                const data = await res.json()
                setTasks(data.tasks)
            } catch (e) {
                console.log('Error fetching tasks', e)
                setServerError(e)
            } finally {
                setisLoading(false)
            }
        }

        fetchTasks()
    }, [])


    if (serverError) {
        return (
            <div>{serverError}</div>
        )
    }

    return (
        <div>
            {isLoading && <LoadingState />}
            <h1>Dashboard</h1>
            <TaskButton openModal={openModal} />
            {tasks.length > 0 && tasks.map((task) => {
                return <div key={task._id}> Task {task.task} </div>
            })}
            <TaskModal setTasks={setTasks} closeModal={closeModal} isOpen={showModal} />
        </div>

    )
}
