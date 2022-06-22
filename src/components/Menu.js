import React, { Component } from 'react'
import "../css/menu-style.css"
import "../css/general-style.css"
import { AiOutlineSetting } from "react-icons/ai";
import { AiFillCaretDown, AiOutlineReconciliation, AiOutlineClockCircle, AiOutlineHome, AiOutlineUser, AiOutlineLogout, AiFillCloseCircle } from "react-icons/ai";
import { getValueCookie } from '../services/cookieService';
import { OpenCycleInventory,OpenLobby } from '../functions/pagesFunction';


export class Menu extends Component {

   

    componentDidMount(){
       // this.showCylceInventory();
    }

    render() {
        return (
            <React.Fragment>
                <nav className="navbar justify-content-start navbar-dark text-light lateralMenu fixed-top p-5 ">
                    <div className="container-fluid">
                        <div className='row align-items-start'>
                            <div className='col'>
                                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            </div>
                            <div className='col'>
                                <a className="navbar-brand" href='/home'>
                                    <img src='/assets/logo_hyperline.png' alt='Company' />
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
                                        <li><a className="dropdown-item text-light h5" href="/#"><AiOutlineSetting /> User Data</a></li>
                                        <li><a className="dropdown-item text-light h5" href="/#"><AiOutlineLogout /> Logout</a></li>

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
                                        <a className="nav-link active" aria-current="page" href="/#" data-bs-dismiss="offcanvas" onClick={()=>OpenLobby()}>Home <AiOutlineHome /></a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link " href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Inventory Options <AiOutlineReconciliation /> <AiFillCaretDown />
                                        </a>
                                        <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li onClick={()=>OpenCycleInventory()}><a className="dropdown-item text-light" href="/#"  data-bs-dismiss="offcanvas">Cycle Inventory <AiOutlineClockCircle /></a></li>
                                            <li><a className="dropdown-item text-light" href="/#">Another action</a></li>
                                            <li><a className="dropdown-item text-light" href="/#">Another action</a></li>
                                            <li><a className="dropdown-item text-light" href="/#">Another action</a></li>
                                        </ul>
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
                                        <a className="nav-link active" aria-current="page" href="/#"><AiOutlineSetting /> User Data</a>
                                        <a className="nav-link active" aria-current="page" href="/#"><AiOutlineLogout /> Logout</a>
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