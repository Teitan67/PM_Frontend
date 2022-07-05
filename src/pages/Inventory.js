import React, { Component } from 'react'
import "../css/inventory-style.css"
import "../css/general-style.css"
import '../css/table-responsive.css'
import Catalogue from '../components/Catalogue.js'
import { AiOutlineSearch, AiOutlineFileSearch, AiFillPrinter, AiFillBook, AiFillDollarCircle, AiFillCheckSquare, AiFillCreditCard, AiFillTag, AiOutlineBarcode } from "react-icons/ai"
import LineAreaGraph from '../components/LineAreaGraph'
export default class Inventory extends Component {
    constructor(props) {
        super(props)
        this.LineAreaGraph1 = React.createRef()
    }

    componentDidMount() {
        this.LineAreaGraph1.current.setTitle('Quantity sold per month year 2022')
        this.LineAreaGraph1.current.setLabels(['January', 'February', 'March', 'April', 'May', 'June'])
        this.LineAreaGraph1.current.setData(['123', '100', '12', '156', '145', '110'])
    }



    render() {
        return (
            <div className='InventoryInfo lobbyContainer'>
                <div className='row searchPart'>
                    <div className='col-1'></div>
                    <div className='col-5 pb-5'>
                        <p className='text-start pt-4 pb-2' >Search specific Product:</p>
                        <div className="input-group input-group-lg pb-4">
                            <span className="input-group-text"><AiOutlineSearch /></span>
                            <input type="text" className="form-control" placeholder='Search by ItemCode' />
                        </div>
                        <div className='text-center'>
                            <button type="button" className="btn  btn-lg w-50 searchProd">Search <AiOutlineFileSearch /></button>
                        </div>

                    </div>
                    <div className='col-5'>
                        <p className='text-start pt-4 pb-2' >See all Catalogue:</p>
                        <div className='text-center'>
                            <Catalogue nombrePadre={'InventoryBin'}/>
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='ItemInfo' hidden={false}>
                    <div className='row pt-3'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='text-start display-4 pb-2' >Item information: </p>
                        </div>
                        <div className='col-1'></div>
                    </div>

                    <div className='row pt-3'>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col-5 ItemCodeNumber'>
                                <p className='text-center display-3' >CM-2U-PL-COV</p>
                            </div>
                            <div className='col-5 ItemCodeNumber text-center'>
                                <img className='pb-5 pt-5' src='/assets/notavailable.png' alt='Company' />
                            </div>
                            <div className='col-1'></div>
                        </div>
                        <div className='row'>
                            <div className='col-1'></div>
                            <div className='col-5 ItemCodeNumber text-center pb-5'>
                                <button type="button" className="btn  btn-lg w-50 searchProd">Print labels <AiFillPrinter /></button>
                            </div>
                            <div className='col-5 ItemCodeNumber text-center pb-5'>
                                <button type="button" className="btn  btn-lg w-50 historyProd">View history <AiFillBook /></button>
                            </div>
                            <div className='col-1'></div>
                        </div>


                    </div>



                    <div className='row pt-5'>
                        <div className='col-1'></div>
                        <div className='col-5'>
                            <p className='text-start display-5 pb-2' >General information: <AiOutlineBarcode /></p>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>UPC:</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>Description:</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4 textAreaGeneral">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>U/M:</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>Categories to which it belongs:</p>
                                </div>
                                <div className='col-12 tableFixHead'>
                                    <table className='table'>
                                        <thead>
                                            <tr className='text-light text-center'>
                                                <th className='bg-dark'>Categories</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className='text-center'>BOOTS</td>
                                            </tr>
                                            <tr>
                                                <td className='text-center'>FIBER ADAPTER</td>
                                            </tr>
                                            <tr>
                                                <td className='text-center'>KEYSTONE JACKS</td>
                                            </tr>
                                        </tbody>
                                        <tfoot className='tfoot'>
                                        </tfoot>

                                    </table>
                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='text-start display-5 pb-2' >Quantity Available: <AiFillCheckSquare /> </p>
                                    <div className='row'>
                                        <div className='col-12 titleTotal text-center'>
                                            <p>General Total: 1563</p>
                                        </div>
                                        <div className='col-12 titleDistribution'>
                                            <p>Distribution:</p>
                                        </div>
                                        <div className='col-12 tableFixHead'>
                                            <table className='table'>
                                                <thead>
                                                    <tr className='text-light text-center'>
                                                        <th className='bg-dark'>BIN</th>
                                                        <th className='bg-dark'>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className='text-center'>A001</td>
                                                        <td className='text-end'>1500</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>B002</td>
                                                        <td className='text-end'>60</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='text-center'>A003</td>
                                                        <td className='text-end'>3</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot className='tfoot'>

                                                    <tr className='bg-secondary text-light'>
                                                        <td className='text-center'>Total</td>
                                                        <td className='text-end'>1563</td>
                                                    </tr>
                                                </tfoot>

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-5'>
                            <p className='text-start display-5 pb-2' >Physical details: <AiFillTag /></p>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>Weight (lbs) :</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>Length (in) :</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>Height (in) :</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row productInfoText'>
                                <div className='col-12'>
                                    <p>Width (in) :</p>
                                </div>
                                <div className='col-12'>
                                    <div className="input-group input-group-lg pb-4">
                                        <input type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-12'>
                                    <p className='text-start display-5 pb-2' >Financial information: <AiFillCreditCard /></p>
                                    <div className='row productInfoText'>
                                        <div className='col-12'>
                                            <p><AiFillDollarCircle /> Purchase price:</p>
                                        </div>
                                        <div className='col-12'>
                                            <div className="input-group input-group-lg pb-4">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row productInfoText'>
                                        <div className='col-12'>
                                            <p><AiFillDollarCircle /> Sale price:</p>
                                        </div>
                                        <div className='col-12'>
                                            <div className="input-group input-group-lg pb-4">
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row productInfoText'>
                                        <div className='col-12'>
                                            <LineAreaGraph ref={this.LineAreaGraph1} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                </div>
            </div>
        )
    }
}
