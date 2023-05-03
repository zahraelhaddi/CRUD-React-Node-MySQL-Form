import './App.css';
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const addStudentToDB = (event) => {
    event.preventDefault(); // prevent default form submission behavior
    axios.post('http://localhost:1111/create', { name, email })
      .then(response =>
        console.log(response)
      )
      .catch(error => console.log(error));
  };

  return (
    <div className='App'>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" className="input-field" value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="input-field" value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <button type="submit" onClick={addStudentToDB}>Submit</button>
      </form>
    </div>
  );
}

export default App;
