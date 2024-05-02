import { useState } from 'react'
// import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes';

function App() {
  return (
   <div>
    <Router>
      <Routes>
        <Route path='/*' element={<UserRoutes/>}/>
      </Routes>
    </Router>
   </div>
  )
}

export default App
