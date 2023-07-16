import React, { useState } from 'react'
import Hamburger from '../../components/navbar/Hamburger'
import { ArrowRightOnRectangleIcon, BellIcon, EnvelopeIcon, MagnifyingGlassIcon, MinusSmallIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import UserDetail from '../../components/sidebar/UserDetail'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../redux/features/userSlice'
import { useNavigate } from 'react-router-dom'

function Navbar() {
    const apiUrl = useSelector(state => state.api.apiUrl)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await axios.get(apiUrl + '/auth/logout')

            dispatch(removeUser())
            sessionStorage.removeItem('auth')
            sessionStorage.removeItem('token')

            navigate('/login')

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='p-4 h-[70px] w-full flex items-center layout-shadow justify-between'>
            <div className='flex items-center gap-6'>
                <Hamburger />
                <div className='lg:flex items-center relative hidden'>
                    <MagnifyingGlassIcon className='w-5 absolute left-0 text-gray-400' />
                    <motion.input type="text" placeholder='Search' className='py-2 pl-8 pr-2 outline-none border-b-2 border-primary text-gray-400' />
                </div>
            </div>
            <div className='flex items-center gap-3 lg:gap-4'>
                <div className='flex items-center gap-1 cursor-pointer py-2 pl-3 hover:pr-3 text-primary rounded-lg hover:bg-primary hover:text-light transition-all ease-linear duration-200 font-semibold' onClick={() => logout()}>
                    <span className=''>Logout</span>
                    <ArrowRightOnRectangleIcon className='w-6' strokeWidth={2} />
                </div>
                <div className='relative cursor-pointer'>
                    <div className='w-4 h-4 bg-red-500 text-xs text-light flex items-center justify-center rounded-full absolute -right-1 -top-1'>5</div>
                    <BellIcon className='w-6 text-gray-500' strokeWidth={2} />
                </div>
                <div className='relative cursor-pointer'>
                    <div className='w-4 h-4 bg-red-500 text-xs text-light flex items-center justify-center rounded-full absolute -right-1 -top-1'>3</div>
                    <EnvelopeIcon className='w-6 text-gray-500' strokeWidth={2} />
                </div>
                <UserDetail navbar={true} />
            </div>
        </div>
    )
}

export default Navbar