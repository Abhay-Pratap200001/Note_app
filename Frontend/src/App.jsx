import React from 'react'
import { Route, Routes } from 'react-router'
import { HomePage } from './pages/HomePage'
import NoteDetails from './pages/NoteDetails'
import CreatePage from './pages/CreatePage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="forest">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/note/:id' element={<NoteDetails/>}/>
      </Routes>
    </div>
  )
}

export default App