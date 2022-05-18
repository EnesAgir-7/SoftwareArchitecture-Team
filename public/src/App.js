import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/login'
import Register from './pages/register'

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/register" element= {<Register/>}/>
                <Route path="/login" element= {<Login/>}/>
                <Route path="/" element= {<Chat/>}/>
            </Routes>
        </BrowserRouter>
    )
}
