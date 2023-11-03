import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { Vortex,ThreeCircles,RotatingTriangles,Dna } from 'react-loader-spinner'
import { getDocs } from 'firebase/firestore'
import { moviesRef } from '../firebase/firebase'
import { useNavigate } from 'react-router-dom'


const Cards = () => {
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loader,setLoader]= useState(false)

    async function getData() {
        setLoader(true);
        const _data = await getDocs(moviesRef);
        _data.forEach((doc) => {
          setData((prv) => [...prv,{...(doc.data()), id: doc.id}])
        })
        setLoader(false);
    }
    useEffect(() => {
        getData();
    },[])
    
    
    return (
        <div className='mt-2 flex flex-wrap justify-evenly p-3'>
          {loader? <div className='w-full flex justify-center mt-[220px]'>
                    <Vortex height={120} width={120}/>
                    <Dna height={120} width={320} />
                    <ThreeCircles height={120} width={120} color='white'/>
                    <RotatingTriangles height={120} width={120} colors={['#ffce30','red','white']}/>
                   </div>:
            data.map((e, i) => {
                return (
                //   <Link to={`/detail/${e.id}`}>
                    <div onClick={()=>navigate(`/detail/${e.id}`)} key={i} className='card-shadow 
                    bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black p-2 mt-4
             shadow-black hover:-translate-y-2 rounded-tl-full rounded-md cursor-pointer'>
                        <img className='h-[210px] md:h-[310px] w-[170px] md:w-[240px]'
                            src={e.image} />
                        <h1 className='text-[20px] font-semibold mt-2 w-[170px] md:w-[240px]'>
                            <span className='text-blue-900 mr-1'>Name: </span>{e.name}
                        </h1>
                        <h1 className='flex items-center text-[20px] font-semibold mt-2'>
                            <span className='text-blue-900 mr-1'>Rating: </span>
                            <ReactStars 
                            size={22}
                            half={true}
                            edit={false}
                            value={e.rating/e.rated}
                            />
                        </h1>
                        <h1 className='text-[20px] font-semibold mt-2'>
                            <span className='text-blue-900 mr-1'>Release: </span>{e.year}
                        </h1>
                    </div>
                //   </Link>
                )
            })
          }

        </div>
    )
}

export default Cards
