
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

                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}



