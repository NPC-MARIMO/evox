import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import Transaction from "@/models/Transaction"

export async function GET(req: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const transactions = await Transaction.find({
      $or: [{ sender: session.user.id }, { recipient: session.user.id }],
    })
      .sort({ timestamp: -1 })
      .limit(10)

    return NextResponse.json({ transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

