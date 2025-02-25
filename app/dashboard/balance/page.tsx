"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Balance() {
  const [balance, setBalance] = useState(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      fetchBalance()
    }
  }, [status])

  const fetchBalance = async () => {
    try {
      const response = await fetch("/api/banking/balance")
      if (response.ok) {
        const data = await response.json()
        setBalance(data.balance)
      } else {
        console.error("Failed to fetch balance")
      }
    } catch (error) {
      console.error("Error fetching balance:", error)
    }
  }

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
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h2 className="text-3xl font-extrabold text-gray-900">Account Balance</h2>
                {balance !== null ? (
                  <p className="text-5xl font-bold text-indigo-600">${balance.toFixed(2)}</p>
                ) : (
                  <p>Loading balance...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

