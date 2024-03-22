"use client"
import Card from "../components/Card"
import React, { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import { toast, Toaster } from "react-hot-toast"
import ProductCard from "../components/ProductCard"

const Page = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

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

  const addToCart = async (productId) => {
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
            setTimeout(() => {
              location.href = "/cart"
            }, 2000)
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
    getProducts()
  }, [])
  return (
    <main className="bg-[#ffffff] w-full ">
      <Nav />
      <br />
      <br />
      <div className="min-h-screen flex justify-between mt-10 px-[2rem]">
        <div className="flex flex-[1] mr-8">
          <div className="flex flex-col">
            <h1 className="font-bold text-2xl">Browse our range of products</h1>
            <br />

            <h1 className="font-black text-2xl">Men's Wear</h1>
            <div>
              {loading ? (
                "loading..."
              ) : (
                <div className="flex flex-row mt-4 gap-2 w-[1200px] overflow-x-scroll overflow-hidden products">
                  {products.map((product) => (
                    <div className="cursor-pointer">
                      <Card
                        image={product.photo}
                        title={product.name}
                        desc={product.desc}
                        price={product.price}
                        onAddToCart={() => addToCart(product._id)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <br />
            <h1 className="font-black text-2xl">Ladies Wear</h1>
            <div className="flex flex-row mt-4 gap-2 w-[1200px] overflow-x-scroll products">
              loading..
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col flex-[0.3] mr-9 recommendations overflow-y-scroll ">
            <h1 className="text-2xl font-bold mb-3">Recommended</h1>
            <div className="mt-4 flex flex-col gap-4">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Toaster />
    </main>
  )
}

export default Page
