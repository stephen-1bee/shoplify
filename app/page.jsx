"use client"
import Image from "next/image"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setloading] = useState(false)
  const [userId, setuserId] = useState("")
  const [username, setUsername] = useState("")

  // retrieve current user id and name
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem("userId", userId)
    sessionStorage.setItem("username", username)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      return toast.error("All fields are required")
    }
    try {
      try {
        setloading(true)
        const myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json")

        const raw = JSON.stringify({
          email: email,
          password: password,
        })

        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        }

        await fetch(
          "https://recommender-api-s335.onrender.com/api/v1/users/login",
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            if (result.msg === "login successful") {
              toast.success(result.msg)
              console.log(result.msg)
              setuserId(result.user._id)
              setUsername(result.user.username)
              location.href = "/mainPage"
              setloading(false)
            } else {
              toast.error(result.msg)
              setloading(false)
            }
          })
          .catch((error) => console.error(error))
      } catch (err) {
        console.log(err)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="items-center justify-center ">
        <Image
          src="/login.jpg"
          width={400}
          height={400}
          alt="login image"
          className="h-[100vh] w-[700px]"
        />
      </div>
      <div className="flex w-full items-center justify-center bg-[#f9fdfa] h-[100vh] gap-10 flex-col">
        <h2 className="font-bold text-lg">
          Shopily<span className="text-[#DD5137]">Store</span>
        </h2>
        {/* form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-[300px] gap-5"
        >
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full"
          />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full"
          />
          <button className="px-4 py-4 ring-1 text-white rounded-full w-full bg-[#DD5137] hover:bg-[#dd5037d8] delay-100 duration-100">
            {loading ? "loading..." : "Login"}
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default page
