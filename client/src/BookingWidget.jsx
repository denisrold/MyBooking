import { useState } from "react";
import {differenceInCalendarDays} from "date-fns";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkout,setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests]= useState(1);

    let numberOfNight = 0;

    if(checkIn && checkout){
        numberOfNight = differenceInCalendarDays(new Date(checkout), new Date(checkIn));
    }

    return(
        <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
            Price:${place.price} / per night 
        </div>
        <div className="border-2 shadow-lg shadow-gray-200 rounded-2xl my-4">
            <div className="flex ">
                <div className=" border-gray-200 py-2 px-4">
                    <label>Check in: </label>
                    <input type='date' value={checkIn} onChange={(e)=>{setCheckIn(e.target.value)}}/>
                </div>
                
                <div className="mb-2 border-gray-200 py-2 px-4 border-l-2">
                    <label>Check out: </label>
                    <input type='date' value={checkout} onChange={(e)=>{setCheckOut(e.target.value)}}/>
                </div>
            </div>
            <div className="mb-2 border-gray-200 pt-2 px-4 border-t-2">
                    <label>Number of guest: </label>
                    <input type='number' value={numberOfGuests} onChange={(e)=>{setNumberOfGuests(e.target.value)}} className="outline-none border-2 shadow-md" />
            </div>
        </div>
        <button className="primary" value={1}>Book this place
        {numberOfNight > 0 && (
            <span className="ml-1">
                ${numberOfNight * place.price}
            </span>)}
        </button>

    </div>
    )
}