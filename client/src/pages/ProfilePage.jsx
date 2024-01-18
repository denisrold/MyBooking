import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";

export default function ProfilePage(){
    const [redirect,setRedirect] = useState(null); 
    const {user,ready,setUser} = useContext(UserContext);
    let {subpage} = useParams(); 
    const navigate = useNavigate();
    if(subpage === undefined){subpage='profile';}

    async function logout(){
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    };

    if(!ready){
        return 'Loading...';
    }
    if(ready && !user && !redirect){
        return navigate('/login');
    }
    if(redirect){
        return navigate(redirect)
    }

    return (
       <div>
        <AccountNav />
       
        {subpage === 'profile' &&(
            <div className="text-center max-w-lg mx-auto">
                Welcome:{user.name.split(' ')[0].charAt(0).toUpperCase()+ user.name.split(' ')[0].slice(1)}<br/>({user.email})
                <button onClick={logout} className="primary max-w-sm mt-20">Logout</button>
            </div>
        )}
        {subpage === 'places' && (
            <div>
                <PlacesPage/>
            </div>
        )}
       </div> 
    )
}