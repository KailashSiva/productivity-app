'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function RegisterForm() {
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
    const onSubmit = async (data) => {
        console.log('submitting')
        setServerError(null)
        try {
            console.log(data)
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            console.log('result', result)

            if (result.ok) {
                // redirect
                // create session for user
                router.push('account/dashboard')

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
            console.log(e, 'registration error')
        }
    }


    const onError = (errors) => {
        console.log('error in form', errors)
    }


    const [serverError, setServerError] = useState(null)

    const router = useRouter()

    return (

        <div>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type='text'
                        id='firstName'
                        {...register('firstName', { required: 'First Name is required' })} />
                    {errors?.firstName && <div>{errors.firstName.message}</div>}
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type='text'
                        id='lastName'
                        {...register('lastName', { required: 'Last name is required' })} />
                    {errors?.lastName && <div>{errors.lastName.message}</div>}
                </div>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email format'
                            }
                        })} />
                    {errors?.email && <div>{errors.email.message}</div>}
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        id='password'
                        type='password'
                        {...register('password', {
                            minLength: {
                                value: 8,
                                message: 'password must be at least 8 characters'
                            },
                            required: 'Password is required'

                        })} />
                    {errors?.password && <div>{errors.password.message}</div>}
                </div>
                {serverError && <p style={{ color: 'red' }}>{serverError}</p>}

                <button type='submit' disabled={isSubmitting}>
                    {isSubmitting ? 'Registering' : 'Register'}
                </button>

            </form>
        </div>

    )
}
