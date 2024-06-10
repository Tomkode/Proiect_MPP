import { StyledBox } from "./StyledView";
import { AddButton } from "./AddButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
export const Login = ({token, setToken}) => {
    let navigate = useNavigate();
    const loginUser = () => {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        fetch('http://localhost:5123/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password}),
        })
        .then( (response) => response.text())
        .then(data => {console.log(data)
            // data = JSON.parse(data)
            if(data.length >= 1) // if the user has logged in
                {
                    let tkn = CryptoJS.lib.WordArray.random(16).toString()
                    console.log("tkn: " + tkn)
                    setToken(tkn)
                    Cookies.set("token", tkn, {expires: 1})
                    data = JSON.parse(data)
                    console.log("id given: " + data[0])
                    Cookies.set("id", data[0], {expires: 1})
                    // console.log(token)
                    navigate("/desserts")
                }
            else
                alert("Invalid username or password!")
        })
        .catch(error => console.log(error))
    };
    if(Cookies.get("token") != undefined)
        return (<>Already Logged In!</>)
    return (
        <StyledBox>
            <h1>Login</h1>
            {/* <form> */}
                <input type="text" id="username" name="username" placeholder="Username"></input>
                <br></br>
                <input type="password" id="password" name="password" placeholder="Password"></input>
                <br></br>
                <AddButton onClick = {loginUser}>Login</AddButton>
                <Link to = "/register"><AddButton>Register</AddButton></Link>
            {/* </form> */}
        </StyledBox>
    )
}