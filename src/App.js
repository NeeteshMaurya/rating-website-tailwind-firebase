import Header from "./components/Header"
import Cards from "./components/Cards"
import AddMovie from "./components/AddMovie";
import { Routes, Route } from "react-router-dom";
import Detail from "./components/Detail";
import Login from './components/Login'
import Signup from './components/Signup'

import { createContext, useState } from "react";

const Appstate = createContext()


const App = () => {
  
  const[loggedin, setLoggedin] = useState(false)
  const[userName, setUserName] = useState('')
  return (
    <Appstate.Provider value={{loggedin, setLoggedin, userName, setUserName}}>
    <div>
    <Header />
    <Routes >
      <Route path="/add-movies" element={<AddMovie />} />
      <Route path="/" element={<Cards/>}/>
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </div>
    </Appstate.Provider>
  )
}

export default App
export {Appstate}