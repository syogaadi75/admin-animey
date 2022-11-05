import React from 'react'
import profileSvg from '../../assets/profile.png'

function UserDetail({ hamburger, navbar }) {
    return (
        <div className={`flex p-2 w-full items-center lg:gap-2 relative overflow-hidden rounded`}>
            {!navbar && (
                <div className={`transition-all ease-linear duration-200 absolute w-1/2 h-full bg-primary/90 -right-[2.6rem] -rotate-[60deg] -z-10 ${hamburger && 'profile-hide'} `}></div>
            )}
            <img className='w-14' src={profileSvg} alt="Profile" />
            <div className={`transition-all ease-linear duration-200 flex flex-col ${hamburger && 'profile-hide'} ${navbar && 'hidden lg:flex'} `}>
                <div className='text-sm lg:text-base font-semibold text-dark truncate'>Yoga Adi Saputra</div>
                <div className='flex items-center gap-2 text-xs'>
                    <div className='text-gray-500 font-semibold'>Admin</div>
                    <div className='flex items-center gap-1 text-gray-500'>
                        <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                        Online
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetail