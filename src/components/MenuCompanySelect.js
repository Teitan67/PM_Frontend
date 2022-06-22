import React, { Component } from 'react'
import "../css/menuCompany-style.css"
import "../css/general-style.css"
import { AiOutlineSetting } from "react-icons/ai";
import { AiFillCaretDown, AiOutlineUser, AiOutlineLogout, AiFillCloseCircle } from "react-icons/ai";
import { getValueCookie } from '../services/cookieService';
import { closeSession } from '../functions/closeSession';


export class MenuCompany extends Component {


 
    render() {
        return (
            <React.Fragment>
                <div className='menuCompany'>
                <nav className="navbar justify-content-start navbar-dark text-light lateralMenu fixed-top p-5 ">
                    <div className="container-fluid">
                        <div className='row align-items-start'>
                            <div className='col'>
                               
                            </div>
                            <div className='col'>
                                <a className="navbar-brand" href='/CompanyDashBoard'>
                                    <img src='/assets/logoM.png' alt='Company' />
                                </a>
                            </div>
                        </div>
                        <div className='row text-light'>
                            <div className='col'>
                                <div className="nav-item dropdown dissapearObject">
                                    <a className="nav-link text-light" href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <AiOutlineUser className='h3' />Hi {getValueCookie('name')} {getValueCookie('surname')}<AiFillCaretDown />
                                    </a>
                                    <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li><a className="dropdown-item text-light h5" href="/#"><AiOutlineSetting /> User Data</a></li>
                                        <li><a className="dropdown-item text-light h5" onClick={()=>closeSession()} href="/login"><AiOutlineLogout /> Logout</a></li>

                                    </ul>
                                </div>
                                <div className=''>
                                    <a className="nav-link text-light appearMovileObject" href="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasUser" aria-controls="offcanvasNavbar">
                                        <AiOutlineUser className='h2' />
                                    </a>
                                </div>
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
                                        <a className="nav-link active" aria-current="page" onClick={()=>closeSession()} href="/Login"><AiOutlineLogout /> Logout</a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </nav>
                <div className='filling'></div>
                </div>
            </React.Fragment>
        )
    }
}