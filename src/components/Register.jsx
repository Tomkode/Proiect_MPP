import { StyledBox } from "./StyledView"
import { AddButton } from "./AddButton"
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
export const Register = () => {
    const navigate = useNavigate();
    const registerUser = () => {
        let username = document.getElementById("username").value
        let password = document.getElementById("password").value
        let repeatPassword = document.getElementById("repeatPassword").value
        let email = document.getElementById("email").value
        let notValid = false;
        if(username == "" || password == "" || repeatPassword == "" || email == "")
            notValid = true;
        if(username.length > 25)
            notValid = true;
        if(password != repeatPassword)
            notValid = true;
        if(email.search("@") == -1)
            notValid = true;
        if(notValid)
        {
            alert("One of the fields is not valid!")
            return ;
        }
        fetch('http://localhost:5123/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password, email: email}),
        })
        .then( (response) => response.text())
        .then(data => {console.log(data)
            if(data == "error")
                alert("Username already exists!");
            else
                navigate("/login")
        })
        .catch(error => console.log(error))
    
    }
    if(Cookies.get("token") != undefined)
        return (<>Already Logged In!</>)
    return (
        <StyledBox>
            <h1>Register</h1>
            {/* <form> */}
                <input type="text" id="username" name="username" placeholder="Username"></input>
                <br></br>
                <input type="password" id="password" name="password" placeholder="Password"></input>
                <br></br>
                <input type="password" id="repeatPassword" name="password" placeholder="Repeat Password"></input>
                <br></br>
                <input type="text" id="email" name="email" placeholder="Email"></input>
                <br></br>
                <AddButton onClick = {registerUser}>Register</AddButton>
                <Link to = "/login"><AddButton>Login</AddButton></Link>
            {/* </form> */}
        </StyledBox>
    )
}