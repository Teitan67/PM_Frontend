import React, { Component } from 'react'
import "../css/menu-style.css"
import "../css/general-style.css"
import { AiOutlineSetting } from "react-icons/ai";
import { AiFillCaretDown, AiOutlineReconciliation, AiOutlineClockCircle, AiOutlineHome, AiOutlineUser, AiOutlineLogout, AiFillCloseCircle, AiOutlineAreaChart, AiTwotoneSnippets,AiFillDropboxSquare } from "react-icons/ai";
import { BiCartAlt } from "react-icons/bi";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { getValueCookie } from '../services/cookieService';
import { CloseCompanySession, OpenCycleInventory, OpenCycleInventoryGraph, OpenInventory,OpenPikingSystem, OpenKPIGraph, OpenLobby,OpenPurchaseOrder } from '../functions/pagesFunction';
import { closeSession } from '../functions/closeSession';
import { BiExit } from "react-icons/bi";
import {BsBoxSeam} from "react-icons/bs"
import { getInformationWithData } from '../services/CABE';


export class Menu extends Component {

    state = {
        General: {
            directoryLogo: getValueCookie('CompanyLogo'),
            companyId: getValueCookie('CompanyId'),
            typeUser: getValueCookie('TypeUser'),
            enableModles:[],
            needModlesCharge:true
        },
        Modules:{
            ProductInfo:true,
            CycleInventory:true,
            KPI:true,
            ReportGraphs:true
        }

        
    }

    componentDidMount() {

    }

    async AssignModules() {
        const data = {
            typeUser: this.state.General.typeUser,
            companyId: this.state.General.companyId
        }
        const response = await getInformationWithData('/company/Modules', data)
        
        if (response.status.code === 1) {
            const temporal=this.state.General
            temporal.enableModles=response.data
            this.setState({General:temporal})
        }

    }

