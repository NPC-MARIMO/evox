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

    const { recipient, amount } = await req.json()

    if (!recipient || !amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid recipient or amount" }, { status: 400 })
    }

    const sender = await User.findOne({ email: session.user.email })
    const recipientUser = await User.findOne({ email: recipient })

    if (!sender || !recipientUser) {
      return NextResponse.json({ message: "Sender or recipient not found" }, { status: 404 })
    }

    if (sender.balance < amount) {
      return NextResponse.json({ message: "Insufficient funds" }, { status: 400 })
    }

    sender.balance -= Number.parseFloat(amount)
    recipientUser.balance += Number.parseFloat(amount)

    await sender.save()
    await recipientUser.save()

    const transaction = new Transaction({
      sender: sender._id,
      recipient: recipientUser._id,
      amount: Number.parseFloat(amount),
      type: "transfer",
    })
    await transaction.save()

    return NextResponse.json({ message: "Money sent successfully", balance: sender.balance })
  } catch (error) {
    console.error("Error sending money:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

