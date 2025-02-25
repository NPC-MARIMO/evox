import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Transaction from "@/models/Transaction"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { amount } = await req.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid amount" }, { status: 400 })
    }

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    user.balance += Number.parseFloat(amount)
    await user.save()

    const transaction = new Transaction({
      sender: user._id,
      recipient: user._id,
      amount: Number.parseFloat(amount),
      type: "deposit",
    })
    await transaction.save()

    return NextResponse.json({ message: "Deposit successful", balance: user.balance })
  } catch (error) {
    console.error("Error depositing funds:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

