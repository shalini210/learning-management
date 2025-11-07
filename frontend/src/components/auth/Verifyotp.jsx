import React, { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
export default function Verifyotp() {
  let navigate = useNavigate()
    let otpref = useRef()
    let params = useParams()
    let email = params.email;
    let API_URL = import.meta.env.VITE_API_URL
    let verification=async ()=>
    {
  let res = await axios.post(API_URL+"/auth/verifyOtp",{email:email,otp:otpref.current.value})      
  console.log(res.data)
  alert(res.data.msg+" please login")
    navigate("/login")

 
    }
  return (
    <div>Enter OTP:
        <input type="text" ref={otpref} />
        <br />
        <input type="button" value="Verify OTP" onClick={()=>verification()} />
    </div>
  )
}
