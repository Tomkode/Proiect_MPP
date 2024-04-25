import {styled} from "styled-components"
import DeleteButton from "./DeleteButton"
import { useNavigate } from "react-router-dom"
import { StyledBox } from "./StyledView"
export const EditPanel = ({selectedEntity,view}) => {
    const navigate = useNavigate();
    let edited = view
    const updateEditEntity = (evt) => {
        let field = evt.currentTarget.id;
        edited[field] = evt.currentTarget.value;
      }
      let url = `http://localhost:5123/dessert/edit/${edited.id}`
        if(selectedEntity == 'restaurant'){
            url = `http://localhost:5123/restaurant/edit/${edited.id}`
        }
    const saveButtonClicked = () => {
        // let newEntities = [...entities]
        // let index = newEntities.findIndex((element) => element.id === editEntity.id)
        // console.log(index)
        // newEntities[index] = editEntity
        // setEntities(newEntities)
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edited)
        
    })
    .catch((error) => {alert("A server error occured")})
        //closeButton()
      };
    if(edited.name == "" && edited.calories == -1 && edited.fat == -1 && edited.protein == -1 && edited.carbs == -1)
        return ( <></>)
    if(selectedEntity == 'dessert')
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
                saveButtonClicked();
                navigate('/desserts')
            }}>
                Save
            </DeleteButton>
            
        </StyledBox>)
    else
        return (<StyledBox>
            Name: <input id = "name" type = "text" defaultValue = {edited.name} onChange = {updateEditEntity}></input>
            <hr></hr>
            Housing Space: <input id = "housingSpace" type = "number" defaultValue = {edited.housingSpace} onChange = {updateEditEntity}></input> sqft
            <hr></hr>
            Rating: <input id = "rating" type = "number" defaultValue = {edited.rating} onChange = {updateEditEntity}></input>
            <hr></hr>
            Address: <input id = "address" type = "text" defaultValue = {edited.address} onChange = {updateEditEntity}></input>
            <hr></hr>
            <DeleteButton onClick = {() => {
                navigate('/desserts')
                }}>Go Back</DeleteButton>
            <DeleteButton onClick = {() => {
                saveButtonClicked();
                navigate('/desserts')
            }}>
                Save
            </DeleteButton>
        </StyledBox>)
}