    async AssignStatesModules(){
        if(this.state.General.needModlesCharge){
            const temporal=this.state.General
            temporal.needModlesCharge=false
            const modules=this.state.Modules
            await this.AssignModules()
            
            for (const element of this.state.General.enableModles) {
                
                switch(element.name){
                    case 'Cycle Inventory':
                        modules.CycleInventory=false
                        break;
                    case 'KPI':
                        modules.KPI=false;
                        break
                    case 'Reports Graphs':
                        modules.ReportGraphs=false;
                        break
                    case 'Product Information':
                        modules.ProductInfo=false;
                        break
                    default:
                        break;
                }
            }
            this.setState({General:temporal,Modules:modules})

        }

        
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar justify-content-start navbar-dark text-light lateralMenu fixed-top p-5 ">
                    <div className="container-fluid">
                        <div className='row align-items-start'>
                            <div className='col'>
                                <button onClick={()=>this.AssignStatesModules()} className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                            <div className='col'>
                                <a className="navbar-brand" href='/#' onClick={() => OpenLobby()}>
                                    <img src={this.state.General.directoryLogo} alt='Company' />
                                </a>
                            </div>
                        </div>
                        <div className='row text-light'>
                            <div className='col'>
                                <div className="nav-item dropdown dissapearObject">
                                    <a className="nav-link text-light" href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <AiOutlineUser className='h3' /> Hi {getValueCookie('name')} {getValueCookie('surname')} <AiFillCaretDown />
                                    </a>
                                    <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li><a className="dropdown-item text-light h5" onClick={() => OpenLobby()} href="/#"><AiOutlineSetting /> User Data</a></li>
                                        <li><a className="dropdown-item text-light h5" onClick={() => closeSession()} href="/#"><AiOutlineLogout /> Logout</a></li>

                                    </ul>
                                </div>
                                <div className=''>
                                    <a className="nav-link text-light appearMovileObject" href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasUser" aria-controls="offcanvasNavbar">
                                        <AiOutlineUser className='h2' />
                                    </a>
                                </div>
                            </div>

                        </div>


                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header lateralMenu">
                                <h4 className="offcanvas-title" id="offcanvasNavbarLabel">Menu Options</h4>
                                <button type="button" className="text-reset especialButtonClose" data-bs-dismiss="offcanvas" aria-label="Close"><AiFillCloseCircle /></button>
                            </div>
                            <div className="offcanvas-body lateralMenu">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/#" data-bs-dismiss="offcanvas" onClick={() => OpenLobby()}>Home <AiOutlineHome /></a>
                                    </li>
                                    <li hidden={(this.state.Modules.ProductInfo&&this.state.Modules.CycleInventory)?true:false} className="nav-item dropdown">
                                        <a className="nav-link " href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Inventory management <AiOutlineReconciliation /> <AiFillCaretDown />
                                        </a>
                                        <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li hidden={this.state.Modules.ProductInfo} onClick={() => OpenInventory()}><a className="dropdown-item text-light" href="/#" data-bs-dismiss="offcanvas">Products Information <BiCartAlt /></a></li>
                                            <li hidden={this.state.Modules.CycleInventory} onClick={() => OpenCycleInventory()}><a className="dropdown-item text-light" href="/#" data-bs-dismiss="offcanvas">Cyclical Inventory <AiOutlineClockCircle /></a></li>
                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <a className="nav-link " href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Warehouse management <TbBuildingWarehouse /> <AiFillCaretDown />
                                        </a>
                                        <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li  onClick={() => OpenPikingSystem()}><a className="dropdown-item text-light" href="/#" data-bs-dismiss="offcanvas">Piking System<FaClipboardList /></a></li>
                                        </ul>
                                    </li>
                                    <li hidden={(this.state.Modules.ProductInfo&&this.state.Modules.CycleInventory)?true:false} className="nav-item dropdown">
                                        <a className="nav-link " href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Purchase Order <AiFillDropboxSquare /> <AiFillCaretDown />
                                        </a>
                                        <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li hidden={this.state.Modules.ProductInfo} onClick={() => OpenPurchaseOrder()}><a className="dropdown-item text-light" href="/#" data-bs-dismiss="offcanvas">Purchase Order <BsBoxSeam /></a></li>
                                        </ul>
                                    </li>

                                    <li hidden={(this.state.Modules.ReportGraphs&&this.state.Modules.KPI)?true:false} className="nav-item dropdown">
                                        <a className="nav-link " href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Reports <AiOutlineAreaChart /> <AiFillCaretDown />
                                        </a>
                                        <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li hidden={this.state.Modules.ReportGraphs}  onClick={() => OpenCycleInventoryGraph()}><a className="dropdown-item text-light" href="/#" data-bs-dismiss="offcanvas">Cyclical Inventory <AiOutlineClockCircle /></a></li>
                                            <li hidden={this.state.Modules.KPI} onClick={() => OpenKPIGraph()}><a className="dropdown-item text-light" href="/#" data-bs-dismiss="offcanvas">KPI (Key Performance Indicators) <AiTwotoneSnippets /></a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/#" data-bs-dismiss="offcanvas" onClick={() => CloseCompanySession()}>Close Company Session <BiExit /></a>
                                    </li>
                                </ul>

                            </div>
                        </div>

                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasUser" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header lateralMenu">
                                <h4 className="offcanvas-title" id="offcanvasNavbarLabel">Hi {getValueCookie('name')} {getValueCookie('surname')}</h4>
                                <button type="button" className="text-reset especialButtonClose" data-bs-dismiss="offcanvas" aria-label="Close"><AiFillCloseCircle /></button>
                            </div>
                            <div className="offcanvas-body lateralMenu">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/#" onClick={() => OpenLobby()}><AiOutlineSetting /> User Data</a>
                                        <a className="nav-link active" aria-current="page" href="/#" onClick={() => closeSession()}><AiOutlineLogout /> Logout</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </nav>
                <div className='filling'></div>
            </React.Fragment>
        )
    }
}