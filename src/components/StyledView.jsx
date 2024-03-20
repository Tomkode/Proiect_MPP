import {styled} from "styled-components"
import DeleteButton from "./DeleteButton"
import { useNavigate } from "react-router-dom"
export const StyledView = ({view, closeButton, deleteButton}) => {
    const navigate = useNavigate();
    if(view.name == "" && view.calories == -1 && view.fat == -1 && view.protein == -1 && view.carbs == -1)
        return ( <></>)
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
            closeButton();
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

