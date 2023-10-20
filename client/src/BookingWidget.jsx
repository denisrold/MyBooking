import { useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function BookingWidget({place}){
    const [checkIn,setCheckIn] = useState('');
    const [checkout,setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests]= useState(1);
    const [name,setName] = useState('');
    const [mobile,setMobile] = useState('');
    const [redirect, setRedirect] = useState('');
   
    let numberOfNight = 0;

    if(checkIn && checkout){
        numberOfNight = differenceInCalendarDays(new Date(checkout), new Date(checkIn));
    }

    async function bookThisPlace(){ 
        let price = numberOfNight * place.price;
        const response = await axios.post('/booking', {
            checkIn,checkout,numberOfGuests,name,mobile,
            place:place._id, price});
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if(redirect){
        return <Navigate to={redirect} />
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
            {numberOfNight > 0 &&(
                <div className="mb-2 border-gray-200 pt-2 px-4 border-t-2">
                <label>Your full name: </label>
                <input type='text' value={name} onChange={e=>{setName(e.target.value)}} className="outline-none border-2 shadow-md"  placeholder="James Smith"/>
                <label>Phone number: </label>
                <input type='tel' value={mobile} onChange={e=>{setMobile(e.target.value)}} className="outline-none border-2 shadow-md"  placeholder="xxxxx-xxxx-xxxx"/>
            </div>
            )}
        </div>
        <button onClick={bookThisPlace} className="primary" value={1}>Book this place
        {numberOfNight > 0 && (
            <span className="ml-1">
                ${numberOfNight * place.price}
            </span>)}
        </button>

    </div>
    )
}