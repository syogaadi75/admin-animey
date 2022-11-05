import React from 'react'
import { useSelector } from 'react-redux'
import Hamburger from '../navbar/Hamburger'
import './sidebar.css'

function Logo({ hamburger }) {

    return (
        <div className='mb-4'>
            <div className='flex px-2 py-4 mx-2 lg:w-[200px] justify-between lg:justify-start'>
                <h4 className='logo-text'>
                    My
                    <div className={`${hamburger ? 'lg:hidden' : ''}`}>- Admin</div>
                </h4>
                <div className='lg:hidden'>
                    <Hamburger />
                </div>
            </div>
        </div>
    )
}

export default Logo