import React, { Component } from 'react'
import "../css/menuCompany-style.css"
import "../css/general-style.css"
import { AiOutlineSetting } from "react-icons/ai";
import { AiFillCaretDown, AiOutlineUser, AiOutlineLogout, AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
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
                                <Link className="navbar-brand" to='/CompanyDashBoard'>
                                    <img src='/assets/logoM.png' alt='Company' />
                                </Link>
                            </div>
                        </div>
                        <div className='row text-light'>
                            <div className='col'>
                                <div className="nav-item dropdown dissapearObject">
                                    <Link className="nav-link text-light" to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <AiOutlineUser className='h3' />Hi {getValueCookie('name')} {getValueCookie('surname')}<AiFillCaretDown />
                                    </Link>
                                    <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li><Link className="dropdown-item text-light h5" to="/#"><AiOutlineSetting /> User Data</Link></li>
                                        <li><Link className="dropdown-item text-light h5" onClick={()=>closeSession()} to="/login"><AiOutlineLogout /> Logout</Link></li>

                                    </ul>
                                </div>
                                <div className=''>
                                    <Link className="nav-link text-light appearMovileObject" to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasUser" aria-controls="offcanvasNavbar">
                                        <AiOutlineUser className='h2' />
                                    </Link>
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
                                        <Link className="nav-link active" aria-current="page" to="/#"><AiOutlineSetting /> User Data</Link>
                                        <Link className="nav-link active" aria-current="page" onClick={()=>closeSession()} to="/Login"><AiOutlineLogout /> Logout</Link>
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