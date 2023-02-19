import '../componentcss/Register.css'
import React, {useState} from 'react'
import { isValidEmail, isValidNo, passwordVal } from "../validations/validation"

export default function Register()
{
    const [title,SetTitle]=useState()
    const[name,SetName]=useState()
    const[phone,SetPhone]=useState()
    const[email,SetEmail]=useState()
    const [password,SetPassword]=useState()
    const[error,SetError]=useState("")
    

    async function handleSubmit()
    {
        
       if(title&&name&&phone&&email&&password)  {

      if(!isValidEmail(email)) SetError("enter a valid email")
      else if(!passwordVal(password)) SetError("enter a valid password")
      else if (!isValidNo(phone))  SetError("enter a valid phone number.")
      else {

        try{
        
        let item={title,name,phone,email,password}
        let dataa=JSON.stringify(item)
        console.log(JSON.stringify(item))//--------------
        let result=await fetch('http://localhost:3001/register'
        ,{
          method:'POST',
          
          headers:{'Content-Type':"application/json",
          "Accept":'application/json'
          
        },
        body:dataa
        }
        )
          result=await result.json();
          if(!result.status) SetError(result.msg)
          console.log(result)
          if(result.status) SetError("registered successfully") 

      }
      catch(error) {console.log(error)}
      
       }
       

       }
       else {
        SetError("please enter all the fields")
       }


    }

    

    return <div>
      <div className="Container">
       <div className="MinContainer">
       <section>
      <label>Title:</label>
      <select value = {title} onChange = {(e)=>SetTitle(e.target.value)}>
      <option>Select</option>
      <option value="Mr">Mr</option>
      <option value="Mrs">Mrs</option>
      <option value="Miss">Miss</option>
      </select>
      </section>
       <section>
        <label >
            name
        </label>
        <input type={'text'}  value={name} onChange={(e)=>{SetName(e.target.value.trim())}} required></input>
       </section>
       <section>
        <label>
            phone
        </label>
        <input type={'number'} value={phone} onChange={(e)=>{SetPhone(e.target.value.trim())}}></input>
       </section>
       <section>
          <label id="email">Email</label>
          <input type="email" value={email} onChange={(e)=>{SetEmail(e.target.value.trim())}} ></input>
        </section>
        <section>
          <label>password</label>
          <input type={'password'} value={password} onChange={(e)=>{SetPassword(e.target.value.trim())}}></input>
        </section>
          {/* <section>
            <label>Address</label>
            <input type={'text'} placeholder="street"></input>
            <input type={'text'} placeholder="city"></input>
            <input type={'number'} placeholder="pincode"></input>
          </section> */}

        <section>
            <button onClick={handleSubmit}>submit</button>
        </section>

        <section>
            <div className="error" style={{color:"red"}}>{error} </div>
        </section>


    
       </div>


      </div>


    </div>
}