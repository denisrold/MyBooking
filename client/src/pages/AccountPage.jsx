import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";

export default function AccountPage(){
    const {user,ready} = useContext(UserContext);

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user){
        return <Navigate to={'/login'}/>
    }

    const {subpage} = useParams(); 
    
    function linkClasses (type=null){
       let classes = 'py-2 px-6'; 
        if(type === subpage || subpage === undefined && type === 'profile'){
        classes += ' bg-primary text-white rounded-full';
        }
        return classes;
    }


    return (
       <div>
        <nav className="w-full flex justify-center mt-8 gap-4">
            <Link className={linkClasses('profile')} to={'/account'}>My profile</Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
            <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
        </nav>
       </div> 
    )
}