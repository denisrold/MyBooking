import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

export default function AccountPage(){
    const {user,ready} = useContext(UserContext);

    if(!ready){
        return 'Loading...';
    }
    
    if(ready && !user){
        return <Navigate to={'/login'}/>
    }

    return (
       <div>Accoun page for {user?.name}</div> 
    )
}