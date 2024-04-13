"use client"
import React, { useState, useEffect, useActionState } from "react"
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
  const [AddCardModal, setAddCardModal] = useState(false)
  const [user, setuser] = useState({})

  // state to add card fields
  const [visaCardNo, setVisaCardNo] = useState("")
  const [cvc, setcvc] = useState("")
  const [expire, setExpire] = useState("")
  const [balance, setbalance] = useState("")

  let userId
  let username
  let productId
  let hasCard
  let user_card_no
  let user_card_expire
  let user_card_cvc
  let user_card_amount
  let user_card_id
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
    userId = sessionStorage.getItem("userId")
    productId = sessionStorage.getItem("productId")
    hasCard = sessionStorage.getItem("hasCard")
    user_card_no = sessionStorage.getItem("userCardNo")
    user_card_expire = sessionStorage.getItem("userExpireNo")
    user_card_cvc = sessionStorage.getItem("userCvcNo")
    user_card_amount = sessionStorage.getItem("userCardAmount")
    user_card_id = sessionStorage.getItem("userCardId")
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

  // get single user
  const getUser = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/users/one/${userId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setuser(result.user)
          console.log(result.user)
          sessionStorage.setItem("hasCard", result.user.hasCard)

          setAddCardModal(false)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  const getUserCard = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/checkouts/user/${userId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          sessionStorage.setItem("userCardNo", result.user_card.card_no)
          sessionStorage.setItem("userExpireNo", result.user_card.expire)
          sessionStorage.setItem("userCvcNo", result.user_card.cvc)
          sessionStorage.setItem("userCardAmount", result.user_card.amount)
          sessionStorage.setItem("userCardId", result.user_card._id)
          console.log(result.user_card)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUserCard()
    getUser()
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

  const handleAddCard = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        user_id: userId,
        card_no: visaCardNo,
        expire: expire,
        cvc: cvc,
        amount: balance,
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/checkouts/add-card",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "Card saved successfully") {
            toast.success(result.msg)
            console.log(result)
            setAddCardModal(false)
          } else {
            toast.error(result.msg)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  // open modal logic
  const openModals = () => {
    hasCard === "true" ? setpaymentModal(true) : setAddCardModal(true)
  }

  const handlePayment = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        user_id: userId,
        product_price: subtotal,
      })

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/checkouts/payment/${productId}`,
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
            onClick={() => openModals()}
            className="text-white py-3 rounded-full bg-[#dd5137]"
          >
            Checkout
          </button>
        </div>
        <Toaster />
      </div>

      {/* Add card modal */}
      <Modal
        open={AddCardModal}
        onCancel={() => setAddCardModal(false)}
        footer={false}
        centered
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-lg font-semibold">Add Card</h1>
            <h1>Visa</h1>
          </div>
          <div className="border-b border-gray-200"></div>
        </div>
        <br />

        <h1>Card Number</h1>
        <input
          onChange={(e) => setVisaCardNo(e.target.value)}
          required
          type="numeric"
          className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
        />

        <div className="flex items-center justify-between gap-5 py-3 ">
          <div className="flex flex-col w-full">
            <h1>Expiry</h1>
            <input
              className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
              onChange={(e) => setExpire(e.target.value)}
              placeholder="MM/YY"
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
        <h1>Amount</h1>
        <input
          onChange={(e) => setbalance(e.target.value)}
          placeholder="0.00"
          type="number"
          className="px-3 py-3 rounded-lg border border-[#ccc] w-full my-2"
        />
        <button
          onClick={() => handleAddCard()}
          className="bg-blue-500 px-3 py-3 items-center flex gap-1 justify-center text-white w-full rounded-lg "
        >
          <LockOutlined />
          Add Card
        </button>
      </Modal>

      {/* Payment modal */}
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
          required
          defaultValue={user_card_no}
          type="number"
          className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
          maxLength="14"
        />
        <div className="flex items-center justify-between gap-5 py-3 ">
          <div className="flex flex-col w-full">
            <h1>Expiry</h1>
            <input
              defaultValue={user_card_expire}
              placeholder={user_card_expire}
              type="text"
              className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
            />
          </div>
          <div className="flex flex-col w-full">
            <h1>CVC</h1>
            <input
              defaultValue={user_card_cvc}
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
