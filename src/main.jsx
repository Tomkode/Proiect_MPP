import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {GreetPage} from "./components/GreetPage";
import AddEntityPage from "./components/AddEntityPage";
import store from './store'
import { Provider } from 'react-redux'
import { returnEntities } from "./Service";
import {useState} from 'react'
import { createData } from "./Service";
import { StyledView } from "./components/StyledView";
import {redirect} from 'react-router-dom'
import { EditPanel } from "./components/EditPanel";

let initialState = returnEntities();
//console.log(initialState)
  const Main = () => {

    
    
  
  const [entities, setEntities] = useState(initialState)
  //console.log(entities)
  const addEntity = (name, calories, fat, carbs, protein) => {
    // let entry = { 
    //   id: getNextId(),
    //   name : name,
    //    calories : calories,
    //     fat : fat, 
    //     carbs : carbs, 
    //     protein: protein }
    let entry = createData(name, calories, fat, carbs, protein)
    let newState = [...entities]
    newState.push(entry)
    console.log(newState)
    setEntities(newState)
  }
  
  // -------------- The state with the view
  const [viewState, setView] = useState({
    id: -1,
    name: "",
    calories: -1,
    fat: -1,
    carbs: -1,
    protein: -1
  })
  function rowClicked(index){
    let selectedObj = entities[index]
    setView(selectedObj)
    setEditEntity(selectedObj)
  }
  function closeButtonClicked(){
    let emptyView = {
      id: -1,
      name: "",
    calories: -1,
    fat: -1,
    carbs: -1,
    protein: -1
    }
    setView(emptyView)
  }
  const [newEntity, setNewEntity] = useState({
    id: -1,
    name: "",
    calories: -1,
    fat: -1,
    carbs: -1,
    protein: -1
  })
  const updateNewEntity = (evt) => {
    let field = evt.currentTarget.id;
    let newNewEntity = {...newEntity}
    newNewEntity[field] = evt.currentTarget.value;
    console.log(newNewEntity)
    setNewEntity(newNewEntity)
  }
  const submitButtonClicked = () => {
      addEntity(newEntity.name, newEntity.calories, newEntity.fat, newEntity.carbs, newEntity.protein);
  }
  const deleteButtonClicked = (id) => {
    let newEntities = [...entities]
    let index = newEntities.findIndex((element) => element.id === id)
    newEntities.splice(index, 1)
    setEntities(newEntities)
    closeButtonClicked()
  }

  const [editEntity, setEditEntity] = useState({
    id: -1,
    name: "",
    calories: -1,
    fat: -1,
    carbs: -1,
    protein: -1
  });
  const updateEditEntity = (evt) => {
    let field = evt.currentTarget.id;
    let newEditEntity = {...editEntity}
    newEditEntity[field] = evt.currentTarget.value;
    setEditEntity(newEditEntity)
  }
  const saveButtonClicked = () => {
    let newEntities = [...entities]
    let index = newEntities.findIndex((element) => element.id === editEntity.id)
    console.log(index)
    newEntities[index] = editEntity
    setEntities(newEntities)
    closeButtonClicked()
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GreetPage />,
    },
    {
      path: "desserts",
      element: <App viewState={viewState} entities = {entities} rowClicked = {rowClicked} />,
    },
    {
      path: "dessert/add",
      element: <AddEntityPage updateNewEntity = {updateNewEntity} submitButtonClicked = {submitButtonClicked}/>,
    },
    {
      path: '/dessert/details',
      element: <StyledView view = {viewState} closeButton = {closeButtonClicked} deleteButton = {deleteButtonClicked}></StyledView>
    },
    {
      path: '/dessert/edit',
      element: <EditPanel edited = {editEntity} updateEditEntity = {updateEditEntity} closeButton = {closeButtonClicked} saveButton={saveButtonClicked}></EditPanel>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
  }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main/>
  </React.StrictMode>
);
