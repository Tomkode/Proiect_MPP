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

function App({entities, viewState, rowClicked}) {
  // -------------- The state with the table entries
  
  
  return (
    <CenteredContainer>
    <h1> Nutritional Information</h1>
    <Link to = "/dessert/add"><AddButton> Add Entity</AddButton></Link>
    <DenseTable state = {entities} view = {viewState} rowClicked = {rowClicked}></DenseTable>
    </CenteredContainer>
  )
}

export default App;
