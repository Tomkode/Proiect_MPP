import {styled} from "styled-components"
import DeleteButton from "./DeleteButton"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie'
export const StyledView = ({view, setView, deleteButton, selectedEntity}) => {
    const navigate = useNavigate();
    let urlString = window.location.href
    let id = urlString.split("/").pop()
    //console.log(id)
    useEffect( () => {
        fetchData();
    }, [])
    let url = `http://localhost:5123/dessert/details/${id}`
    if(selectedEntity == 'restaurant'){
        url = `http://localhost:5123/restaurant/details/${id}`
    }
    const fetchData = async () => {
        try {
          const response = await fetch(url).catch((error) => {alert("A server error occured")});
          const result = await response.json();
          //console.log(result)
          setView(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      if(Cookies.get("token") == undefined)
    return (<>You must log in!</>)
      if(view.name == "" && view.calories == -1 && view.fat == -1 && view.carbs == -1 && view.protein == -1){
        return <h2>Invalid id</h2>;
      }
      if(selectedEntity == 'dessert')
        return (<StyledBox>
            Name: {view.name}
            <hr></hr>
            Calories: {view.calories} kcal
            <hr></hr>
            Fat: {view.fat}g
            <hr></hr>
            Carbs: {view.carbs}g
            <hr></hr>
            Protein: {view.protein}g
            <hr></hr>
            <DeleteButton onClick = {() => {
                navigate('/desserts')
                }}>Close</DeleteButton>
            <DeleteButton onClick = {() => {
                deleteButton(view.id);
                navigate('/desserts')
            }}>
                Delete entity
            </DeleteButton>
            <DeleteButton onClick = { () => {
                
                navigate('/dessert/edit')
            }}>
                Edit Entity
            </DeleteButton>
        </StyledBox>)
        else
        return (<StyledBox>
            Name: {view.name}
            <hr></hr>
            Housing Space: {view.housingSpace} m^2
            <hr></hr>
            Rating: {view.rating}$
            <hr></hr>
            Address: {view.address}
            <hr></hr>
            <DeleteButton onClick = {() => {
                navigate('/desserts')
                }}>Close</DeleteButton>
            <DeleteButton onClick = {() => {
                deleteButton(view.id);
                navigate('/desserts')
            }}>
                Delete entity
            </DeleteButton>
            <DeleteButton onClick = { () => {
                
                navigate('/restaurant/edit')
            }}>
                Edit Entity
            </DeleteButton>
        </StyledBox>)
}
export const StyledBox = styled.div`
    box-sizing: border-box;
    background-color: white;
    min-width: 400px;
    text-align: left;
    padding: 25px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.87);
    margin-top: 5px;
    
    width: ${props => props.width}vw;
    height: ${props => props.height}vh;
`

