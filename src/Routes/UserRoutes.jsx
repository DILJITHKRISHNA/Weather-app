import React from 'react'
import { Route, Routes} from 'react-router-dom'
import HomePage from '../Pages/HomePage'

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
      </Routes>
    </div>
  )
}

export default UserRoutes
