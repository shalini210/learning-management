import React, { useRef } from 'react';
import axios from "axios"
export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const roleRef = useRef();
const API_URL = import.meta.env.VITE_API_URL
  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
      role: roleRef.current.value,
    };
    console.log(formData);
     await  axios.post(API_URL+"/auth/signup",formData)
     .then((res)=>console.log(res))
     .catch((err)=>console.log(err))
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl mb-4 text-center">Signup</h2>

      <div className="mb-3">
        <label className="block mb-1">Name:</label>
        <input
          type="text"
          ref={nameRef}
          className="w-full p-2 border rounded"
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Email:</label>
        <input
          type="email"
          ref={emailRef}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Password:</label>
        <input
          type="password"
          ref={passwordRef}
          className="w-full p-2 border rounded"
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Confirm Password:</label>
        <input
          type="password"
          ref={confirmPasswordRef}
          className="w-full p-2 border rounded"
          placeholder="Confirm your password"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Role:</label>
        <select ref={roleRef} className="w-full p-2 border rounded" required>
          <option value="">Select role</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Signup
      </button>
    </form>
  );
}
