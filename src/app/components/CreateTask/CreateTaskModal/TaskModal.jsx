import React from 'react'
import { Description, Dialog, DialogPanel, DialogTitle, DialogBackdrop } from '@headlessui/react'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'
import styles from '../CreateTaskModal/TaskModal.module.css'

export default function TaskModal({ setTasks, isOpen, closeModal }) {
    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            className={styles.taskModal}
            transition >
            <DialogBackdrop className={styles.taskModalBackdrop} />

            <DialogPanel className={styles.taskModalPanel}>
                <DialogTitle>Create a New Task</DialogTitle>
                <Description>
                    This is the description. Might be unnecessary
                </Description>
                <CreateTaskForm setTasks={setTasks} closeModal={closeModal} />

                <div className="flex gap-4">
                    <button onClick={closeModal}>Cancel</button>
                </div>

            </DialogPanel>


        </Dialog>
    )
}

// style={{ position: 'fixed', zIndex: 100, inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
// for the div