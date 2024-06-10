import {styled} from "styled-components";
import { StyledBox } from "./StyledView";
import { AddButton } from "./AddButton";
import {Link} from 'react-router-dom'
import {useEffect} from 'react'
import Cookies from 'js-cookie'
// import { update } from "../viewSlice";


const SubmitButton = styled(AddButton)`
    color: #242424;
`
const AlignDiv = styled.div`
    display:flex;
`
const AddEntityPage = ({selectedEntity, updateNewEntity, newEntity}) => { // submitbuttonclicked here
    const submitButtonClicked = () => {
        let url = 'http://localhost:5123/dessert/add'
        let name = newEntity.name;
        let calories = newEntity.calories;
        let fat = newEntity.fat;
        let carbs = newEntity.carbs;
        let protein = newEntity.protein;
        var entity = {name: name, calories: calories, fat: fat, carbs: carbs, protein: protein};
        if( selectedEntity === 'restaurant'){
            url = 'http://localhost:5123/restaurant/add'
            let name = newEntity.name;
            let address = newEntity.address;
            let rating = newEntity.rating;
            let housingSpace = newEntity.housingSpace;
            let dessertId = newEntity.dessertId;
            var entity = {name: name, address: address, rating: rating, housingSpace: housingSpace, dessertId: dessertId};
        }
        

        //console.log({name: name, calories: calories, fat: fat, carbs: carbs, protein: protein});
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })
        .then( (response) => response.text())
        .then(data => console.log(data))

        .catch(error => console.log(error))
    }
    if(Cookies.get("token") == undefined)
        return (<>You must log in!</>)
    if(selectedEntity == 'dessert')
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
    else
        return (
            <StyledBox width = {50} height = {80} >
                <h1 align = "center">Add a new entity</h1>
                <div style = {{textAlign: 'center'}}>
                <form>
                    <input type="text" id="name" name="name" placeholder="Name" onChange ={updateNewEntity} ></input>
                    <br></br>
                    
                    <input type="number" id="housingSpace" name="housingSpace" placeholder="Housing Space" onChange ={updateNewEntity}></input>
                    <br></br>
                    
                    <input type="number" id="rating" name="rating" placeholder="Rating" onChange ={updateNewEntity}></input>
                    <br></br>
                
                    <input type="text" id="address" name="address" placeholder="Address" onChange ={updateNewEntity}></input>
                    <br></br>
                
                    <input type="number" id="dessertId" name="dessertId" placeholder="Dessert Id" onChange ={updateNewEntity}></input>
                    <br></br>
                    <Link to = "/desserts"><SubmitButton type="submit" onClick = {submitButtonClicked}>Submit</SubmitButton></Link>
                </form>
                </div>
            </StyledBox>
        )
}

export default AddEntityPage;