import React,{ Component } from "react";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import "../css/general-style.css"
export default class Lobby extends Component{
    render(){
        return(
            <div>
                <Menu/>
                <div className="container-fluid generalContainer"></div>
                <Footer/>
            </div>
        )
    }
}