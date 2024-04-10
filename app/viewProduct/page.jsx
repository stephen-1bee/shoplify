"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { EyeOutlined, TagOutlined } from "@ant-design/icons"
import Footer from "../components/Footer"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import { toast, Toaster } from "react-hot-toast"
import conact from "@/utils/concat"

const Page = () => {
  const [cartNo, setCartNo] = useState("")
  const [product, setproduct] = useState({})

  let userId
  let username
  let productId
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
    userId = sessionStorage.getItem("userId")
    productId = sessionStorage.getItem("productId")
  }

  // add to cart
  const addToCart = async (productId) => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        user_id: userId,
        product_id: productId,
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/carts/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "Cart added successfully") {
            toast.success(result.msg)
            console.log(result.msg)
          } else {
            toast.error(result.msg)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  const getCart = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/carts/user/${userId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setCartNo(result.cart_count)
          console.log(result.cart)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  const getProduct = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/products/one/${productId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setproduct(result.product)
          console.log(result.product)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCart()
    getProduct()
  }, [])

  const moveBack = () => {
    window.history.back()
  }

  const handleBuy = (productId) => {
    setTimeout(() => {
      toast.success("Buying...")
      toast.success(productId)
    }, 1000)
  }

  return (
    <div>
      {/* nav */}
      <div className="flex w-full items-center justify-between px-8 shadow h-[10vh]">
        <div className="flex items-center justify-center gap-5">
          <ArrowLeftOutlined className="cursor-pointer" onClick={moveBack} />
          <h1>
            Shoplify<span className="text-[#dd5137]">Store</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="relative">
            <div className="bg-red-500 rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] absolute top-[-8px] right-[-5px] z-[999] p-1">
              <p className="text-white text-center">{cartNo || "0"}</p>
            </div>
            <ShoppingCartOutlined
              className="text-[20px] z-0"
              onClick={() => (window.location.href = "/cart")}
            />
          </div>
          <input
            type="search"
            placeholder="search..."
            className="px-4 py-2 w-[200px] rounded-full outline-black ring-1 ring-[#ccc]"
          />
          <Avatar size={40}>{conact(username ? username : "No")}</Avatar>
        </div>
      </div>

      {/* product preview */}
      <div className="min-h-screen lg:flex-row flex items-center justify-center gap-10 flex-col">
        <div>
          <Image
            src={product.photo}
            alt="image"
            width={200}
            height={200}
            className="rounded-lg lg:h-[500px] lg:w-[500px] h-[400px] w-[300px] object-cover"
          />
        </div>
        <div className="flex flex-col gap-4 w-[350px]">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p>{product.desc}</p>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-2">
              <EyeOutlined /> {product.views}
            </p>
            <p className="text-lg font-semibold">$ {product.price}</p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="flex items-center gap-3 w-full rounded-full"
              onClick={() => addToCart(product._id)}
            >
              <ShoppingCartOutlined className="text-[#dd5137] text-lg" />
              <p className=" font-semibold text-[16px] text-[#dd5137]">
                Add to cart
              </p>
            </button>
            <button
              className="flex items-center gap-3 bg-[#dd5137] p-2 px-3 rounded-full py-2 w-[150px]"
              onClick={() => handleBuy(product._id)}
            >
              <TagOutlined className="text-white" />
              <p className="text-white text-sm text-center">Buy Now</p>
            </button>
          </div>
        </div>
        <Toaster />
      </div>
      <Footer />
    </div>
  )
}

export default Page
