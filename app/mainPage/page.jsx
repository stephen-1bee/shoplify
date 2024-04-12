"use client"
import Card from "../components/Card"
import React, { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { toast, Toaster } from "react-hot-toast"
import ProductCard from "../components/ProductCard"
import { FrownOutlined } from "@ant-design/icons"

const Page = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [recommended, setrecommended] = useState(null)

  // Retrieve user id
  let userId = null
  if (typeof sessionStorage !== "undefined") {
    userId = sessionStorage.getItem("userId")
  }

  const getProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        "https://recommender-api-s335.onrender.com/api/v1/products/all"
      )
      const data = await response.json()
      setProducts(data.products)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  // buy
  const handleBuy = (event, productId) => {
    event.stopPropagation()
    setTimeout(() => {
      toast.success("Buying...", productId)
    }, 1000)
  }

  // add to cart
  const addToCart = async (event, productId) => {
    event.stopPropagation()
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

  // get recommendations
  const getRecommendation = async () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      }

      fetch(
        "https://recommender-api-s335.onrender.com/api/v1/products/recommended",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          setrecommended(result?.recommended)
          console.log(`recommended ${result?.recommended}`)
        })
        .catch((error) => console.error(error))
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getProducts()
    getRecommendation()
  }, [])

  // grab product
  const hadnleProductClick = (productId) => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      sessionStorage.setItem("productId", productId)
    }
    location.href = "/viewProduct"
  }

  return (
    <main className="min-h-screen">
      <Nav />
      <br />
      <br />
      <div className="min-h-screen flex justify-between mt-[80px]">
        <div className="flex flex-[1]">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl px-[2rem]">
              Browse our range of products
            </h1>
            <br />

            <h1 className="font-black text-2xl px-[2rem]">Groceries</h1>
            <div>
              {loading ? (
                <p className="px-[2rem]">loading...</p>
              ) : (
                <div className="flex flex-row mt-4 gap-2 w-full flex-wrap overflow-hidden">
                  {products.map((product) => (
                    <div
                      className="cursor-pointer"
                      onClick={() => hadnleProductClick(product._id)}
                    >
                      <Card
                        image={product.photo}
                        title={product.name}
                        desc={product.desc}
                        price={product.price}
                        views={product.views ? product.views : "0"}
                        buy={(event) => handleBuy(event, product._id)}
                        onAddToCart={(event) => addToCart(event, product._id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <br />
          </div>
        </div>

        {/* recommended */}
        {recommended?.length > 0 && (
          <div>
            <div className="flex flex-col w-[400px] mr-5 overflow-y-scroll p-5 shadow-lg h-[700px] ">
              <h1 className="text-2xl font-bold mb-3">Recommended</h1>

              <div>
                {recommended.map((recommend) => (
                  <div>
                    <ProductCard
                      image={recommend?.photo}
                      title={recommend?.name}
                      views={recommend?.views}
                      desc={recommend?.desc}
                      price={recommend?.price}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <Toaster />
    </main>
  )
}

export default Page
