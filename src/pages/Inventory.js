import React, { Component } from 'react'
import "../css/inventory-style.css"
import { AiOutlineSearch, AiFillProfile, AiOutlineFileSearch } from "react-icons/ai"
export default class Inventory extends Component {
    render() {
        return (
            <div className='InventoryInfo'>
                <div className='row searchPart'>
                    <div className='col-1'></div>
                    <div className='col-5 pb-5'>
                        <p className='text-start pt-4 pb-2' >Search specific Product:</p>
                        <div className="input-group input-group-lg pb-4">
                            <span className="input-group-text"><AiOutlineSearch /></span>
                            <input type="text" className="form-control" placeholder='Search by BIN, Description, ItemCode' />
                        </div>
                        <div className='text-center'>
                            <button type="button" className="btn  btn-lg w-50 searchProd">Search <AiOutlineFileSearch /></button>
                        </div>

                    </div>
                    <div className='col-5'>
                        <p className='text-start pt-4 pb-2' >See all Catalogue:</p>
                        <div className='text-center'>
                            <button type="button" className="btn catalogueOpen btn-lg w-100">Open Catalogue <AiFillProfile /></button>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row pt-3'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <p className='text-start display-4 pb-2' >Item information: </p>
                    </div>
                    <div className='col-1'></div>
                </div>

                <div className='row pt-3'>
                    <div className='col-1'></div>
                    <div className='col-5 ItemCodeNumber'>
                        <p className='text-center display-3' >CM-2U-PL-COV</p>
                    </div>
                    <div className='col-5 ItemCodeNumber text-center'>
                        <img className='pb-5 pt-5' src='/assets/notavailable.png' alt='Company' />
                    </div>
                    <div className='col-1'></div>
                </div>


            </div>
        )
    }
}
