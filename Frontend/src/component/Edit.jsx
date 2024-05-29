import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EditData() {
  const { id } = useParams();
  const [data, setData] = useState({
    id: '',
    name: '',
    type: '',
    code: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/showdata/${id}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/updatedata/${id}`, data)
      .then(response => {
        console.log('Data updated successfully!', response.data);
        window.location = '/';
      })
      .catch(error => {
        console.error('There was an error updating the data!', error);
      });
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Edit Data</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name:</label>
          <input type="text" name="name" value={data.name} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Type:</label>
          <input type="text" name="type" value={data.type} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Code:</label>
          <input type="text" name="code" value={data.code} onChange={handleChange} className="border border-gray-400 rounded-md p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
}

export default EditData;
