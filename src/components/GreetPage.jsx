import {styled} from "styled-components"
import {Link} from 'react-router-dom'

export const LinkButton = styled.button`
    background-color: white;
    transition: 1s;
    box-sizing: border-box;
    width: 25%;
    self-align: center;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    font-size: 1.25rem;
    border-radius: 24px;
    cursor: pointer;
    color: #242424;
    outline: none;
    border: none;
    height: 5vh;
    &:hover{
        transition: 1s;
        width: 30%;
        height: 6.5vh;
    }
`

export const GreetPage = () => {
    return (
        <>
            <h1 align = 'top'> Welcome to my application! </h1>
            <Link to = '/desserts'> <LinkButton> View Entities </LinkButton> </Link>
        </>
    );
}
