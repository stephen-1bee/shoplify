import React from "react"

const page = () => {
  const [sUsername, setsUsername] = useState("")
  const [sEmail, setsEmail] = useState("")
  const [sPassword, setsPassword] = useState("")
  const [sLoading, setsLoading] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    try {
      toast.success("Signup successful")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="items-center justify-center ">
        <Image
          src="/login.jpg"
          width={400}
          height={400}
          alt="login image"
          className="h-[100vh] w-[700px]"
        />
      </div>

      <div className="flex w-full items-center justify-center bg-[#f9fdfa] h-[100vh] gap-10 flex-col">
        <div className="flex flex-col items-center justify-center gap-2">
          <h2 className="font-bold text-4xl">
            Shopily<span className="text-[#DD5137]">Store</span>
          </h2>
          <p className="text-lg">Login to Continue</p>
        </div>

        {/* form */}
        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center justify-center w-[300px] gap-5"
        >
          <input
            type="text"
            onChange={(e) => setsUsername(e.target.value)}
            placeholder="username"
            className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
          />
          <input
            type="text"
            onChange={(e) => setsEmail(e.target.value)}
            placeholder="username"
            className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
          />
          <input
            type="password"
            onChange={(e) => setsPassword(e.target.value)}
            placeholder="password"
            className="px-4 py-4 ring-1 ring-[#ccc] rounded-full w-full outline-black"
          />
          <button className="px-4 py-4 ring-1 text-white rounded-full w-full bg-[#DD5137] hover:bg-[#dd5037d8] delay-100 duration-100">
            {sLoading ? "loging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default page
