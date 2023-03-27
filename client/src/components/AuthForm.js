import React from 'react'

export default function AuthForm(props){
  const {
    handleChange, 
    handleSubmit, 
    btnText, 
    errMsg,
    inputs: {
      username, 
      password
    } 
  } = props
  
  return (
    <form onSubmit={handleSubmit}>
      Username:
      <input 
        type="text" 
        value={username} 
        name="username" 
        onChange={handleChange} 
        placeholder="Enter your username"/>
      Password:
      <input 
        type="text" 
        value={password} 
        name="password" 
        onChange={handleChange} 
        placeholder="Enter your password"/>
      <button>{ btnText }</button>
      <p style={{color: "red"}}>{errMsg} </p>
    </form>
  )
}