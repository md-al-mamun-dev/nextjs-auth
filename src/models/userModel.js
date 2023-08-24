import mongoose from "mongoose";
import { Schema } from "mongoose";
let userSchema = new Schema({
    username:{
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a email"],
    },
    isVarified:{
        type: Boolean,
        default: false, 
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    varifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.model.users || mongoose.model( "users",  userSchema);
export default User;