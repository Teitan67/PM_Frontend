import { Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Lobby from "../pages/Lobby"
import React,{ Component } from "react"
import { ProtectedRoute } from "../services/auth/authservices"

export default class App extends Component{

    render(){
        return(
            <div className="App">
                <Routes>
               <Route path="/login" element={<Login/>}/>
               <Route path="/home" element={<ProtectedRoute><Lobby/></ProtectedRoute>}/>
               <Route path="*" element={<ProtectedRoute><Lobby/></ProtectedRoute>}/>
               </Routes>
            </div>
        )
    }
}
   


