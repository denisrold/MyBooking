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
            <div className="mt-4 py-4 -mx-8 px-8 bg-gray-100">
                <h1 className="text-2xl">{place.title}</h1>
            </div>
    )
};