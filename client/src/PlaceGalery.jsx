import { useState } from "react";

export default function PlaceGalery({place}){
    const [showAllPhotos,setShowAllPhotos] = useState(false);
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
                {place?.photos?.length > 0 && place?.photos?.map((photo,i)=>(
                    <img key={i} style={{'height':'40vh'}} className=" rounded-md" src={import.meta.env.VITE_AXIOS_DEFAULT_BACKEND_PHOTO_LINK+photo}></img>
                )) }
                </div>
                </div>
               
            </div>
          
        )
    }
    return (
    <div className="relative">
            <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-[1fr,0.49fr] lg:m-auto lg:w-fit  lg:gap-2 lg:mb-10 rounded-3xl overflow-hidden">
                <div>
                    {place.photos?.[0] && (
                        <div >
                            <img className='aspect-square object-cover' src={import.meta.env.VITE_AXIOS_DEFAULT_BACKEND_PHOTO_LINK+place.photos[0]}/>
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] && (
                        <img className='aspect-square object-cover' src={import.meta.env.VITE_AXIOS_DEFAULT_BACKEND_PHOTO_LINK+place.photos[1]}/>
                )}
                <div className="overflow-hidden">
                    {place.photos?.[2] && (
                        <img className='aspect-square object-cover relative top-2' src={import.meta.env.VITE_AXIOS_DEFAULT_BACKEND_PHOTO_LINK+place.photos[2]}/>
                    )}
                    </div>  
                </div>
            </div>
        <button onClick={()=>{setShowAllPhotos(true)}} className=" flex gap-1 items-center absolute bottom-2 right-2 lg:w-64  lg:left-2/3 lg:right-2/3/4 py-2 px-4 rounded-2xl shadow-md shadow-gray-500 bg-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
        </svg>

        Show more photos</button>
    </div>
)
};