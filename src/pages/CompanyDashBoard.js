import React, { Component } from "react";
import Footer from "../components/Footer";
import { MenuCompany } from "../components/MenuCompanySelect";
import "../css/companyDash-style.css"
export default class CompanyDashBoard extends Component {
    TemporalreDirect(){
        window.location.href="/home"
       }
        
    render() {
        return (
            <div className="companydash">
                <MenuCompany />
                <div className="container-fluid generalContainer" id="actualPage">
                    <div className="title">
                        <p className="text-center display-3">Hello, please select a Company: </p>
                    </div>
                    <div className="container-fluid decoratorBar"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
    
                                <div onClick={()=>this.TemporalreDirect()} className="contCompany">
                                    <div className="titecompany text-center">
                                        <img src="/assets/logo_hyperline.png" alt="logo" />
                                        <p>Hyperline Atlanta<br/> <br/><br/><br/></p>
                                    </div>
                                </div>
                                <div onClick={()=>this.TemporalreDirect()} className="contCompany">
                                    <div className="titecompany text-center">
                                        <img src="/assets/logo_mayaland.png" alt="logo" />
                                        <p>Mayaland Atlanta<br/> <br/><br/><br/></p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }

}