'use client'


import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  async function submit(e) {
    e.preventDefault()
    if(email == "" || password == ""){
      return
    }
    try {
      const data = {email, password}
      const request = await fetch("/api/login", {
        method:"POST",
        body:JSON.stringify(data)
      })
      if(request.ok){
        router.push("/dashboard")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="sm:flex block h-screen">
        <div className="sm:w-3/5 sm:p-2">
          <div className="bg-grey_500 sm:h-full sm:rounded-2xl pt-7 pb-7 pl-10 sm:p-7 text-white sm:flex sm:flex-col sm:justify-between">
            <h2>Finance</h2>
            <div className="hidden sm:block">
              <h2 className="text-3xl sm:w-3/5 pb-5">
                Keep track of your money and save for your future
              </h2>
              <p className="sm:w-4/5 text-sm text-white">
                Personal finance app puts you in control of your spending. Track
                transactions, set budgets, and add to savings pots easily.
              </p>
            </div>
          </div>
        </div>
        <div className="p-10 w-full sm:w-2/5 flex justify-center">
          <div className="sm:w-3/4 w-full">
            <h2 className="font-bold text-3xl">Welcome back.</h2>
            <form className="mt-20 mb-10 sm:w-full" onSubmit={(e) => submit(e)}>
              <div className="mb-4">
                <label className="text-LabelColor text-sm">Email</label>
                <input
                  autoComplete="email"
                  type="email"
                  className="w-full h-12 border mt-2 p-2"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div className="mb-4">
                <label className="text-LabelColor text-sm">Password</label>
                <input
                  autoComplete="current-password"
                  type="password"
                  className="w-full h-12 border mt-2 p-2"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="w-full bg-grey_500 text-white h-12 cursor-pointer"
              />
            </form>
            <div>
              <p className="text-sm text-black">
                Don't have an account?{" "}
                <Link href="/register" className="text-grey_500 underline">
                  Sign up
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
