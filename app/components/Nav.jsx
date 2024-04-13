import conact from "@/utils/concat"
import { Popconfirm, Avatar } from "antd"
import React, { useEffect, useState } from "react"
import { Dropdown } from "antd"
import MenuItem from "antd/es/menu/MenuItem"
import {
  UserOutlined,
  QuestionCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons"

const Nav = () => {
  const [cart, setCart] = useState([])
  const [loading, setloading] = useState(false)
  const [cartNo, setcartNum] = useState("")

  let userId
  let username
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
    userId = sessionStorage.getItem("userId")
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

  const moveToProfile = () => {
    location.href = "/profile"
  }
  const logout = () => {
    location.href = "/"
  }

  const items = [
    {
      label: (
        <div className="flex items-center flex-col w-[200px] gap-4 py-5 ">
          <MenuItem
            className="flex gap-2 items-center"
            onClick={() => moveToProfile()}
          >
            <UserOutlined />
            {username}
          </MenuItem>
          <MenuItem>
            <Popconfirm
              title="Do you want to logout?"
              okText="Yes"
              cancelText="No"
              okButtonProps={{ style: { backgroundColor: "red" } }}
              onConfirm={() => logout()}
              icon={
                <QuestionCircleFilled
                  style={{
                    color: "red",
                  }}
                />
              }
            >
              Logout
            </Popconfirm>
          </MenuItem>
        </div>
      ),
    },
  ]

  return (
    <div class="flex w-full items-center justify-between px-8 shadow h-[10vh] fixed z-[999] bg-white">
      <div>
        <h1>
          Shoplify <span className="text-[#dd5137]">Store</span>
        </h1>
      </div>
      <div className="flex gap-4 items-center justify-center">
        <div className="relative">
          <div className="bg-red-500 rounded-full h-4 w-4 flex items-center justify-center font-bold text-[10px] absolute top-[-8px] right-[-5px] z-[999] p-1">
            <p className="text-white text-center">{cartNo ? cartNo : 0}</p>
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
        <Dropdown
          className="cursor-pointer"
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Avatar size={40}>{username ? conact(username) : "No name"}</Avatar>
        </Dropdown>
      </div>
    </div>
  )
}

export default Nav
