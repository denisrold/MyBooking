import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import PlaceImg from "../PlaceImg";
import {differenceInCalendarDays, format} from 'date-fns'

export default function BookingsPage(){
    const [bookings,setBooking] = useState([]);


    useEffect(()=>{
        axios.get('/bookings').then(({data})=>{
            setBooking([...data]);
        })
    },[])
    return (
    <div>
        <AccountNav />
        <div>
        {bookings?.length > 0 && (
            bookings.map((booking,i) => (
                <div key={i} className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="w-48">
                     <PlaceImg place={booking.place} />   
                    </div>
                    <div className="py-3">
                    <h2 className="text-lg">{booking.place.title}</h2>{}
                    <div className="">  
                    Checkin: {format(new Date(booking.checkIn),'yyyy-MM-dd')} | Checkout: {format(new Date(booking.checkout),'yyyy-MM-dd')}
                    </div>
                        Number of nights: {differenceInCalendarDays(new Date(booking.checkout), new Date(booking.checkIn))}<br/>
                        Total Price: ${booking.price}
                    
                    </div>
                </div>
            ))
        )
        }
        </div>
    </div>
    )
    };