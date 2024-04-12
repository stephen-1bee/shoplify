"use client"
import React, { useState, useEffect } from "react"
import Footer from "../components/Footer"
import { ShoppingCartOutlined } from "@ant-design/icons"
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons"
import { Popconfirm, Avatar } from "antd"
import Image from "next/image"
import { Toaster, toast } from "react-hot-toast"
import conact from "@/utils/concat"

const page = () => {
  const [cart, setCart] = useState([])
  const [loading, setloading] = useState(false)
  const [cartNo, setcartNum] = useState("")

  let userId
  let username
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
    userId = sessionStorage.getItem("userId")
    sessionStorage.setItem("cartNum", cartNo)
  }

  const getCart = async () => {
    setloading(true)
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
          setCart(result.cart)
          setcartNum(result.cart_count)
          console.log(result.cart)
          setloading(false)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  const handleDelete = (cartId) => {
    try {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      }

      fetch(
        `https://recommender-api-s335.onrender.com/api/v1/carts/delete/${cartId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "cart deleted successfully") {
            toast.success(result.msg)
            console.log(result.msg)
            getCart()
          } else {
            toast.error(result.msg)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }
  const moveBack = () => {
    history.back()
  }

  return (
    <div className="">
      {/* nav */}
      <div className="flex w-full items-center justify-between px-8 shadow h-[10vh]">
        <div className="flex items-center justify-center gap-5">
          <ArrowLeftOutlined
            className="cursor-pointer"
            onClick={() => moveBack()}
          />
          <h1>
            Shoplify<span className="text-[#dd5137]">Store</span>
          </h1>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="relative">
            <div className="bg-red-500 rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] absolute top-[-8px] right-[-5px] z-[999] p-1">
              <p className="text-white text-center">{cartNo ? cartNo : "0"}</p>
            </div>
            <ShoppingCartOutlined
              className="text-[20px] z-0"
              onClick={() => (location.href = "/cart")}
            />
          </div>
          <input
            type="search"
            placeholder="search..."
            className="px-4 py-2 w-[200px] rounded-full ring-1 ring-[#ccc] "
          />
          <Avatar size={40}>{username ? conact(username) : "No Name"}</Avatar>
        </div>
      </div>

      {/* mian */}
      <div className="min-h-screen p-[40px]">
        <h1 className="text-2xl font-semibold">My Carts</h1>
        {loading ? (
          "loading..."
        ) : (
          <div className="flex flex-wrap gap-5 mt-5">
            {cart.map((item) => (
              <div className="w-[350px] gap-5">
                <Image
                  src={item.product[0]?.photo}
                  alt="cartimage"
                  width={100}
                  height={100}
                  className="w-full h-[250px] object-cover rounded-[10px]"
                />
                <div className="p-5 gap-2">
                  <div className="flex items-center justify-between">
                    <h1 className="font-bold">{item.product[0]?.name}</h1>
                    <h1 className="font-bold text-xl">
                      ${item.product[0]?.price}
                    </h1>
                  </div>
                  <p className="text-[#818181] mb-3">{item.product[0]?.desc}</p>

                  <div className="flex items-center justify-end">
                    <Popconfirm
                      title="Delete this item from your cart?"
                      okText="Yes"
                      cancelText="No"
                      okButtonProps={{ style: { backgroundColor: "red" } }}
                      onConfirm={() => handleDelete(item._id)}
                      icon={
                        <QuestionCircleFilled
                          style={{
                            color: "red",
                          }}
                        />
                      }
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Toaster />
      <Footer />
    </div>
  )
}

export default page
