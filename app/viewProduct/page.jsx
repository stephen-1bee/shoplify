import React from "react"

const page = () => {
  let product
  if (typeof sessionStorage !== "undefined") {
    product = sessionStorage.getItem("userCenterId")
  }
  return (
    <div>
      number
      <p>{product}</p>
    </div>
  )
}

export default page
