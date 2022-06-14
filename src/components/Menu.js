import React, { Component } from 'react'
import "../css/menu-style.css"
import "../css/general-style.css"
import { AiOutlineSetting } from "react-icons/ai";
import { AiFillCaretDown, AiOutlineReconciliation, AiOutlineClockCircle, AiOutlineHome, AiOutlineUser, AiOutlineLogout, AiFillCloseCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';
import CycleInvetory from '../pages/CycleInvetory';
import ReactDOM from 'react-dom';

export class Menu extends Component {

    showCylceInventory(){
        ReactDOM.render(
            <CycleInvetory/>,
            document.getElementById('actualPage')
          )
    }

    componentDidMount(){
        this.showCylceInventory();
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
                                <Link className="navbar-brand" to='/home'>
                                    <img src='/assets/logo_hyperline.png' alt='Company' />
                                </Link>
                            </div>
                        </div>
                        <div className='row text-light'>
                            <div className='col'>
                                <div className="nav-item dropdown dissapearObject">
                                    <Link className="nav-link text-light" to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <AiOutlineUser className='h3' /> Hi New User <AiFillCaretDown />
                                    </Link>
                                    <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                        <li><Link className="dropdown-item text-light h5" to="/#"><AiOutlineSetting /> User Data</Link></li>
                                        <li><Link className="dropdown-item text-light h5" to="/login"><AiOutlineLogout /> Logout</Link></li>

                                    </ul>
                                </div>
                                <div className=''>
                                    <Link className="nav-link text-light appearMovileObject" to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasUser" aria-controls="offcanvasNavbar">
                                        <AiOutlineUser className='h2' />
                                    </Link>
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
                                        <Link className="nav-link active" aria-current="page" to="/#">Home <AiOutlineHome /></Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link " to="/#" id="offcanvasNavbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Inventory Options <AiOutlineReconciliation /> <AiFillCaretDown />
                                        </Link>
                                        <ul className="dropdown-menu dropDownMenu" aria-labelledby="offcanvasNavbarDropdown">
                                            <li onClick={()=>this.showCylceInventory()}><Link className="dropdown-item text-light" to="/#"  data-bs-dismiss="offcanvas">Cycle Inventory <AiOutlineClockCircle /></Link></li>
                                            <li><Link className="dropdown-item text-light" to="/#">Another action</Link></li>
                                            <li><Link className="dropdown-item text-light" to="/#">Another action</Link></li>
                                            <li><Link className="dropdown-item text-light" to="/#">Another action</Link></li>
                                        </ul>
                                    </li>

                                </ul>

                            </div>
                        </div>

                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasUser" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header lateralMenu">
                                <h4 className="offcanvas-title" id="offcanvasNavbarLabel">Hi New User</h4>
                                <button type="button" className="text-reset especialButtonClose" data-bs-dismiss="offcanvas" aria-label="Close"><AiFillCloseCircle /></button>
                            </div>
                            <div className="offcanvas-body lateralMenu">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/#"><AiOutlineSetting /> User Data</Link>
                                        <Link className="nav-link active" aria-current="page" to="/#"><AiOutlineLogout /> Logout</Link>
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