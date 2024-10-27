import { connectMongoose } from "@/db/dbconnect";
import user from "@/db/model/user";
import { NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import { cookies } from "next/headers";


export const POST = async (req, res) => {
    const {email, password} = await req.json();
    try {
        await connectMongoose();
        const getUser = await user.findOne({email})
        if(getUser){
            return NextResponse.json({message:"Account already exists"},{status: 404})
        }
        const salt = await bcryptjs.genSalt(10)
        const pass = await bcryptjs.hash(password, salt)
        const newUser = await new user({email, password:pass})
        newUser.save()
        cookies().set(
          {  
            name:"currentUser",
            value: newUser._id,
            httpOnly:true
          }
        )
        return NextResponse.json({status:201})
    } catch (error) {
        console.log(error)
    }
}