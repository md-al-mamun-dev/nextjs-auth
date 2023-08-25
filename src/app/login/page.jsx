"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage(){
    const router = useRouter();
    const [user, setUser] = useState({
                                    email: "",
                                    password: "", 
                                })
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const onLogin = async () => {
        try {
            setLoading(true)
            console.log(user)
            const response =  await axios.post("/api/users/login", user)
            // const response =  await axios.post("/api/users/login", user)
            // console.log(response)
            // console.log("Login success", response.data)
            // toast.error("Login success")
            router.push('/profile')
        } catch (error) {
            console.log(error)
            toast.error(error.meassage)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
        }
    }, [user]);


    return(
        <div>
            <h1> {loading ? "Processing...": "Login"}</h1>
            <hr/>
            <label htmlFor="email">email</label>
            <input id="email" type="email"
                    onChange={e=>setUser({...user, email: e.target.value})}
                    placeholder="email"
                />
            <hr/>                

            <label htmlFor="password">password</label>
            <input id="password" type="password"
                    onChange={e=>setUser({...user, password: e.target.value})}
                    placeholder="password"
                />
            <hr/>

            <button onClick={onLogin}>Login</button>
            <hr/>

            dont have an account?...<span></span><Link href='./signup'>Signup heare</Link>
            <hr/>
        </div>
        )
}