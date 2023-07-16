import React, { useEffect, useState } from 'react'
import Menu from '../../components/sidebar/Menu'
import { Cog6ToothIcon, DocumentDuplicateIcon, FilmIcon, FolderIcon, HomeIcon, UserCircleIcon, VideoCameraIcon } from '@heroicons/react/24/outline'
import { UsersIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import UserDetail from '../../components/sidebar/UserDetail'
import Logo from '../../components/sidebar/Logo'

function Sidebar() {
    const active = useSelector(state => state.sidebar.active)
    const hamburger = useSelector(state => state.sidebar.hamburger)

    const sidebarMenus = [
        {
            icon: HomeIcon,
            title: 'Home',
            path: '/',
        },
        {
            icon: DocumentDuplicateIcon,
            title: 'Film',
            path: '/film'
        },
        {
            icon: VideoCameraIcon,
            title: 'Episode',
            path: '/episode'
        }
    ]

    return (
        <div className='relative'>
            <div className={`z-10 lg:z-0 h-screen layout-shadow transition-all ease-linear duration-200 ${hamburger ? 'mini-sidebar' : 'sidebar'}`}>
                <Logo hamburger={hamburger} />
                <div className='mb-6'>
                    <UserDetail hamburger={hamburger} />
                </div>
                {sidebarMenus.map(menu => (
                    <Menu hamburger={hamburger} key={menu.title} path={menu.path} Icon={menu.icon} title={menu.title} active={menu.title === active ? true : false} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar