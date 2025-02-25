import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Banking App</h1>
        <div className="space-y-4">
          <Link
            href="/login"
            className="block w-full text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="block w-full text-center bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

