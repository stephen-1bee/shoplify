"use client"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"

const page = () => {
  const [sUsername, setsUsername] = useState("")
  const [sEmail, setsEmail] = useState("")
  const [sPassword, setsPassword] = useState("")
  const [sLoading, setsLoading] = useState(false)
  const [showPassword, setshowPassword] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    if (!sUsername || !sPassword || !sUsername) {
      return toast.error("All fields are required")
    }
    try {
      setsLoading(true)
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        username: sUsername,
        email: sEmail,
        password: sPassword,
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/users/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "User created successfully") {
            toast.success("Signup successful")
            console.log(result)
            setsLoading(false)
            location.href = "/login"
          } else {
            toast.error(result.msg)
          }
        })
        .catch((error) => console.error(error))
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
        <div className="flex flex-col items-center justify-center gap-1">
          <h2 className="font-bold text-4xl">
            Shopily<span className="text-[#DD5137]">Store</span>
          </h2>
          <p className="text-lg">Welcome, Signup to Continue</p>
        </div>

        {/* form */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center justify-center w-[300px] gap-5"
        >
          <div className="w-full">
            <h1>Username</h1>
            <input
              type="text"
              onChange={(e) => setsUsername(e.target.value)}
              placeholder="username"
              className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
            />
          </div>

          <div className="w-full">
            <h1>Email</h1>
            <input
              type="text"
              onChange={(e) => setsEmail(e.target.value)}
              placeholder="email"
              className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
            />
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between px-2 py-2">
              <h1>Password</h1>
              {showPassword ? (
                <div>
                  <EyeOutlined onClick={() => setshowPassword(!showPassword)} />
                </div>
              ) : (
                <div>
                  <EyeInvisibleOutlined
                    onClick={() => setshowPassword(!showPassword)}
                  />
                </div>
              )}
            </div>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setsPassword(e.target.value)}
              placeholder="password"
              className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
            />
          </div>
          <button className="px-4 py-4 ring-1 text-white rounded-full w-full bg-[#DD5137] hover:bg-[#dd5037d8] delay-100 duration-100">
            {sLoading ? "Signing up..." : "Signup"}
          </button>
          <div className="flex gap-2 items-center">
            <p>Don't have an account ? </p>
            <Link href="/login">Login</Link>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default page
