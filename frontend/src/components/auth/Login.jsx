import React, { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const formData={email:email,password:password}
    const API_URL = import.meta.env.VITE_API_URL
await  axios.post(API_URL+"/auth/login",formData)
     .then((res)=>{console.log(res)
      if((res.data).message=="success")
      {
navigate("/userHome")
      }
      else
      {
        alert(res.data.message)
      }
     })
     .catch((err)=>console.log(err))
    // Example: perform login API call here
    // fetch('/api/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email, password })
    // })
    // .then(res => res.json())
    // .then(data => console.log(data));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          Login
        </h2>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            ref={emailRef}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            ref={passwordRef}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-lg py-2 hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
