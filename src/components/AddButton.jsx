import {styled} from "styled-components"
import {Link} from 'react-router-dom'

export const AddButton = styled.button`
    background-color: white;
    box-sizing: border-box;
    transition: 1s;
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
    margin: 5px;
    &:hover{
        background-color: #888888;
        transition: 1s;
    }
`
