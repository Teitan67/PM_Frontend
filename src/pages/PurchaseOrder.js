import React, { Component } from 'react'
import "../css/general-style.css"
import '../css/table-responsive.css'
import { BsCheckSquare, BsCartPlus } from "react-icons/bs";
import { AiTwotoneSave,AiOutlineCloseCircle } from "react-icons/ai"
import Catalogue from '../components/Catalogue';
import { OrderPDF } from '../components/OrderPDF';
import { getValueCookie } from '../services/cookieService';
export default class PurchaseOrder extends Component {

    state = {


        products: [],
        totals:{
            finalquantityTotal:0,
            finalTotalCost:0
        }

    }

    print() {
        console.log(this.state.products)
    }

    onTarget=async(e,item)=>{
        const temporal=this.state.products
        const index=temporal.indexOf(item)
        console.log(e.target.id)
        if(index!==-1){
            if(e.target.id==="BINPurchase"){
                temporal[index].BIN=e.target.value
            }else if(e.target.id==="quantityPurchase"){
                temporal[index].quantity=Number(e.target.value)
                temporal[index].totalCost=Number(e.target.value)*temporal[index].unitPrice
            }
            this.setState({products:temporal})
        }
        
    }

    render() {
        return (
            <div className='purchaseOrderContainer'>
                <button onClick={() => this.print()}>PRINT</button>
                <p className='text-center display-1 pb-2' >Purchase Order</p>

                <div>
                    <div className='row pb-5 text-center'>
                        <div className='col-1'></div>
                        <div className='col-5'>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn greenButton btn-lg">New Purchase Order <BsCartPlus /></button>
                            </div>

                        </div>
                        <div className='col-5'>
                            <div className="d-grid gap-2">
                                <button type="button" className="btn brownButton btn-lg">History <BsCheckSquare /></button>
                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row pb-2 text-center'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <div className='row pb-2'>
                                <div className='col-6'>
                                    <div className='row pb-4'>
                                        <div className='col-12 text-start pText'><p>Order No:</p></div>
                                        <div className='col-12'><input className="form-control form-control-lg" type="text" /></div>
                                    </div>
                                    <div className='row pb-4'>
                                        <div className='col-12 text-start pText'><p>Carrier:</p></div>
                                        <div className='col-12'><input className="form-control form-control-lg" type="text" /></div>
                                    </div>
                                    <div className='row pb-2'>
                                        <div className='col-4 text-start pText'><p>Order State:</p></div>
                                        <div className='col-8 text-start pText'><p className='fw-bold text-danger'>In Creation</p></div>
                                    </div>
                                </div>
                                <div className='col-6'>
                                    <div className='row pb-2'>
                                        <div className='col-12 text-start pText'><p>Vendor:</p></div>
                                        <div className='col-12'>
                                            <select className="form-select form-select-lg mb-3">
                                                <option>Open this select menu</option>
                                                <option>One</option>
                                                <option>Two</option>
                                                <option>Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row pb-4'>
                                        <div className='col-12 text-start pText'><p>Date:</p></div>
                                        <div className='col-12'><input className="form-control form-control-lg" type="date" /></div>
                                    </div>
                                    <div className='row pb-2'>
                                        <div className='col-12'><Catalogue nombrePadre={"PurchaseOrder"} Padre={this} /></div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row pb-2 pt-3 text-center'>
                        <div className='col-12 pb-3 text-start display-6'>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-10'>
                                    Order Detail:
                                </div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                        <div className='col-12 tb-5'>
                            <table className='table'>
                                <thead className='thead'>
                                    <tr className='text-light text-center'>
                                        <th className='bg-dark'>Item Code</th>
                                        <th className='bg-dark'>Description</th>
                                        <th className='bg-dark'>BIN</th>
                                        <th className='bg-dark'>Quantity</th>
                                        <th className='bg-dark'>Standar Cost</th>
                                        <th className='bg-dark'>Total Cost</th>
                                        <th className='bg-dark'></th>

                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {this.state.products.map((product, i) => (
                                        <tr className='text-center' key={i}>
                                            <td className='text-start'>{product.itemCode}</td>
                                            <td className='text-start'>{product.abbreviatedDesc}</td>
                                            <td>
                                                <div className="input-group input-group-lg">                     
                                                    <input type="text" id='BINPurchase' defaultValue={product.BIN} className="form-control text-center" onChange={(e)=>this.onTarget(e,product)}/>
                                                </div>
                                            </td>
                                            <td>
                                            <div className="input-group input-group-lg">                              
                                                    <input type="number" id='quantityPurchase' min={0} defaultValue={product.quantity} onChange={(e)=>this.onTarget(e,product)} className="form-control text-end"/>
                                                </div>
                                            </td>
                                            <td className='text-end'>$ {product.unitPrice}</td>
                                            <td className='text-end'>$ {product.totalCost}</td>
                                            <td><button className='btn btn-danger'><AiOutlineCloseCircle/></button></td>
                                        </tr>

                                    ))}
                                </tbody>
                                <tfoot className='tfoot'>

                                    <tr className='bg-secondary text-light'>
                                        <td></td>
                                        <td></td>
                                        <td>TOTAL:</td>
                                        <td className='text-end'>{this.state.totals.finalquantityTotal}</td>
                                        <td></td>
                                        <td className='text-end'>$ {this.state.totals.finalTotalCost}</td>
                                        <td></td>
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                    </div>
                </div>

                <div className='row  pb-4 text-center'>
                    <div className='col-1'></div>
                    <div className='col-5'>
                        <div className="d-grid gap-2">
                            <button type="button" className="btn yellowButton btn-lg">Save Order <AiTwotoneSave /></button>
                        </div>
                    </div>
                    <div className='col-5'>
                        <OrderPDF colorButton="orangeButton" title="Purchase Order Print"
                            companyLogo={getValueCookie('CompanyLogo')}
                            OrderTitle="Purchase Order"
                            contactInfo={["Hyperline Systems North East Inc.", "7055 Amwiler Industrial Drive Suite D, Atlanta, GA 30360", "Atlanta Georgia Warehouse", "www.hyperline.com"]}
                            OrderInfo1={["Order No: PO1563", "Vendor: HDMU HYUNDAI BANGKOK 0109E", "Carrier: Amazon UPS", "Date: 07/10/2022"]}
                            OrderInfo2={["Order State: In Proccess", "Order by: diego.perez", "Printed by: diego.perez"]}
                        />

                    </div>
                    <div className='col-1'></div>
                </div>


            </div>
        )
    }
}