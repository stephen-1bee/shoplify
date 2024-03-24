import conact from "@/utils/concat"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import Search from "antd/es/input/Search"
import React from "react"

const Nav = () => {
  // retrive user name
  let username
  let cartNum
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
    cartNum = sessionStorage.getItem("cartNum")
  }

  return (
    <div className="flex w-full items-center justify-between px-8 shadow h-[10vh]">
      <div>
        <h1>
          Shoplify <span className="text-[#dd5137]">Store</span>
        </h1>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <div className="relative">
          <div className="bg-red-500 rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] absolute top-[-8px] right-[-5px] z-[999] p-1">
            <p className="text-white text-center">{cartNum}</p>
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
        <Avatar size={40}>{conact(username)}</Avatar>
      </div>
    </div>
  )
}

export default Nav
