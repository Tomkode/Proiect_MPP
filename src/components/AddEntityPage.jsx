import {styled} from "styled-components";
import { StyledBox } from "./StyledView";
import { AddButton } from "./AddButton";
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
// import { update } from "../viewSlice";


const SubmitButton = styled(AddButton)`
    color: #242424;
`
const AlignDiv = styled.div`
    display:flex;
`
const AddEntityPage = ({updateNewEntity, newEntity}) => { // submitbuttonclicked here
    const submitButtonClicked = () => {
        let name = newEntity.name;
        let calories = newEntity.calories;
        let fat = newEntity.fat;
        let carbs = newEntity.carbs;
        let protein = newEntity.protein;

        //console.log({name: name, calories: calories, fat: fat, carbs: carbs, protein: protein});
        const dessert = {name: name, calories: calories, fat: fat, carbs: carbs, protein: protein};
        fetch('http://localhost:5123/dessert/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dessert),
        })
        .then( (response) => response.text())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    }
    return (
        <StyledBox width = {50} height = {80} >
            <h1 align = "center">Add a new entity</h1>
            <div style = {{textAlign: 'center'}}>
            <form>
                <input type="text" id="name" name="name" placeholder="Name" onChange ={updateNewEntity} ></input>
                <br></br>
                
                <input type="number" id="calories" name="calories" placeholder="Calories" onChange ={updateNewEntity}></input>
                <br></br>
                
                <input type="number" id="fat" name="fat" placeholder="Fat" onChange ={updateNewEntity}></input>
                <br></br>
               
                <input type="number" id="carbs" name="carbs" placeholder="Carbs" onChange ={updateNewEntity}></input>
                <br></br>
            
                <input type="number" id="protein" name="protein" placeholder="Protein" onChange ={updateNewEntity}></input>
                <br></br>
                <Link to = "/desserts"><SubmitButton type="submit" onClick = {submitButtonClicked}>Submit</SubmitButton></Link>
            </form>
            </div>
        </StyledBox>
    )
}

export default AddEntityPage;