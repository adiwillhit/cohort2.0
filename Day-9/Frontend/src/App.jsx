import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// we will import axios for calling the api request 
import axios from "axios" 

function App() {

  const [notes, setNotes] = useState([
    
    //here we have one notes array in which we have the object 

    // here lets create some dummy data 
    {

    title : "title 1",
    description : "test description 1 ",
},
    {

    title : " title 2",
    description : "test description  2",
},
    {

    title : " title 3",
    description : "test description 3",
},
    {

    title : " title 4",
    description : "test description 4",
},


])

  // here we will call the api request using axios
  // here thsi api call is inside the react components
  // we will use the useeffect to prevent the infinte calls 
  // useEffect(()=>{ // NOTE: this is for the more optimisation part
    
    axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
      console.log(res.data.notes);// we will first find the notes then we will save the notes in the notes variable in 
      // and then call that notes in the map 
      setNotes(res.data.notes);
    })
  // },[])// this will make run the ui just once  
 

  return (
    <>

    <div className="notes">
      {
        notes.map((note,index)=>{
          return  <div className="note" key={index}>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
      </div>
        })
      }
    </div>
    
    
    </>
   
  )
}

export default App
