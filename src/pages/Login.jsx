import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {
    const apiUrl = useSelector(state => state.api.apiUrl)
    const userData = useSelector(state => state.user.user)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const onSubmit = async data => {
        setLoading(true)
        try {
            const user = await axios.post(apiUrl + '/auth/login', {
                email: data.email,
                password: data.password,
            })

            if (user.data.message) {
                alert(user.data.message)
                setLoading(false)
                return false;
            }

            sessionStorage.setItem('auth', user.data.auth)
            sessionStorage.setItem('token', user.data.token)

            navigate('/');

        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        const email = document.getElementsByName('email')
        email[0].focus()
    }, [])

    useEffect(() => {
        if (userData) {
            navigate('/');
        }
    }, [userData])



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[9999999] bg-white flex justify-center items-center flex-col">
                <div className='text-left w-[250px] text-sm mb-4 text-gray-500 '>
                    Silahkan login untuk melanjutkan kedalam aplikasi
                </div>
                <div className='flex flex-col gap-5 mb-5'>
                    <div className='flex flex-col gap-1'>
                        <input {...register("email", {
                            required: 'This field is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Entered value does not match email format"
                            }
                        })} className='input-login' type="email" name='email' placeholder='E-Mail' />
                        <span className='text-xs text-red-400'>{errors.email?.message}</span>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <input {...register("password", { required: 'This field is required' })} name='password' className='input-login' type="password" placeholder='Password' />
                        <span className='text-xs text-red-400'>{errors.password?.message}</span>
                    </div>
                </div>
                {loading ? (
                    'Loading....'
                ) : (
                    <button type='submit' className='p-2 bg-primary text-white w-[250px]'>Login</button>
                )}
            </div>
        </form>
    )
}

export default Login