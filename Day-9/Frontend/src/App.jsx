import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// we will import axios for calling the api request 
import axios from "axios" 

function App() {

  const [notes, setNotes] = useState([])

  // we will create one fucntion which will call the fuction 
  function fetchNotes(){
     
    axios.get('http://localhost:3000/api/notes')
    .then((res)=>{
      console.log(res.data.notes);// we will first find the notes then we will save the notes in the notes variable in 
      // and then call that notes in the map 
      setNotes(res.data.notes);
    })

  }

  // here we will call the api request using axios
  // here thsi api call is inside the react components
  // we will use the useeffect to prevent the infinte calls 
  useEffect(()=>{ // NOTE: this is for the more optimisation part
    fetchNotes();// here we will call the function 
  },[])// this will make run the ui just once  
 
  function handleSubmit(e){
    // objective: prevent the auto reload
    // then extract the data of title and description 

    e.preventDefault();
    const {title,description} = e.target.elements;

    console.log(title.value, description.value); 
    
    // now we will create this input from the frontend to the backedn 

    axios.post("http://localhost:3000/api/notes",{
      // this the data i want to send 
      title:title.value,
      description:description.value
    }).then(res=>{
      console.log(res.data);
      // now as soon as the notes is created then we will call the function fetchnotes to get the note
      fetchNotes();
    })

    // we will create one delete function 

    
  }

  function handleDeleteNote(noteId){
    // here we will delete the notes
    // so to delete any notes we need to get the id of that notes first
    
    //here we will console the noteid 
    console.log(noteId);
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(res=>{
      console.log(res.data);
      //also we will call the fetchnote fucntion 
      fetchNotes();
    }
    )
  }

  return (
    <>

    {/* now here we will create one form which will have the notes  */}

    <form className='note-create-form' onSubmit={handleSubmit}>
      <input type="text" placeholder='Enter title' name="title" id="" />
      <input type="text" placeholder='Enter description' name="description" id="" />
      <button>Create note</button>
    </form>

    <div className="notes">
      {
        notes.map((note,index)=>{
          return  <div className="note" key={index}>
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button onClick={()=>{handleDeleteNote(note._id)}}>Delete</button>
      </div>
        })
      }
    </div>
    
    
    </>
   
  )
}

export default App
