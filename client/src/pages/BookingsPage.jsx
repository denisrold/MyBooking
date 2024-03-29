import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage(){
    const [bookings,setBooking] = useState([]);
  

    useEffect(()=>{
        // comment because no coookies. 
        axios.get('/bookings').then(({data})=>{
            setBooking([...data]);     
        })

    },[])

    if(!bookings.length){
        return (
            
                <div className=" flex text-2xl font-bold h-screen items-center justify-center pb-48">
                         No Bookings were recorder.
                </div>
    )}

    return (
    <div>
        <AccountNav />
        <div className="lg:w-2/3 lg:mx-auto">
        {bookings?.length > 0 && (
            bookings.map((booking,i) => (
                <Link to={`/account/bookings/${booking._id}`} key={i} className="mb-4 md:mb-0 flex gap-4 bg-gray-200 rounded-2xl overflow-hidden">
                    <div className="hidden md:block  w-48">
                     <PlaceImg place={booking.place} className={'object-cover h-full '}/>   
                    </div>
                    <div className="pl-6 md:pl-0 py-3 pr-3 grow">
                    <h2 className="font-semibold">{booking.place.title}</h2>{}
                            <div>
                                <BookingDates booking={booking} className={' text-gray-800 text-sm items-center mt-2 '}/>
                            </div>
                            <div className=" justify-center md:justify-start flex  gap-2 items-center pr-4 mt-3"> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                            </svg>
                            Total Price: 
                            {booking.price}        
                            </div>
                    </div>
                </Link>
            ))
        )
        }
        </div>
    </div>
    )
    };