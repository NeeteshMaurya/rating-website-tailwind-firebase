import React, { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { doc,getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebase'
import { RotatingTriangles } from 'react-loader-spinner'
import ReactStars from 'react-stars'
import Reviews from './Reviews'


const Detail = () => {
    const {id} =  useParams()

    const [data, setData] = useState({
        name:'',
        image:'',
        year: '',
        description: '',
        rating: 0,
        rated: 0
    })
    const [loader,setLoader]= useState(false)

    async function getData() {
        setLoader(true);
        const _doc = doc(db,'movies',id)  //doc(database exported from firebase.js, 'collection name',  id)
        const _data = await getDoc(_doc);
        setData(_data.data())
        setLoader(false);
    }
    useEffect(() => {
        getData();
    },[])


  return (
    <div className='mt-16 w-full flex flex-wrap justify-evenly  md:justify-center'>
        {loader ? <div className='w-full flex justify-center mt-[220px]'>
                <RotatingTriangles height={120} width={120} colors={['#ffce30','red','white']}/>
            </div>:
        <>
            <img className='h-[500px] w-[300px] md:sticky top-[148px] rounded-md card-shadow'
            src={data.image} />
            <div className='md:w-1/2 ml-10 mt-5 mr-10'>
                <div className='font-bold text-[45px] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-green-500'>{data.name}
                <span className='font-bold text-2xl'>({data.year})</span></div>
                <ReactStars 
                    size={38}
                    half={true}
                    edit={false}
                    value={data.rating/data.rated}
                />
                <p className='text-xl font-semibold mt-5'>
                {data.description}
                </p>
                <Reviews id={id} prevRating={data.rating} userRated={data.rated} />
            </div>
        </>
        }
    </div>
  )
}

export default Detail