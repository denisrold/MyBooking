import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";

export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
useEffect(()=>{
    //no cookies - comment 
    // axios.get('/user-places').then(({data})=>{
    // setPlaces(data);
    // })
},[]);
return(
        <div>
            <AccountNav/>
            <div className="text-center ">
                <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Add new place</Link>
            </div>
            <div className="mt-4 lg:w-2/3 lg:mx-auto">
            {places.length > 0 && places.map(place=>(
                <Link to={'/account/places/' + place._id} className="flex cursor-pointer gap-4 border p-4 rounded-2xl bg-gray-200" key={place._id}>
                    <div className=" bg-gray-300 w-32 h-32 shrink-0">{/*grow shrink-0*/}
                       <PlaceImg place={place } className={' object-cover h-full'}/>
                    </div>
                    <div className="grow-0 shrink">
                    <h2 className="text-xl  font-semibold">{place.title}</h2>
                    <p className="mt-2 text-sm">{place.description}</p>
                    </div>
                </Link>
                ))}
            </div>
        </div>);
};
