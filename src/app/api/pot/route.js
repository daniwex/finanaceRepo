import { connectMongoose } from "@/db/dbconnect";
import pot from "@/db/model/pot";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
  const { potTitle, potAmount, potTheme } = await req.json();
  const currentUser = cookies().get("currentUser");
  try {
    await connectMongoose();
    const newPot = await new pot({
      user: currentUser.value,
      potAmount,
      potTheme,
      potTitle,
      potSavings:0
    });
    newPot.save();
    return NextResponse.json(
      { message: "Pot successfully saved" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req) => {
  const currentUser = cookies().get("currentUser");
  try {
    await connectMongoose();
    const pots = await pot.find({
      user: currentUser.value,
    });
    if (!pots) {
      return NextResponse.json({ message: "No pots found" }, { status: 404 });
    }
    return NextResponse.json(pots, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const PATCH = async(req) => {
  const {potId,potSavings} = await req.json()
  try {
    await connectMongoose()
    const p = await pot.findByIdAndUpdate(potId,{potSavings})
    return NextResponse.json({ message: "Pot updated successfully" }, { status: 200 });
  } catch (error) {
    console.log(error)
  }
}
