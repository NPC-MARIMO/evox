import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import dbConnect from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(req: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const user = await User.findOne({ email: session.user.email })

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ balance: user.balance })
  } catch (error) {
    console.error("Error fetching balance:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}

