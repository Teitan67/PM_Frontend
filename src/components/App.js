import {Route, Routes } from "react-router-dom"
import Login from "../pages/Login"
import Lobby from "../pages/Lobby"
import React,{ Component } from "react"
import { ProtectedRoute } from "../services/auth/authservices"
import CompanyDashBoard from "../pages/CompanyDashBoard"

export default class App extends Component{
    
    render(){
        return(
            <div className="App">
                
                <Routes>
               <Route exact  path="/login" element={<Login/>}/>
               <Route exact  path="/home" element={<ProtectedRoute><Lobby/></ProtectedRoute>}/>
               <Route path="/companyDashBoard" element={<CompanyDashBoard/>}></Route>
               <Route exact  path="*" element={<Login/>}/>
               </Routes>
               
               
            </div>
        )
    }
}
   


