import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGalery from "../PlaceGalery";
import BookingDates from "../BookingDates";

export default function BookingPage(){
    const [booking, setBooking] = useState(null);
    const {id} = useParams();
    
    useEffect(()=>{
        if(id){
            axios.get('/bookings').then(res=>{
                    const resultBooking = res.data.find(({_id})=> _id===id);
                    if(resultBooking){
                        setBooking(resultBooking)}
                    }
            )
        }
    },[id])

    if(!booking){
        return (
            <div className=" flex text-2xl font-bold h-screen items-center justify-center pb-48">
                Loading...
            </div>
    )}
return (
    <div className="my-8">
        <h1 className="text-xl font-semibold lg:text-center">{booking.place.title}</h1>
        <div className="flex items-center gap-1 pt-1 lg:justify-center">
    <AddressLink className={'block text-gray-600'}>{booking.place.address}</AddressLink>
        </div>
        <div className="bg-gray-200 m-4 p-6 lg:w-2/3 lg:mx-auto rounded-2xl flex items-center justify-between">
            <div>            
                <h2 className="text-lg  mb-4 font-medium ">Your booking information:</h2>
                <BookingDates booking={booking}/>
            </div>
            <div className="bg-primary p-6 rounded-xl text-white">
                <div>
                    Total Price: 
                </div>
                <div className="text-2xl">
                    ${booking.price}
                </div>
            </div>
        </div>
        <PlaceGalery place={booking.place}/>
    </div>)
};