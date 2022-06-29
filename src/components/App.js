
import Lobby from "../pages/Lobby"
import React, { Component } from "react"
import CompanyDashBoard from "../pages/CompanyDashBoard"
import {Menu} from "../components/Menu"
import Footer from "../components/Footer"
import CycleInventory from "../pages/CycleInvetory"
export default class App extends Component {
 
    render() {
        return (
            <div>
                <div className="page" id="CompanyDashBoard">
                    <CompanyDashBoard />
                </div>

                <div id="GeneralPages" className="page">
                    <Menu/>
                    <div className="container-fluid generalContainer" id="actualPage">

                        

                        <div id="CycleInventory" className="page">
                            <CycleInventory />
                        </div>
                        <div id="Lobby" className="page ">
                            <Lobby />
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}



