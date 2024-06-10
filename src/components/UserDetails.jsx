import { useEffect } from "react";
import { AddButton } from "./AddButton";
import { StyledBox } from "./StyledView";
import { useState } from "react";
import Cookies from 'js-cookie'
import { Link } from "react-router-dom";
export const UserDetails = () => {
    const id = Cookies.get("id")
    const [user, setUser] = useState({})
    const logOut = () => {
        Cookies.remove("token")
        Cookies.remove("id")
    }
    useEffect( () => {
        async function f() {
            await fetch(`http://localhost:5123/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                
            })
            .then( (response) => response.text())
            .then(data => {
                data = JSON.parse(data)
                console.log(data[0])
                
    
                setUser(data[0]);
            })
            .catch(error => console.log(error))
        }
    if(id != undefined)
    {
        f();
    }
}, [])
    if(Cookies.get("token") == undefined)
        return (<>You must log in!</>)
    return (
        <StyledBox>
            Username: {user.username}
            <br></br>
            Email: {user.email}
            <br></br>
            <Link to = "/desserts"> <AddButton>Back</AddButton></Link>
            <br></br>
            <Link to = "/login"><AddButton onClick = {logOut}> Log Out</AddButton></Link>
        </StyledBox>
    );

}