
import Lobby from "../pages/Lobby"
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
                <div className="CompanyDashBoard">
                    <CompanyDashBoard />
                </div>

                <div className="GeneralPages">
                    <Menu/>
                    <div className="container-fluid generalContainer" id="actualPage">

                        <div className="Lobby">
                            <Lobby />
                        </div>

                        <div className="CycleInventory">
                            <CycleInventory />
                        </div>
                        <div className="CycleInventoryGraph">
                            <CycleInvetoryGraph/>
                        </div>

                        <div className="KPIGraph">
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



