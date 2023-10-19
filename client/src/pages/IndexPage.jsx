import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
 const [places,setPlaces]= useState([]);
  useEffect(()=>{
    axios.get('/places').then(({data})=>{
      setPlaces([...data]);
    })
  },[])
  return (
    <div className=" mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
     {places.length > 0 && places.map(place=>(
      <Link to={`/place/${place._id}`}>
        <div className="bg-gray-500 rounded-2xl flex mb-2">
          {place.photos?.[0] && (
          <img src={"http://127.0.0.1:4000/uploads/"+ place.photos[0]}
          className=" rounded-2xl aspect-square object-cover"/>
          )}
        </div>
        <h2 className="font-bold">{place.address}</h2>
        <h3 className="text-sm truncate text-gray-500">{place.title}</h3>
        <div className="mt-1">
          <span className="font-semibold">${place.price}</span> night
        </div>
      </Link>
     ))}
    </div>
  );
}
