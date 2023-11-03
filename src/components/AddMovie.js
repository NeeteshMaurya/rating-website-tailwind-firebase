import { useState,useContext } from "react"
import { ThreeDots } from "react-loader-spinner"
import { addDoc } from "firebase/firestore"
import { moviesRef } from "../firebase/firebase"
import swal from "sweetalert"
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";


const AddMovie = () => {
    const useAppstate = useContext(Appstate)
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false)
    const [form, setForm] = useState({
        name:"",
        year:'',
        image:'',
        description:'',
        rating: 0,
        rated: 0
    })
    console.log(form)


    const addMovie = async()=>{     
        setLoader(true)
        try{
            if(useAppstate.loggedin) {
                await addDoc(moviesRef,form)
                swal({
                    title:'Movie successfully added',
                    timer: 5000,
                    icon:'success',
                    buttons:true
                })
            }else{
                navigate('/login')
            }
        }catch(err){
            swal({
                title:err,
                timer: 8000,
                icon:'error'
            })
        }
        setForm({
            name:"",
            year:'',
            image:'',
            description:''
        })
        setLoader(false)
    }
    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-14 mx-auto">
                <div className="flex flex-col text-center w-full mb-4">
                    <h1 className="sm:text-3xl 
                    text-2xl font-medium title-font mb-4 text-white">Add Movie</h1>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label for="name" className="leading-7 text-sm text-white">Title</label>
                                <input value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})}
                                 type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-1/2">
                            <div className="relative">
                                <label for="email" className="leading-7 text-sm text-white">Release Year</label>
                                <input value={form.year} onChange={(e)=>setForm({...form, year:e.target.value})}
                                 name="year" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="poster" className="leading-7 text-sm text-white">Poster Link</label>
                                <input value={form.image} onChange={(e)=>setForm({...form, image:e.target.value})}
                                 name="poster" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-10 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"/>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label for="poster" className="leading-7 text-sm text-white">Description</label>
                                <textarea value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})}
                                 name="description" type="text" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button onClick={addMovie} className="flex mx-auto text-white bg-green-500
                             border-0 py-2 px-8 focus:outline-none hover:bg-green-600 
                             rounded text-lg">{loader? <ThreeDots height={25} color="white" />:'Submit'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AddMovie