"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { EyeOutlined, TagOutlined } from "@ant-design/icons"
import Footer from "../components/Footer"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Avatar, Modal } from "antd"
import { toast, Toaster } from "react-hot-toast"
import conact from "@/utils/concat"
import { LockOutlined } from "@mui/icons-material"

const Page = () => {
  const [cartNo, setCartNo] = useState("")
  const [product, setproduct] = useState({})
  const [productCount, setItemCount] = useState(1)
  const [paymentModal, setpaymentModal] = useState(false)

  const [visaCardNo, setVisaCardNo] = useState("")
  const [cvc, setcvc] = useState("")
  const [expire, setExpire] = useState("")

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

  const handleItemCount = () => {
    setItemCount((count) => count + 1)
  }

  // get subtotal
  const subtotal = productCount * product.price

  const moveBack = () => {
    window.history.back()
  }

  const [amount, setamount] = useState(subtotal)

  const handlePayment = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        card_no: visaCardNo,
        expire: expire,
        cvc: cvc,
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/payments/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "Payment made successfully") {
            toast.success(result.msg)
            console.log(result)
            setpaymentModal(false)
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
              onClick={() => handleItemCount()}
            >
              <ShoppingCartOutlined className="text-[#dd5137] text-lg" />
              <p className=" font-semibold text-[16px] text-[#dd5137]">
                Add Item
              </p>
            </button>
          </div>
          <div className="border-b border-gray-200 "></div>
          <div className="flex items-center justify-between">
            <h1>Items</h1>
            <h1>{productCount}</h1>
          </div>
          <div className="flex items-center justify-between">
            <h1>Subtotal</h1>
            <h1>${subtotal}</h1>
          </div>
          <button
            onClick={() => setpaymentModal(true)}
            className="text-white py-3 rounded-full bg-[#dd5137]"
          >
            Checkout
          </button>
        </div>
        <Toaster />
      </div>

      <Modal
        open={paymentModal}
        onCancel={() => setpaymentModal(false)}
        footer={false}
        centered
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-lg font-semibold">Payment</h1>
            <h1>Visa</h1>
          </div>
          <div className="border-b border-gray-200"></div>
        </div>
        <br />
        <h1>Card Number</h1>
        <input
          onChange={(e) => setVisaCardNo(e.target.value)}
          required
          type="number"
          className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
          maxLength="14"
        />
        <div className="flex items-center justify-between gap-5 py-3 ">
          <div className="flex flex-col w-full">
            <h1>Expiry</h1>
            <input
              onChange={(e) => setExpire(e.target.value)}
              placeholder="MM/DD"
              type="date"
              className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
              onkeydown="return false"
              onpaste="return false"
              oninput="this.value = this.value.replace(/[^0-9\/]/g, '').slice(0, 5);"
              max="9999-12-31"
            />
          </div>
          <div className="flex flex-col w-full">
            <h1>CVC</h1>
            <input
              onChange={(e) => setcvc(e.target.value)}
              placeholder="874"
              type="number"
              className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
            />
          </div>
        </div>
        <button
          onClick={() => handlePayment()}
          className="bg-blue-500 px-3 py-3 text-white w-full rounded-lg "
        >
          <LockOutlined />
          Pay Now ${subtotal}
        </button>
      </Modal>
      <Footer />
    </div>
  )
}

export default Page
