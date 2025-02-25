"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Dashboard() {
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
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-800">Banking App</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Welcome, {session?.user?.name}</span>
              <button
                onClick={() => router.push("/api/auth/signout")}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/dashboard/balance" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900">Check Balance</h2>
              <p className="mt-2 text-sm text-gray-600">View your current account balance</p>
            </Link>
            <Link href="/dashboard/deposit" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900">Deposit</h2>
              <p className="mt-2 text-sm text-gray-600">Add funds to your account</p>
            </Link>
            <Link href="/dashboard/send" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900">Send Money</h2>
              <p className="mt-2 text-sm text-gray-600">Transfer funds to another account</p>
            </Link>
            <Link href="/dashboard/history" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
              <p className="mt-2 text-sm text-gray-600">View your recent transactions</p>
            </Link>
            <Link href="/dashboard/profile" className="bg-white overflow-hidden shadow rounded-lg p-6 hover:shadow-md">
              <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
              <p className="mt-2 text-sm text-gray-600">Manage your account details</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

