import React, { Component } from 'react'
import ProgressBar from '../components/ProgressBar'
import { AiOutlineSearch } from "react-icons/ai"
import '../css/table-responsive.css'
import ModalOrders from '../components/ModalComponent';

export default class CycleInvetory extends Component {

    constructor(props) {
        super(props);
        this.ProgrressBarRef = React.createRef();
    }

    state = {
        porcetaje: 0,
        inventarioProvisional: [{ ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Quantity: Math.floor(Math.random() * (185 - 2)) + 2 },
        ],
        oldinventarioCycle: [{
            date: '05/02/2022', proccesitem: [
                { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Description: `Cable Manager 19" with Cover and Plastic Rings (2U)`, QuantitySystem: Math.floor(Math.random() * (185 - 2)) + 2, QuantityReal: Math.floor(Math.random() * (185 - 2)) + 2 },
                { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Description: `Cable Manager 19" Plastic Rings  (1U)`, QuantitySystem: Math.floor(Math.random() * (185 - 2)) + 2, QuantityReal: Math.floor(Math.random() * (185 - 2)) + 2 },
                { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Description: `Cable Manager 19" with Metallic Rings (2U)`, QuantitySystem: Math.floor(Math.random() * (185 - 2)) + 2, QuantityReal: Math.floor(Math.random() * (185 - 2)) + 2 },
                { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Description: `Cable Manager 19" with Cover and Metallic Rings (2U)`, QuantitySystem: Math.floor(Math.random() * (185 - 2)) + 2, QuantityReal: Math.floor(Math.random() * (185 - 2)) + 2 },
                { ItemCode: Math.floor(Math.random() * (1000000 - 2000000)) + 2000000, Description: `	Cable Coax RG59/CU Siamese 95% CCA 18/2 CRM Black 500ft`, QuantitySystem: Math.floor(Math.random() * (185 - 2)) + 2, QuantityReal: Math.floor(Math.random() * (185 - 2)) + 2 },
            ]
        }],

        actualworkInventory: [],

        General: {
            showModal1: false,
            showModal2: false,
            habilitar: false
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

    handleModalClose1 = () => {
        const temporal = this.state.General
        temporal.showModal1 = false
        this.setState({ General: temporal })
    }

    handleModalClose2 = () => {
        const temporal = this.state.General
        temporal.showModal2 = false
        this.setState({ General: temporal })
    }

    handleModalOpen = (modal) => {
        const temporal = this.state.General
        temporal[modal] = true
        this.setState({ General: temporal })
    }

    async selectOldInventory(item) {
        const recorrer = item.proccesitem
        await this.setState({ actualworkInventory: [], porcetaje: 0 })
        var temporal = [];
        await recorrer.forEach(element => {
            temporal.push(element);
        });
        var a = (temporal.length * 100) / this.state.inventarioProvisional.length

        await this.setState({ actualworkInventory: temporal })
        for (let m = 0; m < a; m++) {
            this.addValue()
        }
        await this.handleModalClose2()

    }

    render() {
        return (
            <div className='inventoryCycle'>
                <p className='text-center display-1 pb-2' >Cylce Inventory</p>

                <div>

                    <div className='row pb-2'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-4'><button className='btn btn-primary w-100' onClick={() => this.handleModalOpen()} > Start New Cycle Inventory</button></div>
                                <div className='col-2'></div>
                                <div className='col-4'><button className='btn btn-success w-100' onClick={() => this.handleModalOpen("showModal2")} > Open Old Cycle Inventory</button></div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row pb-3'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-5'>Inventory complete:</p>
                            <ProgressBar ref={this.ProgrressBarRef} />
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row pb-3'>
                        <div className='col-1'></div>
                        <div className='col-4 text-center'>
                            <label className='w-75'>

                                <input className='form-control' placeholder='Search by ItemCode, BIN, Description, Category, UPC ...' />
                            </label>
                            <button className='btn btn-primary'><AiOutlineSearch /></button>
                        </div>
                        <div className='col-2'></div>
                        <div className='col-4'>
                            <button className='btn btn-warning w-100' onClick={() => this.handleModalOpen("showModal1")} > Open Actual Inventory</button>
                        </div>
                        <div className='col-1'></div>
                    </div>

                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-5'>Proccessed Items</p>
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
                                        
                                        <th>Actual Quantity</th>
                                        <th></th>
                                        <th>System Quantity</th>
                                        
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.actualworkInventory.map((item, i) => (
                                        <tr key={i} onClick={() => this.selectOldInventory(item)}>

                                            <td className='text-center'>{item.ItemCode}</td>
                                            <td className='text-start'>{item.Description}</td>
                                            <td className='text-end'>{item.QuantitySystem}</td>
                                            <td className='text-center'>  <button className='btn btn-success w-100' > Check</button></td>
                                            <td className='text-end'>{item.QuantityReal}</td>
                                            <td className='text-center'>  <button className='btn btn-info w-100' > Detail</button></td>
    
                                  
                                        </tr>
                                    ))}
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
                <ModalOrders title={'Inventory Items'} show={this.state.General.showModal1} close={this.handleModalClose1}>
                    <table className='table'>
                        <thead className='thead'>
                            <tr className='bg-dark text-light'>
                                <th className='text-center'>Item Code</th>
                                <th className='text-end'>System Quantity</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {this.state.inventarioProvisional.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.ItemCode}</td>
                                    <td className='text-end'>{item.Quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className='tfoot'>
                            <tr className='bg-secondary text-light'>

                            </tr>
                        </tfoot>

                    </table>
                </ModalOrders>
                <ModalOrders title={'Old Cycle Inventory'} show={this.state.General.showModal2} close={this.handleModalClose2}>
                    <table className='table'>
                        <thead className='thead'>
                            <tr className='bg-dark text-light'>
                                <th className='text-center'>Id</th>
                                <th className='text-center'>Starting Date</th>
                                <th className='text-center'>Last Update Date</th>
                                <th className='text-center'>Status</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            {this.state.oldinventarioCycle.map((item, i) => (
                                <tr key={i} onClick={() => this.selectOldInventory(item)}>
                                    <td className='text-end'>{i + 1}</td>
                                    <td className='text-end'>{item.date}</td>
                                    <td className='text-end'>{item.date}</td>
                                    <td className='text-end'>Incomplete</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className='tfoot'>
                            <tr className='bg-secondary text-light'>

                            </tr>
                        </tfoot>

                    </table>
                </ModalOrders>
            </div>
        )
    }
}
