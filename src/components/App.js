
import Lobby from "../pages/Lobby"
import React, { Component } from "react"
import CompanyDashBoard from "../pages/CompanyDashBoard"
import {Menu} from "../components/Menu"
import Footer from "../components/Footer"
import CycleInventory from "../pages/CycleInvetory"
import CycleInvetoryGraph from "../pages/CycleInventoryGraph"
import KPI from "../pages/KPI"
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
                        <div className="CycleInventoryGraph">
                            <CycleInvetoryGraph/>
                        </div>

                        <div className="KPIGraph">
                            <KPI/>
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}



