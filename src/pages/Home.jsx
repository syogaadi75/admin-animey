import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMenu } from '../redux/features/sidebarSlice'
import axios from 'axios'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Home() {
    const dispatch = useDispatch()
    const apiUrl = useSelector(state => state.api.apiUrl)
    const [loading, setLoading] = useState(false)
    const [filmsData, setFilmsData] = useState(null)

    useEffect(() => {
        dispatch(setActiveMenu({ activeMenu: 'Home' }))
        getData();
    }, [])

    const getData = async () => {
        setLoading(true)
        const res = await axios.get(apiUrl + '/films')
        setFilmsData(res.data)
        setLoading(false)
    }

    return (
        <div className="w-full card-shadow bg-white p-8 mb-8 overflow-x-scroll">
            <h4 className='mb-3 font-semibold text-dark text-lg'>Daftar Film</h4>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <td align='center'>No</td>
                            <td>Poster</td>
                            <td>Title</td>
                            <td>Category</td>
                        </tr>
                    </thead>
                    <tbody>
                        {filmsData ? filmsData.map((film, i) => (
                            <tr key={i}>
                                <td>
                                    {i + 1}
                                </td>
                                <td>
                                    <img className='w-24' src={film.poster} alt="Poster" />
                                </td>
                                <td>{film.title}</td>
                                <td className='flex flex-wrap gap-2'>
                                    {film.category.map((categoryItem, j) => (
                                        <span key={i + ' ' + j} className='p-2 rounded text-sm bg-[#FACC15]'>{categoryItem}</span>
                                    ))}
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan={3}>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home