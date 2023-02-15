import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {

  let data = { email: "", password: "" }

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
  // Event-Handler for validation and Login 
  async function PostData(e) {
    e.preventDefault();
    const { email, password } = input;
    if (!email || !password) {

      return alert('All fields are Mandatory')

    } else {
      setflag(true)
    }

    //connection of frontend with Backend
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(input)
    });

    // response from backend side with validation or successfull responses
    const data = await res.json()
    console.log(data)
    if (res.status === 400 || !data) {
      return alert(`${data.message}`)

    } else {
      gotoCommunity()
      return alert(`${data.message}`)
    }
  }

  // navigate hook used to navigate to desired pages

  let navigate = useNavigate()
  function gotoSignup() {
    navigate('/')
  }
  function gotoCommunity() {
    navigate('/community')
  }
  return (
    <>
      <div className='body'>
        <div className='body-left'>
          <h5 className='welcome'>welcome Back to PicScore</h5>
          <p className='up-para'>where we get valuable feedback on our images  to improve our skills</p>
          <input className='email' type='email' name='email' placeholder='email' value={input.email} onChange={handleData} />
          <input className='password' type='password' name='password' placeholder='Password' value={input.password} onChange={handleData} />
          <input className='tick-mark' type="checkbox" />
          <p className='Rem'>Remember Me</p>
          <span className='Forget'> Forgot Password?</span>
          <button className='button' onClick={PostData}> Login</button>
          <p className='already'>don't have an account?  </p>
          <button className='loginbtn' onClick={gotoSignup}>
            Sign_Up here
          </button>
        </div>
        <div className='body-right'>
        </div>

      </div>
    </>
  )
}

export default Login