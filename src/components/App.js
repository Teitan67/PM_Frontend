

import React, { Component } from "react"
import CompanyDashBoard from "../pages/CompanyDashBoard"
import {Menu} from "../components/Menu"
import Footer from "../components/Footer"
import CycleInventory from "../pages/CycleInvetory"
import CycleInvetoryGraph from "../pages/CycleInventoryGraph"
import KPI from "../pages/KPI"
import Inventory from "../pages/Inventory"
import Lobby from "../pages/Lobby"
<<<<<<< HEAD
import PikingSystem from "../pages/PikingSystem"
=======
import PurchaseOrder from "../pages/PurchaseOrder"

>>>>>>> add443f94e111c2af1adbdc4820858942ffd7110

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

                        <div id="Lobby" className="page">
                            <Lobby/>
                        </div>

                        <div id="CycleInventory" className="page">
                            <CycleInventory />
                        </div>
                        <div id="CycleInventoryGraph" className="page">
                            <CycleInvetoryGraph/>
                        </div>

                        <div id="KPIGraph" className="page">
                            <KPI/>
                        </div>

                        <div id="Inventory" className='page'>
                            <Inventory/>
                        </div>
                        <div id="PurchaseOrder" className='page'>
                            <PurchaseOrder/>
                        </div>

                        <div id="PikingSystem" className='page'>
                            <PikingSystem/>
                        </div>

                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}



