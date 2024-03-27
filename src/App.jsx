import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DenseTable from './components/DenseTable'
import {StyledView} from './components/StyledView'
import {returnEntities} from './Service'
import './App.css'
import './index.css'
import CenteredContainer from './components/CenteredContainer'
import { AddButton } from './components/AddButton'
import {Link} from 'react-router-dom'
import { PieChart } from '@mui/x-charts/PieChart';

function App({entities, viewState, rowClicked, increasePage, decreasePage, pageState, updateItemsPerPage}) {
  // -------------- The state with the table entries
  console.log(pageState)
  let chartData = []
  for(let i = 0; i < entities.length; i++){
    chartData.push({
      id: i,
      value: entities[i].calories,
      label: entities[i].name
    
    })
  }
  return (
    <CenteredContainer>
    <h1> Nutritional Information</h1>
    <Link to = "/dessert/add"><AddButton> Add Entity</AddButton></Link>
    <DenseTable state = {entities} view = {viewState} rowClicked = {rowClicked} pageState = {pageState}></DenseTable>
    <p> Current page : {pageState.currentPage}</p>
    <AddButton onClick = {decreasePage}>Previous Page</AddButton>
    <AddButton onClick = {increasePage} >Next Page</AddButton>
    <br></br>
    Items per Page:
    <br></br> 
    <input type="number" id="itemsPerPage" onChange ={updateItemsPerPage} defaultValue = {pageState.itemsPerPage} ></input>
    <PieChart
  series={[
    {
      data: chartData,
    },
  ]}
  
  width={600}
  height={200}
/>
    </CenteredContainer>
  )
}

export default App;
