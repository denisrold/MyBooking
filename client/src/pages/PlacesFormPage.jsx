import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";


export default function PlacesFormPage(){
    const {id} = useParams();
    const [title,setTitle]= useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos, setAddedPhotos]= useState([]);
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuest]= useState(1);
    const [redirect,setRedirect] = useState(false);
    const [price,setPrice]= useState(100);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!id){return};
        axios.get('/places/'+id).then(({data})=>{
            console.log(data);
            setAddress(data.address);
            setTitle(data.title);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckIn(data.checkin);
            setCheckOut(data.checkout);
            setMaxGuest(data.maxGuest);
            setPrice(data.price);
        })
    },[id]);
    
    function inputHeader(text){
        return (<h2 className="text-2xl mt-4">{text}</h2>)
    };
    function inputDescription(text){
    return (
        <p className="text-gray-500 text-sm">{text}</p>
    )
    };
    function preInput(header,description){
        return (
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        )
    }
    function goBackDemo(e){
        return (navigate('/account'));
    }

    async function savePLace(e){
        e.preventDefault();
        //Demo commented
        // const placeData = {address,title,addedPhotos,
        //     description,perks,extraInfo,
        //     checkIn,checkOut,maxGuests,price}
        // if(id){
        //     const {data} = await  axios.put('/places',{
        //         id,
        //         ...placeData,});
        //     setRedirect(true);
        // }
        // else{
        //     const {data} = await  axios.post('/places',placeData);
        //     setRedirect(true);
        // }

        //End of demo
        return (navigate("/"))
    };

    
    if(redirect){
        return (navigate("/account/places"))
    }

    return(
<div>
    <AccountNav/>
    <form onSubmit={savePLace}>
        {preInput('Title','Title for you place, should be short and catchy as in advertisement')}
        <input type='text' value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="My lovely apt"/>
        {preInput('Address','Address to this place.')}
        <input type='text' value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address"/>
        {preInput('Photos','More = better. DISABLED IN DEMO VERSION GO TO GITHUB DOCUMENTATION.')}
       {/* UNCOMMENT FOR REAL VERSION. */}
        {/* <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/> */}
        {preInput('Description','Description of the place')}
        <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>.
        {preInput('Perks','Select all the perks of your place')}
        <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks}/>
        </div>
        {preInput('Extra info','House rules, etc...')}
        <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/> 
        {preInput('Check in & out times, max guest','Add check in and out times, remember to have some time window for cleaning the room between guests')}
        <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4 ">
            <div>
                <h3 className="mt-2 -mb-1">Check in time</h3>
                <input value={checkIn} 
                onChange={ev=>setCheckIn(ev.target.value)} 
                type="number" 
                placeholder="14" />
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Check out time</h3>
                <input value={checkOut} 
                onChange={ev=>setCheckOut(ev.target.value)} 
                type="number" 
                placeholder="12" />
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input value={maxGuests} 
                onChange={ev=>setMaxGuest(ev.target.value)} 
                type="number" 
                placeholder="4" />
            </div>
            <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <div className="flex items-center">    
                <span className="font-semibold">$</span>
                <input value={price} 
                onChange={ev=>setPrice(ev.target.value)} 
                type="number" 
                placeholder="4" />
                </div>
            </div>
        </div>
        <button onClick={()=>{goBackDemo()}} className="primary my-4 cursor-pointer">save - Just a demo.</button>
    </form>

</div>
    )
    
};