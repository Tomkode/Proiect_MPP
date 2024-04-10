import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import {GreetPage} from "./components/GreetPage";
import AddEntityPage from "./components/AddEntityPage";
// import store from './store'
import { Provider } from 'react-redux'
import {useState} from 'react'
import { StyledView } from "./components/StyledView";
import {redirect} from 'react-router-dom'
import { EditPanel } from "./components/EditPanel";
//console.log(initialState)
  const Main = () => {

    
    
  
  const [entities, setEntities] = useState([])
  //console.log(entities)
  const addEntity = (name, calories, fat, carbs, protein) => {
    let entry = createData(name, calories, fat, carbs, protein)
    let newState = [...entities]
    newState.push(entry)
    //console.log(newState)
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
    setEditEntity(selectedObj)
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
    setNewEntity(newNewEntity)
  }
  const deleteButtonClicked = (id) => {
    fetch(`http://localhost:5123/dessert/delete/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json'
      }
      
    })
  }
  const [tablePages, setTablePages] = useState({
    itemsPerPage: 5,
    currentPage: 1
  })
  const nextPage = () => {
    if(tablePages.currentPage * tablePages.itemsPerPage < entities.length){
    let newTablePages = {...tablePages}
    newTablePages.currentPage += 1
    setTablePages(newTablePages)
    }
  }
  const prevPage = () => {
    if(tablePages.currentPage > 1){
    let newTablePages = {...tablePages}
    newTablePages.currentPage -= 1
    setTablePages(newTablePages)
    }
  }
  const updateItemsPerPage = (evt) => {
    let newTablePages = {...tablePages}
    newTablePages.itemsPerPage = evt.currentTarget.value
    newTablePages.currentPage = 1
    setTablePages(newTablePages)
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GreetPage />,
    },
    {
      path: "desserts",
      element: <App updateItemsPerPage = {updateItemsPerPage} viewState={viewState} entities = {entities} setEntities = {setEntities}
      rowClicked = {rowClicked} increasePage={nextPage} decreasePage={prevPage} pageState = {tablePages}/>,
    },
    {
      path: "dessert/add",
      element: <AddEntityPage newEntity = {newEntity} updateNewEntity = {updateNewEntity} /*submitButtonClicked = {submitButtonClicked}*//>,
    },
    {
      path: '/dessert/details/:id',
      element: <StyledView view = {viewState} setView = {setView} deleteButton = {deleteButtonClicked}></StyledView>
    },
    {
      path: '/dessert/edit',
      element: <EditPanel  view = {viewState}  ></EditPanel>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
  }

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
    <Main/>
  //</React.StrictMode>
);
