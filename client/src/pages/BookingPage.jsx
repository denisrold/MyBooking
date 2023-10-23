import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    if(!booking){return <div className=" flex text-2xl font-bold h-screen items-center justify-center mb-96">Loading</div>}
return (<div>Esta es una single booking: {id}</div>)
};