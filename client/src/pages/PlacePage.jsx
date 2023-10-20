import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import BookingWidget from "../BookingWidget";

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

            <div className="absolute  inset-0  min-h-screen">
                <div className="p-8 grid gap-4  bg-black text-white">
                    <div className="">
                        <h2 className="text-xl text-center" >Photos of {place.title}</h2>
                        <button 
                        onClick={()=>{setShowAllPhotos(false)}}
                        className="font-semibold fixed flex text-black bg-white top-20 gap-2 pr-5 pl-3 py-2 items-center rounded-2xl shadow-md shadow-gray-900"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                        </svg>

                            Back</button>
                    </div>
                <div className="p-8 grid gap-4 justify-center">
                {place?.photos?.length > 0 && place?.photos?.map(photo=>(
                    <img style={{'height':'500px'}} className=" rounded-md" src={"http://127.0.0.1:4000/uploads/"+photo}></img>
                )) }
                </div>
                </div>
               
            </div>
          
        )
    }
    return(
            <div className="mt-4 py-8 -mx-8 px-8 bg-gray-100">
                <h1 className="text-2xl">{place.title}</h1>
                
                <div className="flex gap-1 items-center mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>

                <a target="_blank" 
                className="block underline font-semibold my-2" 
                href={'https://maps.google.com/?q='+ place.address}>
                    {place.address}
                </a>
                </div>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
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