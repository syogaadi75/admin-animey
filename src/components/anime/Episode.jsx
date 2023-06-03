import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Select from 'react-select'

function Episode() {
    const bvideoUpdate = useRef()
    const videoUpdate = useRef()
    const dateUpdate = useRef()
    const video = useRef()
    const bvideo = useRef()
    const date = useRef()
    const no = useRef()
    const [number, setNumber] = useState(0)
    const [idFilm, setIdFilm] = useState(0)
    const [idEpisode, setIdEpisode] = useState(0)
    const [options, setOptions] = useState([])
    const [films, setFilms] = useState([])
    const [episodes, setEpisodes] = useState([])
    const [episodesOption, setEpisodesOption] = useState([])
    const apiUrl = 'https://streaming-api.vercel.app'


    useEffect(() => {
        video.current.focus()
        loadAnime()
    }, [])

    const loadAnime = () => {
        axios.get(apiUrl + '/films').then(res => {
            setFilms(res.data)
            let x = []
            res.data.forEach(element => {
                x.push({
                    value: element._id,
                    label: element.title
                })
            });

            setOptions(x)
        })
    }

    const tambah = event => {
        event.preventDefault();
        var data = {
            video: video.current.value,
        }

        if (bvideo.current.value != '') {
            data.bvideo = bvideo.current.value
        }

        if (no.current.value != '') {
            data.no = no.current.value
        }

        if (date.current.value != '') {
            data.date = date.current.value
        }

        axios.post(apiUrl + '/episode/' + idFilm, data).then(() => {
            setNumber(number + 1)
            video.current.value = ''
            video.current.focus()
        })
    }

    const update = event => {
        event.preventDefault();
        var data = {
            video: videoUpdate.current.value,
            date: dateUpdate.current.value
        }

        if (bvideoUpdate.current.value != '') {
            data.bvideo = bvideoUpdate.current.value
        }

        axios.put(apiUrl + '/episode/' + idEpisode, data).then(() => {
            videoUpdate.current.value = ''
        })
    }

    const cariFilm = (option) => {
        setIdFilm(option.value)
        axios.get(apiUrl + '/films/' + option.value).then(res => {
            if (res.data.episodes[0]) {
                setNumber(res.data.episodes[0].no + 1)
            } else {
                setNumber(1)
            }
        })
    }

    const cariFilmUpdate = (option) => {
        axios.get(apiUrl + '/films/' + option.value).then(res => {
            setEpisodes(res.data.episodes)
            let y = []
            res.data.episodes.forEach(element => {
                y.push({
                    value: element._id,
                    label: element.no
                })
            });

            setEpisodesOption(y)
        })
    }

    return (
        <>
            <div className='w-full card-shadow bg-white p-8'>
                <div className='mb-4'>Tambah Episode</div>
                <form onSubmit={tambah}>
                    <div className='flex flex-col gap-4'>
                        {options.length > 0 && <Select placeholder="Pilih Anime" options={options} onChange={cariFilm} />}
                        <input className='w-full p-3 text-primary outline-none border border-primary' ref={video} type="text" placeholder='Link Video' />
                        <input className='w-full p-3 text-primary outline-none border border-primary' ref={bvideo} type="text" placeholder='Link Video Kedua' />
                        <input value={number} onChange={(e) => setNumber(e.target.value)} className='w-full p-3 text-primary outline-none border border-primary' ref={no} type="number" placeholder='Nomor' />
                        <input className='w-full p-3 text-primary outline-none border border-primary' ref={date} type="text" placeholder='Date' />
                        <div className='flex w-full justify-end'>
                            <button type='submit' className='p-3 bg-primary text-white w-[120px]'>Kirim</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className='w-full card-shadow bg-white p-8'>
                <div className='mb-4'>Update Episode</div>
                <form onSubmit={update}>
                    <div className='flex flex-col gap-4'>
                        {options.length > 0 && <Select placeholder="Pilih Anime" options={options} onChange={cariFilmUpdate} />}
                        {episodes.length > 0 && <Select placeholder="Pilih Episode" options={episodesOption} onChange={(selected) => setIdEpisode(selected.value)} />}
                        <input className='w-full p-3 text-primary outline-none border border-primary' ref={videoUpdate} type="text" placeholder='Link Video' />
                        <input className='w-full p-3 text-primary outline-none border border-primary' ref={bvideoUpdate} type="text" placeholder='Link Video Kedua' />
                        <input className='w-full p-3 text-primary outline-none border border-primary' ref={dateUpdate} type="text" placeholder='Date' />
                        <button type='submit' className='p-3 bg-primary text-white w-[120px]'>Kirim</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Episode