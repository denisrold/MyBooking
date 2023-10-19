import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PlacePage(){
    const [place,setPlace] =useState(null);
    const [showAllPhotos,setShowAllPhotos] = useState(false);

    const { id } = useParams();
    useEffect(()=>{
        if(!id)return
        axios.get(`/places/${id}`).then((response)=>{
            setPlace(response.data);
        })
    },[])
    if(!place) return '';

    if(showAllPhotos){
        return(
            <div className="absolute inset-0 bg-white  min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-xl" >Photos of {place.title}</h2>
                        <button className=" fixed flex right-10 top-20 gap-1 px-4 py-2 items-center rounded-2xl shadow shadow-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>

                            Close photos</button>
                    </div>
                <div className="p-8 grid gap-4">
                {place?.photos?.length > 0 && place?.photos?.map(photo=>(
                    <img src={"http://127.0.0.1:4000/uploads/"+photo}></img>
                )) }
                </div>
                </div>
               
            </div>
        )
    }
    return(
            <div className="mt-4 py-8 -mx-8 px-8 bg-gray-100">
                <h1 className="text-2xl">{place.title}</h1>
                <a target="_blank" 
                className="block underline font-semibold my-2" 
                href={'https://maps.google.com/?q='+ place.address}>
                    {place.address}
                </a>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr]">
                        <div>
                            {place.photos?.[0] && (
                                <div >
                                    <img className='aspect-square object-cover' src={"http://127.0.0.1:4000/uploads/"+place.photos[0]}/>
                                </div>
                            )}
                        </div>
                        <div className="grid">
                            {place.photos?.[1] && (
                                <img className='aspect-square object-cover' src={"http://127.0.0.1:4000/uploads/"+place.photos[1]}/>
                        )}
                        <div className="overflow-hidden">
                            {place.photos?.[2] && (
                                <img className='aspect-square object-cover relative top-2' src={"http://127.0.0.1:4000/uploads/"+place.photos[2]}/>
                            )}
                            </div>  
                        </div>
                    </div>
                <button onClick={()=>{setShowAllPhotos(true)}} className=" flex gap-1 items-center absolute bottom-2 right-2 py-2 px-4 rounded-2xl shadow-md shadow-gray-500 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>

                    Show more photos</button>
                </div>
               
            </div>
    )
};