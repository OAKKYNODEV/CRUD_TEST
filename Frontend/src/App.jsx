import './index.css';
import Table from './component/Table'
import './App.css'
import Edit from './component/Edit'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from './component/Create'

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
