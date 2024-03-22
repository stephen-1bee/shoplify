import Link from "next/link"
import React from "react"

const notFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-2">
        <h1>Oppss!!!</h1>
        <p>Page not found</p>
        <Link
          href="/mainPage"
          className="w-[250px] py-4 bg-[#DD5137] text-white rounded-full"
        >
          <p className="text-center">Back Home</p>
        </Link>
      </div>
    </div>
  )
}

export default notFound
