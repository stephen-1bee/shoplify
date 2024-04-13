"use client"
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"
import conact from "@/utils/concat"
import { Popconfirm, Avatar, Modal } from "antd"
import React, { useEffect, useState } from "react"
import { Dropdown } from "antd"
import MenuItem from "antd/es/menu/MenuItem"
import Footer from "../components/Footer"
import {
  ArrowLeftOutlined,
  UserOutlined,
  QuestionCircleFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import Nav from "../components/Nav"
import { toast, Toaster } from "react-hot-toast"

const page = () => {
  const [cart, setCart] = useState([])
  const [loading, setloading] = useState(false)
  const [cartNo, setcartNum] = useState("")
  const [updateCardModal, setupdateCardModal] = useState(false)
  const [user, setuser] = useState({})

  const [sUsername, setsUsername] = useState("")
  const [sEmail, setsEmail] = useState("")

  let userId
  let username
  let user_card_id
  if (typeof sessionStorage !== "undefined") {
    username = sessionStorage.getItem("username")
    userId = sessionStorage.getItem("userId")
    // hasCard = sessionStorage.getItem("hasCard")
    // user_card_amount = sessionStorage.getItem("userCardAmount")
    user_card_id = sessionStorage.getItem("userCardId")
  }

  // state to add card fields
  const [visaCardNo, setVisaCardNo] = useState("")
  const [cvc, setcvc] = useState("")
  const [expire, setExpire] = useState("")
  const [balance, setbalance] = useState("")
  const [card, setCard] = useState([])

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

  // gey current user
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
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault()
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      const raw = JSON.stringify({
        username: sUsername ? sUsername : user.username,
        email: sEmail ? sEmail : user.email,
      })

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/users/update/${userId}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "user updated successfully") {
            toast.success(result.msg)
            console.log(result)
            getUser()
          } else {
            toast.error(result.msg)
          }
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getUser()
  }, [])

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

  const moveBack = () => {
    window.history.back()
  }

  const getCard = async () => {
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
          setCard(result.user_card)
          console.log(result.user_card)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getCard()
  }, [])

  // update card
  const handleUpdateCard = async () => {
    try {
      const myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")

      const raw = JSON.stringify({
        user_id: userId,
        card_no: visaCardNo ? visaCardNo : card.card_no,
        expire: expire ? expire : card.expire,
        cvc: cvc ? cvc : card.cvc,
        amount: balance ? balance : card.amount,
      })

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      }

      await fetch(
        `https://recommender-api-s335.onrender.com/api/v1/checkouts/card/update/${user_card_id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "card updated successfully") {
            toast.success(result.msg)
            console.log(result)
            setupdateCardModal(false)
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

      <div className="min-h-screen items-center justify-center flex flex-col">
        <h1 className="text-3xl mb-10">Profile</h1>
        <div className="flex items-cenetr justify-center gap-10">
          <form className="flex flex-col items-center w-[300px] gap-5">
            <div className="w-full">
              <h1>Username</h1>
              <input
                type="text"
                defaultValue={user.username}
                onChange={(e) => setsUsername(e.target.value)}
                placeholder="username"
                className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
              />
            </div>

            <div className="w-full">
              <h1>Email</h1>
              <input
                type="text"
                defaultValue={user.email}
                onChange={(e) => setsEmail(e.target.value)}
                placeholder="email"
                className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
              />
            </div>

            {/* <div className="w-full">
              <div className="flex items-center justify-between px-2 py-2">
                <h1>Password</h1>
                {showPassword ? (
                  <div>
                    <EyeOutlined
                      onClick={() => setshowPassword(!showPassword)}
                    />
                  </div>
                ) : (
                  <div>
                    <EyeInvisibleOutlined
                      onClick={() => setshowPassword(!showPassword)}
                    />
                  </div>
                )}
              </div>
              <input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setsPassword(e.target.value)}
                placeholder="password"
                className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
              />
            </div> */}
            <button
              onClick={(e) => handleUpdateUser(e)}
              className="px-4 py-4 ring-1 text-white rounded-full w-full bg-[#DD5137] hover:bg-[#dd5037d8] delay-100 duration-100"
            >
              Save
            </button>
          </form>

          <div>
            <button onClick={() => setupdateCardModal(true)}>
              Update Card
            </button>
          </div>
        </div>
        <Modal
          open={updateCardModal}
          onCancel={() => setupdateCardModal(false)}
          footer={false}
          centered
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between mt-4">
              <h1 className="text-lg font-semibold">Update Card</h1>
              <h1>Visa</h1>
            </div>
            <div className="border-b border-gray-200"></div>
          </div>
          <br />

          <h1>Card Number</h1>
          <input
            defaultValue={card.card_no}
            onChange={(e) => setVisaCardNo(e.target.value)}
            required
            type="numeric"
            className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
          />

          <div className="flex items-center justify-between gap-5 py-3 ">
            <div className="flex flex-col w-full">
              <h1>Expiry</h1>
              <input
                defaultValue={card.expire}
                className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
                onChange={(e) => setExpire(e.target.value)}
                placeholder="MM/YY"
              />
            </div>

            <div className="flex flex-col w-full">
              <h1>CVC</h1>
              <input
                defaultValue={card.cvc}
                onChange={(e) => setcvc(e.target.value)}
                placeholder="874"
                type="number"
                className="px-3 py-3 rounded-lg border border-[#ccc] w-full"
              />
            </div>
          </div>
          <h1>Amount</h1>
          <input
            defaultValue={card.amount}
            onChange={(e) => setbalance(e.target.value)}
            placeholder="0.00"
            type="number"
            className="px-3 py-3 rounded-lg border border-[#ccc] w-full my-2"
          />
          <button
            onClick={() => handleUpdateCard()}
            className="bg-blue-500 px-3 py-3 items-center flex gap-1 justify-center text-white w-full rounded-lg "
          >
            Update Card
          </button>
        </Modal>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}

export default page
