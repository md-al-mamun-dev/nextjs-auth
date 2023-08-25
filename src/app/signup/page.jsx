"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import  axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage(){
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "", 
        username: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [loading, setLoading] =  useState(false)

    useEffect(()=>{
        if(     user.email.length > 0 
             && user.password.length > 0 
             && user.username.length > 0 ){
            setButtonDisabled(false)
        }
    },[user])
    const onSignup = async () => {
        try{
            setLoading(true)
            const response =  await axios.post("/api/users/signup", user)
            console.log("signup success", response?.data)

            router.push('/login')
        }catch(error){
            console.log("signup failed", error?.message)
            console.log(error)
            toast.error(error?.messsage)
        }finally{
            setLoading(false)
        }
    }

    return(
        <div>
            <h1>Signup </h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input id="username" type="text"
                    onChange={e=>setUser({...user, username:e.target.value})}
                    placeholder="username"
                />
            <hr/>

            <label htmlFor="email">email</label>
            <input id="email" type="text"
                    onChange={e=>setUser({...user, email:e.target.value})}
                    placeholder="email"
                />
            <hr/>                

            <label htmlFor="password">password</label>
            <input id="password" type="password"
                    onChange={e=>setUser({...user, password:e.target.value})}
                    placeholder="password"
                />
            <hr/>

            <button onClick={onSignup}> {buttonDisabled ? 'No signup' : "signup" }</button>
            <hr/>

            already have an account?...<span></span><Link href='./login'>Visite Login</Link>
            <hr/>
        </div>
    )
}