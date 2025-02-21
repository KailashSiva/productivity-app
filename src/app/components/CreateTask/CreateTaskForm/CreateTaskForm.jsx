import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const priorities = [
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
];

// Could implement an eisenhower matrix - important, not important
// urgent, non-urgent. 

export default function CreateTaskForm({ setTasks, closeModal }) {
    const { handleSubmit, control, register, formState: { errors, isSubmitting } } = useForm()
    const [serverError, setServerError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        closeModal()

        try {
            const response = await fetch('/api/tasks/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...data, priority: data.priority.value })
            })

            const result = await response.json()
            console.log('result', result)

            if (response.ok) {
                setTasks(prev => {
                    const updatedTasks = [...prev, {
                        dueDate: data.dateInput, task: data.description, dateCreated: Date.now(), completed: false,
                        priority: data.priority.value, _id: result._id
                    }];
                    console.log("Updated tasks:", updatedTasks);
                    return updatedTasks;
                })
                console.log('setting tasks')

            } else {
                setServerError(result.error)
            }
            /* if (result.sucess) {
                console.log('succesful registration')
            } else {
                console.log('failed registration')
            }
            console.log(result) */
        } catch (e) {
            console.log(e, 'task creation error')
        } finally {
            setLoading(false)
        }
    }


    const onError = (errors) => {
        console.log('error in form', errors)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <div>
                    <label htmlFor='priority'>Task Priority</label>
                </div>
                <Controller
                    name="priority"
                    id='priority'
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field} // Spread the field object to make onChange, value, and other props work
                            options={priorities}
                            isSearchable={false}
                            placeholder='Select Task Priority'
                            onChange={(selectedOption) => field.onChange(selectedOption)} // Correctly call field.onChange
                            value={priorities.find((priority) => priority.value === field.value)} // Use field.value to match the selected option
                        />
                    )}
                    rules={{ required: 'Please select a priority' }}

                />
                {errors?.priority && <div>{errors.priority.message}</div>}

            </div>
            <div>
                <div>
                    <label htmlFor='dateInput'>Due Date</label>
                </div>
                <Controller
                    control={control}
                    name='dateInput'
                    id='dateInput'
                    render={({ field }) => (
                        <DatePicker
                            style={{ zIndex: '999', position: 'absolute' }}
                            placeholderText='Select Due Date'
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                        />
                    )}
                    rules={{ required: 'Please select a due date' }}
                />
                {errors?.dateInput && <div>{errors.dateInput.message}</div>}
            </div>
            <div>
                <div>
                    <label htmlFor='description'>Task Description</label>
                </div>
                <input
                    type='text'
                    id='description'
                    {...register('description', { required: 'Description is required' })} />
                {errors?.description && <div>{errors.description.message}</div>}
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form >
    )
}





// const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
//     const onSubmit = async (data) => {

// <div>
// <form onSubmit={handleSubmit(onSubmit, onError)}>
//     <div>