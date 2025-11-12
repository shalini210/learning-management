import React from 'react'
import { useSelector } from 'react-redux'
export default function UserProfile() {
    let data = useSelector((store)=>store.user)
    console.log(data.user)
  return (
    <div>UserProfile :
        {JSON.stringify(data.user)}
    </div>
  )
}
