"use client"
import Image from "next/image"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import Link from "next/link"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"

const page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState("")
  const [username, setUsername] = useState("")
  const [showPassword, setshowPassword] = useState(false)

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
      setLoading(true)
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

      const response = await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/users/login",
        requestOptions
      )
      const result = await response.json()

      if (result.msg === "login successful") {
        toast.success(`Welcome, ${result.user.username}`)
        setUserId(result.user._id)
        setUsername(result.user.username)
        location.href = "/mainPage"
      } else {
        toast.error(result.msg)
      }

      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
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
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-bold text-4xl">
            Shopily<span className="text-[#DD5137]">Store</span>
          </h2>
          <p className="text-lg">Login to Continue</p>
        </div>
        {/* form */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-[300px] gap-5"
        >
          <div className="w-full">
            <h1>Email</h1>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email address"
              className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <h1>Passowrd</h1>
              {showPassword ? (
                <EyeOutlined onClick={() => setshowPassword(!showPassword)} />
              ) : (
                <EyeInvisibleOutlined
                  onClick={() => setshowPassword(!showPassword)}
                />
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
            />
          </div>
          <button className="px-4 py-4 ring-1 text-white rounded-full w-full bg-[#DD5137] hover:bg-[#dd5037d8] delay-100 duration-100">
            {loading ? "loging in..." : "Login"}
          </button>
          <div className="flex gap-2 items-center">
            <p>Already having an account ? </p>
            <Link href="/">Signup</Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default page
