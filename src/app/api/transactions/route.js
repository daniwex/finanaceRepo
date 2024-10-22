import { connectMongoose } from "@/db/dbconnect";
import transaction from "@/db/model/transaction";
import user from "@/db/model/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const {
    transactionName,
    transactionCategory,
    transactionDate,
    transactionAmount,
    transactionRecurring,
  } = await req.json();
  const userId = cookies().get("currentUser");
  try {
    await connectMongoose();
    const u = await user.findById(userId.value);
    if (!u) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    console.log(u)
    const newTransaction = await new transaction({
      user: u._id,
      transactionName,
      transactionCategory,
      transactionDate,
      transactionAmount,
      transactionRecurring,
    });
    newTransaction.save()
    return NextResponse.json({message:"New Transaction Created"})
  } catch (error) {
    console.log(error);
  }
};


export const GET = async (req, res) => {
    const userId = cookies().get("currentUser");
    try {
        await connectMongoose()
        const t = await transaction.find({user:userId.value},{_id:0})
        if(!t){
            return NextResponse.json({message:"No transaction found"},{status:404})
        }
        return NextResponse.json(t,{status:200})
    } catch (error) {
        console.log(error)
    }
}