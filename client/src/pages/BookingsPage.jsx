import axios from "axios";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";

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
            bookings.map((booking) => (
                <div>
                    {booking.checkIn} - {booking.checkout}
                </div>
            ))
        )
        }
        </div>
    </div>
    )
    };