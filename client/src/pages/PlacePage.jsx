import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function PlacePage(){
    const [place,setPlace] =useState(null);
    const { id } = useParams();
    useEffect(()=>{
        if(!id)return
        axios.get(`/places/${id}`).then((response)=>{
            setPlace(response.data);
        })
    },[])
    if(!place) return '';
    return(
            <div className="mt-4 py-8 -mx-8 px-8 bg-gray-100">
                <h1 className="text-2xl">{place.title}</h1>
                <a target="_blank" 
                className="block underline font-semibold my-2" 
                href={'https://maps.google.com/?q='+ place.address}>
                    {place.address}
                </a>
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
            </div>
    )
};