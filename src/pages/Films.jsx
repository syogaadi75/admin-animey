import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveMenu } from '../redux/features/sidebarSlice'
import axios from 'axios'
import Select from 'react-select'
import { XMarkIcon } from '@heroicons/react/24/outline'

function Films() {
    const dispatch = useDispatch()
    const token = useSelector(state => state.user.token)
    const headers = {
        'x-access-token': token
    };
    const [category, setCategory] = useState([])
    const [categoryEdit, setCategoryEdit] = useState([])
    const [filmsData, setFilmsData] = useState(null)
    const apiUrl = useSelector(state => state.api.apiUrl)
    const title = useRef()
    const synopsis = useRef()
    const poster = useRef()
    const type = useRef()
    const tamat = useRef()
    const date = useRef()
    const titleEdit = useRef()
    const synopsisEdit = useRef()
    const posterEdit = useRef()
    const typeEdit = useRef()
    const tamatEdit = useRef()
    const dateEdit = useRef()
    const [optionFilms, setOptionFilms] = useState([])
    const [idFilm, setIdFilm] = useState(null)
    const [loading, setLoading] = useState(false)

    const options = [
        { value: 'Action', label: 'Action' },
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Shounen', label: 'Shounen' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Gore', label: 'Gore' },
        { value: 'Supernatural', label: 'Supernatural' },
        { value: 'Slice of Life', label: 'Slice of Life' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Team Sports', label: 'Team Sports' },
        { value: 'Martial Arts', label: 'Martial Arts' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Military', label: 'Military' },
        { value: 'Mythology', label: 'Mythology' },
        { value: 'Seinen', label: 'Seinen' },
        { value: 'Isekai', label: 'Isekai' },
        { value: 'School', label: 'School' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Romantic Subtext', label: 'Romantic Subtext' },
        { value: 'Drama', label: 'Drama' },
    ]

    const optionsEdit = [
        { value: 'Action', label: 'Action' },
        { value: 'Adventure', label: 'Adventure' },
        { value: 'Fantasy', label: 'Fantasy' },
        { value: 'Shounen', label: 'Shounen' },
        { value: 'Comedy', label: 'Comedy' },
        { value: 'Gore', label: 'Gore' },
        { value: 'Supernatural', label: 'Supernatural' },
        { value: 'Slice of Life', label: 'Slice of Life' },
        { value: 'Sports', label: 'Sports' },
        { value: 'Team Sports', label: 'Team Sports' },
        { value: 'Martial Arts', label: 'Martial Arts' },
        { value: 'Horror', label: 'Horror' },
        { value: 'Military', label: 'Military' },
        { value: 'Mythology', label: 'Mythology' },
        { value: 'Seinen', label: 'Seinen' },
        { value: 'Isekai', label: 'Isekai' },
        { value: 'School', label: 'School' },
        { value: 'Romance', label: 'Romance' },
        { value: 'Romantic Subtext', label: 'Romantic Subtext' },
        { value: 'Drama', label: 'Drama' },
    ]

    const getData = async () => {
        setLoading(true)
        const res = await axios.get(apiUrl + '/films')
        setFilmsData(res.data)
        let x = []
        res.data.forEach(element => {
            x.push({
                value: element._id,
                label: element.title
            })
        });

        setOptionFilms(x)
        setLoading(false)
    }

    useEffect(() => {
        dispatch(setActiveMenu({ activeMenu: 'Film' }))

        getData()
    }, [])

    const handleChange = (opt) => {
        var x = []
        opt.forEach(el => {
            x.push(el.value)
        });
        setCategory(x)
    }

    const handleChangeEdit = (opt) => {
        var x = []
        opt.forEach(el => {
            x.push(el.value)
        });
        setCategoryEdit(x)
    }

    const tambah = (e) => {
        e.preventDefault()
        if (!title.current.value) {
            alert('Minimal isi title')
            return false
        }

        const formData = {
            category: category,
            title: title.current.value,
            synopsis: synopsis.current.value,
            poster: poster.current.value,
            tamat: tamat.current.checked,
        }

        if (date.current.value != '') {
            formData.date = date.current.value
        }

        if (type.current.value != '') {
            formData.type = type.current.value
        }

        axios.post(apiUrl + '/films', formData, { headers }).then(res => {
            setCategory([])
            title.current.value = ''
            synopsis.current.value = ''
            poster.current.value = ''
            date.current.value = ''
            tamat.current.checked = false
            getData()
        })
    }

    const edit = (e) => {
        e.preventDefault()
        if (!titleEdit.current.value) {
            alert('Minimal isi title')
            return false
        }

        const formData = {
            category: categoryEdit,
            title: titleEdit.current.value,
            synopsis: synopsisEdit.current.value,
            poster: posterEdit.current.value,
            tamat: tamatEdit.current.checked,
        }

        if (dateEdit.current.value != '') {
            formData.date = dateEdit.current.value
        }

        if (typeEdit.current.value != '') {
            formData.type = typeEdit.current.value
        }

        axios.put(apiUrl + '/films/' + idFilm, formData, { headers }).then(res => {
            setCategoryEdit([])
            titleEdit.current.value = ''
            synopsisEdit.current.value = ''
            posterEdit.current.value = ''
            dateEdit.current.value = ''
            tamatEdit.current.checked = false
            getData()
        })
    }

    const cariFilm = (option) => {
        setIdFilm(option.value)
        axios.get(apiUrl + '/films/' + option.value).then(res => {
            titleEdit.current.value = res.data.film.title
            synopsisEdit.current.value = res.data.film.synopsis
            posterEdit.current.value = res.data.film.poster
            dateEdit.current.value = res.data.film.date
            typeEdit.current.value = res.data.film.type
            tamatEdit.current.checked = res.data.film.tamat
            setCategoryEdit(res.data.film.category)
        })
    }

    const deleteFilm = async (id, title) => {
        if (confirm('Delete film ' + title + '?') == true) {
            await axios.delete(apiUrl + '/films/' + id);
            getData()
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 mb-8">
                <div className='w-full card-shadow bg-white p-8'>
                    <div className='mb-4'>Tambah Film</div>
                    <form onSubmit={tambah}>
                        <div className='flex flex-col gap-4'>
                            <input className='w-full p-3 text-primary outline-none border border-primary' ref={title} type="text" placeholder='Title' />
                            <textarea className='w-full p-3 text-primary outline-none border border-primary' ref={synopsis} type="text" placeholder='Synopsis'></textarea>
                            <input className='w-full p-3 text-primary outline-none border border-primary' ref={poster} type="text" placeholder='Link Poster' />
                            <select className='w-full p-3 text-primary outline-none border border-primary' ref={type}>
                                <option value="">Type</option>
                                <option value="episode">Episode</option>
                                <option value="movie">Movie</option>
                            </select>
                            <Select isMulti placeholder="Category" options={options} onChange={handleChange} />
                            <input className='w-full p-3 text-primary outline-none border border-primary' ref={date} type="text" placeholder='Date' />
                            <div className='flex items-center gap-2 mb-4'>
                                <input ref={tamat} type="checkbox" className='w-6 h-6' />
                                <span className='text-primary'>Tamat</span>
                            </div>
                            <button type='submit' className='p-3 bg-primary text-white w-[120px]'>Kirim</button>
                        </div>
                    </form>
                </div>
                <div className='w-full card-shadow bg-white p-8'>
                    <div className='mb-4'>Update Film</div>
                    <form onSubmit={edit}>
                        <div className='flex flex-col gap-4'>
                            {optionFilms.length > 0 ? <Select placeholder="Pilih Film" options={optionFilms} onChange={cariFilm} /> : (
                                <>
                                    Loading...
                                </>
                            )}
                            {idFilm ? (
                                <>
                                    <input className='w-full p-3 text-primary outline-none border border-primary' ref={titleEdit} type="text" placeholder='Title' />
                                    <textarea className='w-full p-3 text-primary outline-none border border-primary' ref={synopsisEdit} type="text" placeholder='Synopsis'></textarea>
                                    <input className='w-full p-3 text-primary outline-none border border-primary' ref={posterEdit} type="text" placeholder='Link Poster' />
                                    <select className='w-full p-3 text-primary outline-none border border-primary' ref={typeEdit}>
                                        <option value="">Type</option>
                                        <option value="episode">Episode</option>
                                        <option value="movie">Movie</option>
                                    </select>
                                    <Select isMulti placeholder="Category" options={optionsEdit} onChange={handleChangeEdit} value={categoryEdit.map(category => ({ value: category, label: category }))} />
                                    <input className='w-full p-3 text-primary outline-none border border-primary' ref={dateEdit} type="text" placeholder='Date' />
                                    <div className='flex items-center gap-2 mb-4'>
                                        <input ref={tamatEdit} type="checkbox" className='w-6 h-6' />
                                        <span className='text-primary'>Tamat</span>
                                    </div>
                                    <button type='submit' className='p-3 bg-primary text-white w-[120px]'>Kirim</button>
                                </>
                            ) : (<div>Pilih Film Terlebih Dahulu</div>)}

                        </div>
                    </form>
                </div>
            </div>

            <div className="w-full card-shadow bg-white p-8 mb-8 overflow-x-scroll">
                <h4 className='mb-3 font-semibold text-dark text-lg'>Daftar Film</h4>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <table className='table'>
                        <thead>
                            <tr>
                                <td align='center'>#</td>
                                <td>Poster</td>
                                <td>Title</td>
                                <td>Category</td>
                            </tr>
                        </thead>
                        <tbody>
                            {filmsData ? filmsData.map((film, i) => (
                                <tr key={i}>
                                    <td>
                                        <button className='p-2 w-10 h-10 bg-red-500 text-white rounded' onClick={() => deleteFilm(film._id, film.title)}>
                                            <XMarkIcon strokeWidth={2} />
                                        </button>
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
        </>
    )
}

export default Films