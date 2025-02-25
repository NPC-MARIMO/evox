"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([])
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      fetchTransactions()
    }
  }, [status])

  const fetchTransactions = async () => {
    try {
      const response = await fetch("/api/banking/transactions")
      if (response.ok) {
        const data = await response.json()
        setTransactions(data.transactions)
      } else {
        console.error("Failed to fetch transactions")
      }
    } catch (error) {
      console.error("Error fetching transactions:", error)
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
            <h1 className="text-2xl font-semibold mb-6">Transaction History</h1>
            {transactions.length > 0 ? (
              <ul className="space-y-4">
                {transactions.map((transaction) => (
                  <li key={transaction._id} className="border-b pb-2">
                    <p className="font-semibold">{transaction.type === "deposit" ? "Deposit" : "Transfer"}</p>
                    <p>Amount: ${transaction.amount.toFixed(2)}</p>
                    <p>Date: {new Date(transaction.timestamp).toLocaleString()}</p>
                    {transaction.type === "transfer" && (
                      <p>
                        {transaction.sender === session.user.id ? "To: " : "From: "}
                        {transaction.recipient}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

