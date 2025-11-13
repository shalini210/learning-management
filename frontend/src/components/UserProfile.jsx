import React, { useRef } from "react";
import {useSelector}  from "react-redux"
import axios from "axios"
export default function UserProfile() {

   
  const userIdRef = useRef();
  const fullNameRef = useRef();
  // console.log(fullNameRef.current)
  const phoneRef = useRef();
  const dobRef = useRef();
  const genderRef = useRef();
  const bioRef = useRef();
  const roleRef = useRef();
  const statusRef = useRef();
  const profilePictureRef = useRef();

    let data = useSelector((store)=>store.user)
    console.log(data.user[0]._id)
    console.log(data.user[0].profile)



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
    userId : data.user[0]._id,
     fullName:fullNameRef.current.value, 
     phone: phoneRef.current.value,
      dateOfBirth:dobRef.current.value,
       gender :genderRef.current.value,
        bio:bioRef.current.value,
          } 

    // formData.append("sdf","sdf")
    // formData.append("userId", data.user[0]._id);
    // formData.append("fullName", fullNameRef.current.value);
    // formData.append("phone", phoneRef.current.value);
    // formData.append("dateOfBirth", dobRef.current.value);
    // formData.append("gender", genderRef.current.value);
    // formData.append("bio", bioRef.current.value);
    
    
    // formData.append("status", statusRef.current.value);
  
    console.log(formData)
let API_URL = import.meta.env.VITE_API_URL
    try {
      const res = await  axios.post(API_URL+"/auth/profile",formData)

      // const result = await res.json();
alert(res.message)
      // if (res.ok) {
      //   alert("✅ Profile created successfully!");
      //   e.target.reset(); // clear form
      //   console.log(result);
      // } else {
      //   alert("❌ Error: " + result.message);
      // }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to create profile.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">Create User Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            ref={fullNameRef}
            value={ (data.user[0].profile)?(data.user[0].profile.fullName):""}
            required
            className="w-full border rounded-md p-2"
            placeholder="Enter full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            ref={phoneRef}
            className="w-full border rounded-md p-2"
            placeholder="Enter phone number"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            ref={dobRef}
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium">Gender</label>
          <select ref={genderRef} className="w-full border rounded-md p-2">
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            ref={bioRef}
            rows="3"
            maxLength="500"
            className="w-full border rounded-md p-2"
            placeholder="Write a short bio..."
          ></textarea>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select ref={roleRef} required className="w-full border rounded-md p-2">
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium">Status</label>
          <select ref={statusRef} className="w-full border rounded-md p-2">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium">Profile Picture</label>
          <input
            type="file"
            ref={profilePictureRef}
            accept="image/*"
            className="w-full border rounded-md p-2"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
