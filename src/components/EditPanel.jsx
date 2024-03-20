import {styled} from "styled-components"
import DeleteButton from "./DeleteButton"
import { useNavigate } from "react-router-dom"
import { StyledBox } from "./StyledView"
export const EditPanel = ({edited ,closeButton, saveButton, updateEditEntity}) => {
    const navigate = useNavigate();
    if(edited.name == "" && edited.calories == -1 && edited.fat == -1 && edited.protein == -1 && edited.carbs == -1)
        return ( <></>)
    return (<StyledBox>
        Name: <input id = "name" type = "text" defaultValue = {edited.name} onChange = {updateEditEntity}></input>
        <hr></hr>
        Calories: <input id = "calories" type = "number" defaultValue = {edited.calories} onChange = {updateEditEntity}></input> kcal
        <hr></hr>
        Fat: <input id = "fat" type = "number" defaultValue = {edited.fat} onChange = {updateEditEntity}></input>g
        <hr></hr>
        Carbs: <input id = "carbs" type = "number" defaultValue = {edited.carbs} onChange = {updateEditEntity}></input>g
        <hr></hr>
        Protein: <input id = "protein" type = "number" defaultValue = {edited.protein} onChange = {updateEditEntity}></input>g
        <hr></hr>
        <DeleteButton onClick = {() => {
            navigate('/desserts')
            }}>Go Back</DeleteButton>
        <DeleteButton onClick = {() => {
            saveButton();
            navigate('/desserts')
        }}>
            Save
        </DeleteButton>
        
    </StyledBox>)
}


