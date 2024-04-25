import { useState , useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DenseTable from './components/DenseTable'
import {StyledView} from './components/StyledView'
import './App.css'
import './index.css'
import CenteredContainer from './components/CenteredContainer'
import { AddButton } from './components/AddButton'
import {Link} from 'react-router-dom'
import { PieChart } from '@mui/x-charts/PieChart';
import { legendClasses } from '@mui/x-charts'
import {io} from 'socket.io-client'
const socket = io('http://localhost:5123', {
  transports: ['websocket'],
  autoConnect: false
})
socket.open()
function App({entities, selectedEntity, setSelectedEntity, setEntities, increasePage, decreasePage, pageState, updateItemsPerPage}) {
  // -------------- The state with the table entries
  //console.log(pageState)
  const [generating, setGenerating] = useState(false)
  
  let url = 'http://localhost:5123/desserts'
  if(selectedEntity === 'restaurant'){
    url = 'http://localhost:5123/restaurants'
  }
  useEffect( () => {
    async function f(){
      await fetch(url)
      
      .then((response) => {
        console.log(response.body)
        return response.json()})
      .then( (data) => {
        setEntities(data)
      
      })
      .catch((error) => {alert("A server error occured")})
    }
    f();
  }, [])
  useEffect(() => {
    
    socket.on("generated", () => {
      fetch('http://localhost:5123/desserts')
      .then((response) => response.json())
      .then( (data) => {
        
        setEntities(data)
        
      })
      .catch((error) => {alert("A server error occured")})
    })
  }, []);
  // socket.emit("asd");
  const toggleGeneration = () => {
    if(generating == true){
      socket.emit("stopgenerating")
    }else{
      socket.emit("startgenerating")
    }
    setGenerating(!generating)
  }
  let chartData = []
  if( selectedEntity === 'dessert'){
  for(let i = 0; i < entities.length; i++){
    chartData.push({
      id: i,
      value: entities[i].calories,
      label: entities[i].name
    
    })
  }
}
  else {
    for(let i = 0; i < entities.length; i++){
      chartData.push({
        id: i,
        value: entities[i].housingSpace,
        label: entities[i].name
      
      })
    }
  }

  const toggleEntity = async () => {
    if(selectedEntity === 'dessert'){
      setSelectedEntity('restaurant')
      await fetch('http://localhost:5123/restaurants')
      .then((response) => response.json())
      .then( (data) => {
        setEntities(data)
        
      })
      .catch((error) => {alert("A server error occured")})
    }else{
      setSelectedEntity('dessert')
      await fetch('http://localhost:5123/desserts')
      .then((response) => response.json())
      .then( (data) => {
        setEntities(data)
        
      })
      .catch((error) => {alert("A server error occured")})
    }
  }
  return (
    <CenteredContainer>
    <h1> Nutritional Information</h1>
    <AddButton onClick = {toggleEntity}> Switch Entity</AddButton>
    <br></br>
    <Link to = "/dessert/add"><AddButton> Add Entity</AddButton></Link>
    <DenseTable state = {entities} selectedEntity = {selectedEntity}  pageState = {pageState}></DenseTable>
    <p> Current page : {pageState.currentPage}</p>
    <AddButton onClick = {decreasePage}>Previous Page</AddButton>
    <AddButton onClick = {increasePage} >Next Page</AddButton>
    <br></br>
    Items per Page:
    <br></br> 
    <input type="number" id="itemsPerPage" onChange ={updateItemsPerPage} defaultValue = {pageState.itemsPerPage} ></input>
    <br></br>
    <AddButton onClick={toggleGeneration}>Generation: { generating === true? 'ON' : 'OFF'}</AddButton>
    <PieChart
  series={[
    {
      data: chartData,
    },
  ]}
  
  width={400}
  height={200}
  margin = {{right: 50, left: 50}}
  slotProps = {
    {
      legend: {
        hidden: true,
      }
    }
  
  }
/>
    </CenteredContainer>
  )
}

export default App;
