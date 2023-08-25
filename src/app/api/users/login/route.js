
import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
// const jwt = require('jsonwebtoken'); // tested required syntex is also working
import jwt from 'jsonwebtoken'

connect()

export async function POST(request){


    try {
        const reqBody = await request.json()
        const {email, password}  = reqBody;

        // const UserModel = mongoose.model['users']
        // console.log('before-------------------------fiend email')

        // Find user
        const user = await User.findOne({email})
        // let user = await mongoose.model.users.findOne({email})

        // when user is not found  
        if(!user){
            return NextResponse.json({error:"User does not exist"}, {status: 400})
        }

        // check if password is correct 
        const validPassword = await bcryptjs.compare(password, user?.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"}, {status: 400})
        }
        console.log('password valid')


        // user._id is now in object formate 
        // const _id_obj = user._id  //if we want to use _id as string, then use this

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        console.log(tokenData)


        // create token 
        const token = await jwt.sign( tokenData, process.env.TOKEN_SECREATE, { expiresIn: '1d' });
        console.log(token)


        const response = NextResponse.json({
            message: "Login successful", 
            success: true,
        })

        // response.cookies.set        
        response.cookies.set(   
                              'token', 
                                token, 
                                { 
                                    httpOnly: true 
                                })
        return response

    } catch (error) {
        return NextResponse.json({error: error?.message}, {status: 500})
    }
}