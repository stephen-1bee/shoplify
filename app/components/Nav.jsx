import conact from "@/utils/concat"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { Avatar } from "antd"
import React from "react"

const Nav = () => {
  // retrive user name
  let username
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
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
          <p className="text-red-500 font-bold text-[12px] absolute top-[-4px] right-[-2px] z-999">
            5
          </p>
          <ShoppingCartOutlined
            className="text-[20px] z-0"
            onClick={() => (location.href = "/cart")}
          />
        </div>
        <input
          type="searcg"
          className="px-4 py-2 w-[200px] rounded-full ring-1 ring-[#ccc] "
        />
        <Avatar size={40}>{conact(username)}</Avatar>
      </div>
    </div>
  )
}

export default Nav
