import { connectMongoose } from "@/db/dbconnect"
import user from "@/db/model/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { cookies } from "next/headers";

export const POST = async (req, res) => {
    const {email, password} = await req.json()
    try {
        await connectMongoose();
        const getUser = await user.findOne({email})
        if(!getUser){
            return NextResponse.json({message:"invalid username or password, please try again"},{status: 404})
        }
        const checkPassword = await bcrypt.compare(password,getUser.password)
        if(!checkPassword){
            return NextResponse.json({message:"invalid username or password, please try again"},{status: 401})
        }
        cookies().set(
            {  
              name:"currentUser",
              value: getUser._id,
              httpOnly:true
          }
        )       
        return NextResponse.json({status:200})
    } catch (error) {
        console.log(error)
    }
}