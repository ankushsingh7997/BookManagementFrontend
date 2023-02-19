import React, { useState } from "react"
import { isValidEmail } from "../validations/validation"
import '../componentcss/Login.css'

export default function Login() {
    const [email,SetEmail]=useState()
    const [password,SetPassword]=useState()
    const[error,SetError]=useState("")
    const[item,setItem]=useState()

async function HandleSubmit(e)
{
e.preventDefault()
 if(!isValidEmail(email))  SetError("enter a valid email")
 else{
  let obj={email,password}
  console.log(obj)
  // await setItem({email:email,password:password})
  console.log(item,"here")//--------------
  let result=await fetch('http://localhost:3001/login'
  ,{

    method:'POST',
    headers:{'Content-Type':"application/json",
    "Accept":'application/json'
  },
  body:JSON.stringify(obj)

  }
  );
    result=await result.json();
    if(!result.status) SetError(result.msg)
    else localStorage.setItem("token",JSON.stringify(result.data))
    console.log(localStorage.getItem("token"))
    

 }
    
}


  return (
    
    <div className="Container">
      <form className="Form">
        <section>
          <label id="email">Email</label>
          <input type={'email'} value={email} onChange={(e)=>{SetEmail(e.target.value.trim())}} ></input>
        </section>
        <section>
          <label>password</label>
          <input type={'password'} value={password} onChange={(e)=>{SetPassword(e.target.value.trim())}}></input>
        </section>
        <section>
        <button onClick={HandleSubmit}>SignIn</button>
        </section>
        <section>
            <div className="error" style={{color:"red"}}>{error} </div>
        </section>
      </form>
    </div>
  );
  
}
