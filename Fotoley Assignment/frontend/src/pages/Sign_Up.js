import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Sign_Up() {
  let data = { name: "", email: "", password: "", cpassword: "" }
  const [input, setInput] = useState(data)
  const [flag, setflag] = useState(false)
  useEffect(() => {
    console.log('Logged-In')
  }, [flag])
  function handleData(e) {
    setInput((input) => {
      const updatedData = { ...input, [e.target.name]: e.target.value }
      console.log(updatedData)
      return updatedData
    })
  }

  async function PostData(e) {
    e.preventDefault();
    const { name, email, password, cpassword } = input;
    if (!name || !email || !password || !cpassword) {

      return alert('All fields are Mandatory')

    } else {
      setflag(true)
    }


    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(input)
    });

    const data = await res.json()
    if (res.status === 400 || !data) {
      return alert(`${data.message}`)

    } else {
      gotoLogin()
      return alert(`${data.message}`)
    }
  }
  let navigate = useNavigate()
  function gotoLogin() {
    navigate('/Login')
  }
  return (
    <>
      <div className='body'>
        <div className='body-left'>
          <h5 className='welcome'>welcome to PicScore</h5>
          <p className='up-para'>where we get valuable feedback on our images  to improve our skills</p>
          <input className='name' type='text' name='name' placeholder='Name' value={input.name} onChange={handleData} />
          <input className='email' type='email' name='email' placeholder='email' value={input.email} onChange={handleData} />
          <input className='password' type='password' name='password' placeholder='Password' value={input.password} onChange={handleData} />
          <input className='cpassword' type='password' name='cpassword' placeholder='Confirm Password' value={input.cpassword} onChange={handleData} />
          <p className='down-para'>by continuing you agree to the PicScore terms and conditions, reward policy and privacy policy</p>
          <button className='button' onClick={PostData}> signUp</button>
          <p className='already'>already have an account?  </p>
          <button className='loginbtn' onClick={gotoLogin}>
            Login
          </button>
        </div>
        <div className='body-right'>
        </div>

      </div>
    </>
  )
}

export default Sign_Up