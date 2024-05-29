import { useState } from "react"
import React  from 'react'
import axios from 'axios';


function Create() {

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        code: ''
      });

      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/createdata', formData)
          .then(response => {
            console.log('Data created successfully!');
            window.location = '/';
          })
          .catch(error => {
            console.error('There was an error creating the data!', error);
          });
      };
  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Create Data</h2>
      <form onSubmit={handleSubmit}>
       <div className="mb-4">
        <label>
          Name:
          <input type="text" name="name" className="border border-gray-400 rounded-md p-2 w-full" value={formData.name} onChange={handleChange} />
        </label>
        </div>
        <div className="mb-4">
        <label>
          Type:
          <input type="text" name="type" className="border border-gray-400 rounded-md p-2 w-full" value={formData.type} onChange={handleChange} />
        </label>
        </div>
        <div className="mb-4">
        <label>
          Code:
          <input type="text" name="code" className="border border-gray-400 rounded-md p-2 w-full" value={formData.code} onChange={handleChange} />
        </label>
        </div>
       
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Create</button>
      </form>
    </div>  
  )
}

export default Create