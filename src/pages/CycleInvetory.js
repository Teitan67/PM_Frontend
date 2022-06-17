import React, { Component } from 'react'
import ProgressBar from '../components/ProgressBar'
import { AiOutlineSearch } from "react-icons/ai"
import '../css/table-responsive.css'
import ModalOrders from '../components/ModalComponent';
import {displayClass} from '../functions/displayClass';

export default class CycleInvetory extends Component {

    constructor(props) {
        super(props);
        this.ProgrressBarRef = React.createRef();
    }

    state = {
        porcetaje: 0,

        General: {
            showModal: false,
        }
    }

    componentDidMount() {
        this.ProgrressBarRef.current.setValue(0);
    }

    addValue() {
        let cantidad = this.state.porcetaje;
        cantidad++;
        this.setState({ porcetaje: cantidad });
        this.ProgrressBarRef.current.setValue(cantidad);
    }

    handleModalClose = () => {
        const temporal = this.state.General
        temporal.showModal = false
        this.setState({ General: temporal })
    }

    handleModalOpen = async(modal, cases) => {
       await this.openModalPart(cases)
        const temporal = this.state.General
        temporal[modal] = true
        this.setState({ General: temporal })
    }

    openModalPart(cases) {
        switch (cases) {
            case "1":
                displayClass("", 'CycleInventorySelect1')
                displayClass("none", "CycleInventorySelect2")
                break;
            case "2":
                displayClass("none", 'CycleInventorySelect1')
                displayClass("", "CycleInventorySelect2")
                break;
            default:
                break;
        }
    }



    render() {
        return (
            <div className='inventoryCycle'>
                <p className='text-center display-1 pb-2' >Cycle Inventory</p>

                <div>

                    <div className='row pb-5'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-5'><button className='btn btn-success w-100 btn-lg'> Start New Cycle Inventory</button></div>
                                <div className='col-5'><button className='btn btn-primary w-100 btn-lg' onClick={() => this.handleModalOpen("showModal", "1")} > Open Old Cycle Inventory</button></div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row pb-3'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-6'>Inventory complete:</p>
                            <ProgressBar ref={this.ProgrressBarRef} />
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row pb-3'>
                        <div className='col-1'></div>

                        <div className='col-5'>
                            <button className='btn btn-warning w-100 btn-lg' onClick={() => this.handleModalOpen("showModal", "2")} > Open Inventory</button>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-5'>Items to count:</p>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <table className='table'>
                                <thead>
                                    <tr className='bg-dark text-light text-center'>
                                        <th>Item Code</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>BIN</th>
                                        <th>Date</th>
                                        <th>System Quantity</th>
                                        <th>Difference</th>
                                        <th>Resupply</th>
                                        <th>Outbounds or transfers</th>
                                        <th>Comentary</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr className='bg-secondary text-light'>

                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-5'>Items already counted</p>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <table className='table'>
                                <thead>
                                    <tr className='bg-dark text-light text-center'>
                                        <th>Item Code</th>
                                        <th>Description</th>
                                        <th>Quantity</th>
                                        <th>BIN</th>
                                        <th>Date</th>
                                        <th>System Quantity</th>
                                        <th>Difference</th>
                                        <th>Comentary</th>
                                        <th>Who makes the count</th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr className='bg-secondary text-light'>

                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                        <div className='col-1'></div>
                    </div>


                </div>
                <ModalOrders title={''} show={this.state.General.showModal} close={this.handleModalClose}>
                    <div id={'CycleInventorySelect1'} className='CycleInventorySelect1'>
                        <h1>Soy el boton 1</h1>
                    </div>
                    <div className='CycleInventorySelect2'>
                        <h1>Soy el boton 2</h1>
                    </div>

                </ModalOrders>

            </div>
        )
    }
}
