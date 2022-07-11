import React, { Component } from "react";
import Footer from "../components/Footer";
import { MenuCompany } from "../components/MenuCompanySelect";
import "../css/companyDash-style.css"
import { getInformationWithData } from "../services/CABE";
//import { OpenLobby } from '../functions/pagesFunction';
import { getValueCookie, setNewCookie } from "../services/cookieService";
export default class CompanyDashBoard extends Component {

    state = {
        General: {
            CompanysofUser: []
        }
    }

    async getCompanysAssigned() {
        const data = {
            userName: getValueCookie('userName')
        }
        const info = await getInformationWithData('/company/CatalogueofCompanies', data)
        if (info.status.code === 1) {
            const temporal = this.state.General
            temporal.CompanysofUser = info.data
            this.setState({ General: temporal })
            console.log(info)
        }

    }


    async SelectCompany(company) {
            setNewCookie('Company', company.name , 50)
            setNewCookie('CompanyId',company.idCompany,50)
            setNewCookie('CompanyLogo',company.directoryLogo,50)
            setNewCookie('TypeUser',company.idTypeofUser,50)
            window.location.reload()  
    }

    render() {
        return (
            <div id="companydash" >
                <button hidden id="catalogueOfCompanyActioner" onClick={() => this.getCompanysAssigned()}></button>
                <MenuCompany />
                <div className="container-fluid generalContainer" id="actualPage">
                    <div className="title">
                        <p className="text-center display-3">Hello, please select a Company: </p>
                    </div>
                    <div className="container-fluid decoratorBar"></div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                {
                                    this.state.General.CompanysofUser.map((company, i) => (
                                        <div key={i} className="contCompany" onClick={() => this.SelectCompany(company)}>
                                            <div className="titecompany text-center">
                                                <img src={company.directoryLogo} alt="logo" />
                                                <p>{company.name}<br /> <br /><br /><br /></p>
                                            </div>
                                        </div>
                                    ))
                                }
                                

                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        )
    }

}