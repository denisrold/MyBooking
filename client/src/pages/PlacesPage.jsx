import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";

export default function PlacesPage(){
    const [title,setTitle]= useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos, setAddedPhotos]= useState([]);
    const [photoLink, setPhotoLink]=('');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuest]= useState(1);

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


    const {action} = useParams();
return(
        <div>
        {action !== 'new' && (
            <div className="text-center">
                <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>

                Add new place</Link>
            </div>
            )}
        {action === 'new' && (
            <div>
                <form>
                    {preInput('Title','Title for you place, should be short and catchy as in advertisement')}
                    <input type='text' value={title} onChange={ev=>setTitle(ev.target.value)} placeholder="My lovely apt"/>
                    {preInput('Address','Address to this place.')}
                    <input type='text' value={address} onChange={ev=>setAddress(ev.target.value)} placeholder="address"/>
                    {preInput('Photos','More = better.')}
                    <div className="flex gap-2">
                        <input type='text' value={photoLink} onChange={ev=>setPhotoLink(ev.target.value)} placeholder={'Add using a link ...jpg'}/>
                        <button className="bg-gray-200 px-4  rounded-2xl">Add&nbsp;photo</button>
                    </div>
                    <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        <button className=" flex  gap-1 justify-center border bg-transparent rounded-2xl p-8 text-xl text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                        </svg>
                        Upload
                        </button>
                    </div>
                    {preInput('Description','Description of the place')}
                    <textarea value={description} onChange={ev=>setDescription(ev.target.value)}/>.
                    {preInput('Perks','Select all the perks of your place')}
                    <div className="grid mt-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        <Perks selected={perks} onChange={setPerks}/>
                    </div>
                    {preInput('Extra info','House rules, etc...')}
                    <textarea value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}/> 
                    {preInput('Check in & out times, max guest','Add check in and out times, remember to have some time window for cleaning the room between guests')}
                    <div className="grid gap-2 sm:grid-cols-3 ">
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
                    </div>
                    <button className="primary my-4">save</button>
                </form>
            </div>
)}
        myplaces
        </div>);
};
