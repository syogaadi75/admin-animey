import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveMenu } from '../../redux/features/sidebarSlice'
import './sidebar.css'
import { useNavigate } from 'react-router-dom'

function Menu({ Icon, title, active, hamburger, path }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const menuVariants = {
        open: {
            opacity: 1,
            x: 0,
        },
        closed: {
            opacity: 0,
            x: '-100%',
        },
    }

    const changeMenu = (title, path) => {
        navigate(path)
    }

    return (
        <div className={`menu group ${active && 'active'} `} onClick={() => changeMenu(title, path)}>
            <div className={`menu-icon ${active && 'active'}`}>
                <Icon className='w-5' strokeWidth={2} />
            </div>
            <div animate={!hamburger ? 'open' : 'closed'} variants={menuVariants} className={`${hamburger ? 'menu-title-mini' : 'menu-title'} ${active && 'active'}`}>{title}</div>
        </div>
    )
}

export default Menu