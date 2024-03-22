"use client"
import React, { useState, useEffect } from "react"
import Footer from "../components/Footer"
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  QuestionCircleFilled,
} from "@ant-design/icons"
import { Popconfirm } from "antd"
import Image from "next/image"
import { Toaster, toast } from "react-hot-toast"

const page = () => {
  const [cart, setCart] = useState([])
  const [loading, setloading] = useState(false)

  let userId
  if (typeof sessionStorage !== "undefined") {
    userId = sessionStorage.getItem("userId")
  }

  const getCart = () => {
    setloading(true)
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      fetch(
        `https://recommender-api-s335.onrender.com/api/v1/carts/user/${userId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setCart(result.cart)
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
