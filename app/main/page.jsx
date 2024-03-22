"use client"
import React, { useState, useEffect } from "react"
import ProductCard from "../components/productCard"
import Nav from "../components/Nav"
import { toast, Toaster } from "react-hot-toast"

const MainPage = () => {
  const [products, setproducts] = useState([])
  const [loading, setloading] = useState(false)

  let userId
  if (typeof sessionStorage !== "undefined") {
    userId = sessionStorage.getItem("userId")
  }

  const getProducts = async () => {
    try {
      setloading(true)
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/products/all",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setproducts(result.products)
          console.log(result.products)
          setloading(false)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  // const ProductId = (id) => {
  //   alert()
  // }

  const addToCart = (productId) => {
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
      fetch(
        "https://recommender-api-s335.onrender.com/api/v1/carts/create",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.msg === "cart added successfully") {
            toast.success(result.msg)
            console.log(result.msg)
            location.href = "/cart"
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
    <div className="min-h-screen ">
      {/* nav */}
      <Nav />
      {/* <p>{userId}</p> */}
      <div className="p-10">
        <h1 className="text-2xl font-semibold"> Recommended</h1>
        <div className="flex gap-5 flex-wrap">
          {loading ? (
            "looding..."
          ) : (
            <div className="flex gap-5 flex-wrap items-center">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.photo}
                  title={product.name}
                  desc={`Price: $${product.price}`}
                  price={product.price}
                  addToCart={() => addToCart(product._id)}
                />
              ))}
            </div>
          )}
        </div>
        <br />
        {/* <h1 className="text-2xl font-semibold">Cart</h1> */}
      </div>
      <Toaster />
    </div>
  )
}

export default MainPage
