"use client"
import {
  ShoppingCartOutlined,
  TagOutlined,
  EyeOutlined,
} from "@ant-design/icons"
import Image from "next/image"
import React from "react"

const ProductCard = ({
  image,
  title,
  desc,
  price,
  onAddToCart,
  buy,
  views,
}) => {
  return (
    <div className="w-[350px] bg-white rounded-xl shadow  p-8 px-3">
      <div className="px-5">
        <Image
          width={400}
          height={200}
          alt="image"
          src={image}
          className="w-full h-[170px] rounded-lg"
        />
        <div className="flex items-center justify-between mb-2 mt-6">
          <h1 className="font-bold">{title}</h1>
          <h1 className="font-bold text-xl">${price}</h1>
        </div>
        <p className="text-[#818181] mb-3">{desc}</p>
      </div>
      <div className="flex items-center justify-between p-1 px-4 rounded-full py-2 w-[70px] ml-auto">
        <EyeOutlined />
        <p className="text-sm text-center">{views}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <button
          className="flex items-center gap-3 w-[200px]"
          onClick={onAddToCart}
        >
          <ShoppingCartOutlined className="text-[#dd5137]" />
          <p className="text-[#dd5137] font-semibold text-sm">Add to cart</p>
        </button>
        <button
          className="flex items-center gap-3 bg-[#dd5137] p-1 px-3 rounded-full py-2"
          onClick={buy}
        >
          <TagOutlined className="text-white" />
          <p className="text-white text-sm text-center">Buy Now</p>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
