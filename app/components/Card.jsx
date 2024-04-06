"use client"
import {
  EyeOutlined,
  ShoppingCartOutlined,
  TagOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import React from "react"
import toast from "react-hot-toast"

const Card = ({ image, title, desc, price, onAddToCart, views }) => {
  const buyNow = () => {
    toast.success("Buy now")
  }

  return (
    <div className="w-[350px] bg-white rounded-xl p-8 px-3">
      <div className="px-5">
        <Image
          width={100}
          height={100}
          alt="image"
          src={image}
          className="w-full h-[170px] rounded-lg object-cover"
        />
        <div className="flex items-center justify-between mb-2 mt-6">
          <h1 className="font-bold">{title}</h1>
          <h1 className="font-bold text-xl">${price}</h1>
        </div>
        <p className="text-[#818181] mb-3">{desc}</p>
      </div>
      <div className="flex items-center px-5">
        <button
          className="flex items-center gap-3 w-[200px]"
          onClick={onAddToCart}
        >
          <ShoppingCartOutlined className="text-[#dd5137]" />
          <p className="text-[#dd5137] font-semibold text-sm">Add to cart</p>
        </button>
        <div className="flex items-center gap-3 bg-[#dd5137] p-1 px-3 rounded-full py-2 w-[70px]">
          <EyeOutlined className="text-white" />
          <p className="text-white text-sm text-center">{views}</p>
        </div>
      </div>
    </div>
  )
}

export default Card
