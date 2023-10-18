import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect } from "react";

export default function PlacesPage(){
    const [places, setPlaces] = useState([]);
useEffect(()=>{
    axios.get('/places').then(({data})=>{
    setPlaces(data);
    })
},[]);
return(
        <div>
            <AccountNav/>
            <div className="text-center">
                List of all added places
                <br/>
                <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                </svg>
                Add new place</Link>
            </div>
        </div>);
};
