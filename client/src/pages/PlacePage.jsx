import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";
import PlaceGalery from "../PlaceGalery";
import AddressLink from "../AddressLink";

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
                <div className="flex gap-1 items-center mb-2">
                <AddressLink>{place.address}</AddressLink>
                </div>
                <PlaceGalery place={place} />
                <div className=" my-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                    <div>
                        <div className="my-4">
                        <h2 className="font-semibold text-2xl">Description</h2>    
                        {place.description}
                    </div>
                        Check-In: {place.checkin}<br/>
                        Check-Out: {place.checkout}<br/>
                        Max-Guest: {place.maxGuest}<br/>
                    
                    </div>
                    <div>
                        <BookingWidget place={place}/>
                    </div>
                </div>
                <div className="bg-white -mx-8 px-8 pt-8 pb-1 my-4 border-t-2">
                    <h2 className="font-semibold text-2xl">Extrainfo: </h2>   
                    <div className="text-sm text-gray-800  mt-1 mb-4 leading-5" >{place.extraInfo}</div>
                </div>
                </div>
        
    )
};