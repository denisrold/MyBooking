import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

export default function RegisterPage(){
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [registerOk,setRegisterOk] = useState(false);
    async function registerUser(e){
        e.preventDefault();
        try{
           const res =  await axios.post('/register',{
                name,
                email,
                password
            })
            setRegisterOk(true);
            alert('Registration successful. Now you can log in')
          
        }
        catch(e){
            alert('Registration failed. please try again later');
        }
       
    }

    if(registerOk) return <Navigate to='/login'/>

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input type='email' name='email' placeholder="your@email.com" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                <input type='text' name='name' placeholder="Jhon Doe" value={name} onChange={e=>{setName(e.target.value)}}/>
                <input type='password' name='password' placeholder="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">
                Already a member? 
                <Link className="underline text-black" to='/login'>Login</Link>
                </div>
            </form>
            </div>
        </div>
    )
};