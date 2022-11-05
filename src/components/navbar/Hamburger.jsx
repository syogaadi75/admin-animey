import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setHamburger, setHamburgerActive } from '../../redux/features/sidebarSlice'
import './navbar.css'

function Hamburger() {
    const dispatch = useDispatch()
    const hamburger = useSelector(state => state.sidebar.hamburger)
    const hamburgerActive = useSelector(state => state.sidebar.hamburgerActive)

    const hamburgerHandle = () => {
        !hamburger ? dispatch(setHamburgerActive({ hamburgerActive: 'hamburger-active' })) : dispatch(setHamburgerActive({ hamburgerActive: '' }))
        dispatch(setHamburger({ hamburger: !hamburger }))
    }

    return (
        <>
            <button className={`block focus:bg-transparent outline-none border-none ${hamburgerActive}`} id="hamburger" name="hamburger" onClick={() => hamburgerHandle()}>
                <span className="hamburger-line transition duration-300 ease-in-out origin-top-left"></span>
                <span className="hamburger-line transition duration-300 ease-in-out"></span>
                <span className="hamburger-line transition duration-300 ease-in-out origin-bottom-left"></span>
            </button>
        </>
    )
}

export default Hamburger