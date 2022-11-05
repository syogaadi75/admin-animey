import React from 'react'
import { useDispatch } from 'react-redux'
import { setActiveMenu } from '../../redux/features/sidebarSlice'
import './sidebar.css'

function Menu({ Icon, title, active, hamburger }) {
    const dispatch = useDispatch()

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

    return (
        <div className={`menu group ${active && 'active'} `} onClick={() => dispatch(setActiveMenu({ activeMenu: title }))}>
            <div className={`menu-icon ${active && 'active'}`}>
                <Icon className='w-5' strokeWidth={2} />
            </div>
            <div animate={!hamburger ? 'open' : 'closed'} variants={menuVariants} className={`${hamburger ? 'menu-title-mini' : 'menu-title'} ${active && 'active'}`}>{title}</div>
        </div>
    )
}

export default Menu