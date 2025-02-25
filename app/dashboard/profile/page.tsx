"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Profile() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6">User Profile</h1>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {session.user.name}
              </p>
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

