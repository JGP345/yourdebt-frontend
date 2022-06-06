import React from "react"
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const Navigate = useNavigate()
    const username = React.useRef(null)
    const password = React.useRef(null)
    const handleLogin = (event) => {
        const un = username.current.value
        const pw = password.current.value
        
        props.getToken(un, pw)
        Navigate('/yourdebt')
    }

    return <center>
        <div> 
        <h1>Welcome to YourDebt!</h1>
        <h3> Please Login</h3>
        <h4>Username:</h4>
        <input type="text" name="username" ref={username}/><br></br>
        <h4>Password:</h4>
     <input type="password" name="password" ref={password}/> <br></br>
        <button onClick={handleLogin}>Login</button>
        </div>
        </center>

        
}

export default Login;