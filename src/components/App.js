

import React, { Component } from "react"
import CompanyDashBoard from "../pages/CompanyDashBoard"
import {Menu} from "../components/Menu"
import Footer from "../components/Footer"
import CycleInventory from "../pages/CycleInvetory"
import CycleInvetoryGraph from "../pages/CycleInventoryGraph"
import KPI from "../pages/KPI"
import Inventory from "../pages/Inventory"
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
                        <div id="CycleInventoryGraph" className="page">
                            <CycleInvetoryGraph/>
                        </div>

                        <div id="KPIGraph" className="page">
                            <KPI/>
                        </div>

                        <div className="Inventory">
                            <Inventory/>
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}



