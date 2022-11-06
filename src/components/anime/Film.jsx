import axios from 'axios'
import React, { useState } from 'react'
import { useRef } from 'react'
import Select from 'react-select'

function Film() {
    const apiUrl = 'https://streaming-api.vercel.app'
    const title = useRef()
    const synopsis = useRef()
    const poster = useRef()
    const type = useRef()
    const [category, setCategory] = useState([])
    const tamat = useRef()
    const date = useRef()

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

    const handleChange = (opt) => {
        var x = []
        opt.forEach(el => {
            x.push(el.value)
        });
        setCategory(x)
    }

    const tambah = (e) => {
        e.preventDefault()
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

        axios.post(apiUrl + '/films', formData).then(res => {
            setCategory([])
            title.current.value = ''
            synopsis.current.value = ''
            poster.current.value = ''
            date.current.value = ''
            tamat.current.checked = false
        })
    }
    return (
        <>
            <div className='w-full card-shadow bg-white p-8'>
                <div className='mb-4'>Tambah Anime</div>
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
        </>
    )
}

export default Film