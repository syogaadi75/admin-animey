import React, { useEffect, useRef, useState } from 'react'
import Episode from '../components/anime/Episode'
import Film from '../components/anime/Film'

function Anime() {

    return (
        <>
            <div className='flex flex-col lg:flex-row gap-6 mb-8'>
                <Episode />
            </div>
            <div className='flex flex-col lg:flex-row gap-6'>
                <Film />
            </div>
        </>
    )
}

export default Anime