import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { Bars } from 'react-loader-spinner';
import Reviews from './Reviews';
import axios from 'axios';


const Detail = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    useEffect(() => {
        async function getData() {
            setLoading(true);
            axios.get(`https://imdb.up.railway.app/api/movie/${id}/`)
                .then(res => {
                    const mydata = res.data;

                    setData(mydata)
                })

            setLoading(false);
        }
        getData();
    }, [])

    return (
        <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center'>
            {
                loading ? <div className='h-96 flex w-full justify-center items-center'><Bars height={50} color="white" /> </div> :
                    <>
                        <img className='h-96 block md:sticky top-24' src={data.imageurl} alt="bla bla" />

                        <div className='md:ml-4 ml-0 w-full md:w-1/2'>
                            <h1 className='text-3xl font-bold text-gray-400'>{data.name} <span className='text-xl'> ({data.year}) </span></h1>
                            <ReactStars
                                size={20}
                                half={true}
                                value={data.avg_rating}
                                edit={false}
                            />
                            <span id='rating'><h3>{data.avg_rating}/5  ({data.number_rating})</h3></span>
                            <p className='mt-2'>{data.storyline}</p>
  
                            <Reviews id={id} prevRating={data.rating} userRated={data.rated}></Reviews>
                        </div>
                    </>
            }
        </div>
    )
}

export default Detail