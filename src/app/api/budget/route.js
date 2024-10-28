import { connectMongoose } from "@/db/dbconnect";
import transaction from "@/db/model/transaction";
import budget from "@/db/model/budget";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const { category, spend, theme } = await req.json();
  const currentUser = cookies().get("currentUser");
  try {
    await connectMongoose();
    const newBudget = await new budget({
      user: currentUser.value,
      category,
      spend,
      theme,
    });
    newBudget.save();
    return NextResponse.json(
      { message: "New budget created" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
};

export const GET = async (req, res) => {
  const currentUser = cookies().get("currentUser");
  try {
    await connectMongoose();
    const b = await budget.find({ user: currentUser.value });
    const t = await transaction.find({ user: currentUser.value });
    if (!b) {
      return NextResponse.json(
        { message: "budget not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ budgets: b, transaction: t }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (req, res) => {
  const budgetId = await req.json();
  try {
    await connectMongoose();
    const b = await budget.findByIdAndDelete(budgetId);
    return NextResponse.json({ message: "Budget deleted" }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
};

export const PATCH = async (req) => {
  const { id, categoryValue, themeValue, spendValue } = await req.json();
  try {
    await connectMongoose();
    const b = await budget.findByIdAndUpdate(id,{category:categoryValue, spend:spendValue, theme:themeValue});
    return NextResponse.json({message:"Update successful"}, {status:200})
  } catch (error) {
    console.log(error)
  }
};
