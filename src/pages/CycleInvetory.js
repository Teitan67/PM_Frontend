import React, { Component } from 'react'
import ProgressBar from '../components/ProgressBar'
import { AiOutlineSearch } from "react-icons/ai"
import '../css/table-responsive.css'
import ModalOrders from '../components/ModalComponent';
import { getInformationNoData, create_Delete_Update_Information, getInformationWithData } from '../services/CABE';
import Swal from "sweetalert2";
import { getValueCookie } from '../services/cookieService';
import { automaticCloseAlert } from '../functions/alerts'

export default class CycleInvetory extends Component {

    constructor(props) {
        super(props);
        this.ProgrressBarRef = React.createRef();
    }

    state = {
        porcetaje: 0,
        General: {
            showModal1: false,
            showModal2: false,
            showModal3: false,
            habilitar: false,
            chekvalue: '0',
            checkHistory: '0',
            secureTransaction: false,
            generalHistory: [],
            generalHistoryFilter: []
        },

        cycleInventoryStorage: {
            Header: {
                closeBy: null,
                createBy: '',
                days: 0,
                finishDate: '',
                id: 0,
                lastUpadeDate: '',
                realFinishDate: '',
                startDate: '',
                status: 0,
                updateBy: ''
            },
            Detail: [],
            DetailFilter: [],
        }

    }
    valueSearchBar = async e => {
        let search = e.target.value
        this.getBySearchBar(search)
    }

    valueRadioButton = async e => {
        document.getElementById('searchCycleInv1').value = ""
        let stat = e.target.value
        const temporal = this.state.General
        temporal.chekvalue = stat
        this.setState({ General: temporal })
        this.getByStat(stat)
    }

    valueRadioButton2 = async e => {
        let stat = e.target.value
        document.getElementById('searchHistoryCycleInv1').value=""
        const temporal = this.state.General
        temporal.checkHistory = stat
        this.setState({ General: temporal })
        this.getByCheckHistory(stat)
    }

    getBySearchBar(search) {
        if (search !== "" && this.state.General.chekvalue !== '-1') {
            var DetailFilter = this.state.cycleInventoryStorage.Detail.filter((item) => {
                if ((item.ItemCode.toString().toLowerCase().includes(search.toLowerCase()) || item.BIN.toString().toLowerCase().includes(search.toLowerCase()) || item.Description.toString().toLowerCase().includes(search.toLowerCase())) && item.status.toString().toLowerCase().includes(this.state.General.chekvalue)) {
                    return item
                } else {
                    return null
                }
            })

            const temporal = this.state.cycleInventoryStorage
            temporal.DetailFilter = DetailFilter
            this.setState({ cycleInventoryStorage: temporal })
        } else if (search !== "") {
            var DetailFilter2 = this.state.cycleInventoryStorage.Detail.filter((item) => {
                if ((item.ItemCode.toString().toLowerCase().includes(search.toLowerCase()) || item.BIN.toString().toLowerCase().includes(search.toLowerCase()) || item.Description.toString().toLowerCase().includes(search.toLowerCase()))) {
                    return item
                } else {
                    return null
                }
            })

            const temporal = this.state.cycleInventoryStorage
            temporal.DetailFilter = DetailFilter2
            this.setState({ cycleInventoryStorage: temporal })

        } else {
            this.getByStat(this.state.General.chekvalue)
        }

    }

    getByStat(stat) {
        if (stat !== "-1") {
            var DetailFilter = this.state.cycleInventoryStorage.Detail.filter((item) => {
                if (item.status.toString().toLowerCase().includes(stat.toLowerCase())) {
                    return item
                } else {
                    return null
                }
            })

            const temporal = this.state.cycleInventoryStorage
            temporal.DetailFilter = DetailFilter
            this.setState({ cycleInventoryStorage: temporal })
        } else {
            const temporal = this.state.cycleInventoryStorage
            temporal.DetailFilter = temporal.Detail
            this.setState({ cycleInventoryStorage: temporal })
        }

    }

    async getByCheckHistory(stat) {
        var busqueda = ""
        switch (stat) {
            case "0":
                busqueda="purchase"
                break;
            case "1":
                busqueda="transferencia"
                break;
            case "2":
                busqueda="ajuste"
                break;
            case "3":
                busqueda="outbound"
                break;
            default:
                busqueda=""
                break;
        }


        if (stat !== "") {
            var DetailFilter = this.state.General.generalHistory.filter((item) => {
                if (item.Categoria.toString().toLowerCase().includes(busqueda.toLowerCase())) {
                    return item
                } else {
                    return null
                }
            })
            console.log(DetailFilter)
            const temporal = this.state.General
            temporal.generalHistoryFilter = DetailFilter
           await this.setState({ General: temporal })
        } 

    }



    async componentDidMount() {
        this.ProgrressBarRef.current.setValue(0);
        await this.getLastCycleInventory()
        this.getByStat('0')
    }

    async getLastCycleInventory() {
        const route = '/inventory/lastCycle/get';
        const datos = await getInformationNoData(route)
        if (datos.status.code === 1) {
            if (datos.data.length > 0) {
                const temporal = this.state.cycleInventoryStorage
                temporal.Header = datos.data[0]

                if (temporal.Header.status === 0) {
                    await this.getDetailCycleInventory(temporal.Header.id)
                } else {
                    temporal.Detail = []
                    temporal.DetailFilter = []
                    await this.setState({ cycleInventoryStorage: temporal })
                }
            } else {
                const temporal = this.state.cycleInventoryStorage
                temporal.Header.status = 1
                await this.setState({ cycleInventoryStorage: temporal })
            }
        }
    }

    async getDetailCycleInventory(id) {
        const data = {
            id: id
        }
        const route = '/inventory/cycledetail/post';
        const datos = await getInformationWithData(route, data)
        if (datos.status.code === 1) {
            if (datos.data.length > 0) {
                const temporal = this.state.cycleInventoryStorage
                temporal.Detail = datos.data
                temporal.DetailFilter = datos.data
                await this.setState({ cycleInventoryStorage: temporal })
                await this.completePercentage()

            } else {
                const temporal = this.state.cycleInventoryStorage
                temporal.Detail = []
                await this.setState({ cycleInventoryStorage: temporal })
            }
        }
    }


    async getGeneralHistory(ItemCode) {
        const data = {
            ItemCode: ItemCode
        }
        const route = '/invertory/getGeneralHistory/post';
        const datos = await getInformationWithData(route, data)
        if (datos.status.code === 1) {
            if (datos.data.length > 0) {
                const temporal = this.state.General
                temporal.generalHistory = datos.data
                temporal.checkHistory="0"
                await this.setState({ General: temporal })
            }else{
                const temporal = this.state.General
                temporal.generalHistory = []
                temporal.generalHistoryFilter=[]
                temporal.checkHistory="0"
                await this.setState({ General:temporal}) 
            }
        }
        await this.getByCheckHistory(this.state.General.checkHistory)
        await this.handleModalOpen("showModal3")
    }

    enableTransaction() {
        const temporal = this.state.General
        temporal.secureTransaction = false
        this.setState({ General: temporal })
    }

    async disableTransaction() {
        const temporal = this.state.General
        temporal.secureTransaction = true
        await this.setState({ General: temporal })
    }


    async startNewCycleInventory() {
        this.disableTransaction()
        const data = {
            days: 0,
            userName: getValueCookie('userName')
        }
        await Swal.fire({
            title: 'Number of Days of Cycle Inventory',
            input: 'number',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            showLoaderOnConfirm: true,
            preConfirm: async (days) => {
                data.days = days
                return await create_Delete_Update_Information('/invertory/newCycle/post', data)
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then(async (result) => {

            if (result.isConfirmed) {
                await this.getLastCycleInventory()
                await Swal.fire({
                    title: `The Cycle Inventory was created!`,
                })

            }
        })
        await this.enableTransaction()
    }

    async endCycleInventory() {
        this.disableTransaction()
        const data = {
            id: this.state.cycleInventoryStorage.Header.id,
            userName: getValueCookie('userName')
        }
        await Swal.fire({
            title: 'Do you want to end the actual Cycle Inventory?',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`,
            allowOutsideClick: () => !Swal.isLoading()
        }).then(async (result) => {
            if (result !== null && result !== undefined) {
                if (result.isConfirmed) {
                    const res = await create_Delete_Update_Information('/invertory/closeCycle/post', data)
                    if (res.status.code === 1) {
                        await this.getLastCycleInventory()
                        Swal.fire('Cycle inventory are closed!', '', 'success')
                        this.setState({ porcetaje: 0 })
                        this.ProgrressBarRef.current.setValue(0);

                    } else {
                        Swal.fire('Cycle inventory could not be closed', '', 'error')
                    }

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            }

        })
        this.enableTransaction()
    }

    async setCycleInventoryDetailInfo(item, idComent, idQuant) {
        this.disableTransaction()
        const coment = document.getElementById(idComent).value
        const quant = document.getElementById(idQuant).value
        const temporal = this.state.cycleInventoryStorage
        const index = temporal.Detail.indexOf(item)
        if (index !== -1) {
            temporal.Detail[index].comentary = coment
            temporal.Detail[index].realQuantity = Number(quant)
            temporal.Detail[index].countBy = getValueCookie('userName')
            temporal.Detail[index].difference = temporal.Detail[index].realQuantity - temporal.Detail[index].systemQuantity
            temporal.Detail[index].status = 1

            const response = await create_Delete_Update_Information('/invertory/updateDetailCycle/post', temporal.Detail[index])
            if (response.status.code === 1) {

                automaticCloseAlert('correct', 'The item was check!')
                await this.setState({ cycleInventoryStorage: temporal })
                await this.completePercentage()
            } else {
                automaticCloseAlert('incorrect', 'The item was not checked')
            }
        }
        await this.enableTransaction()
    }

    async updateCycleInventoryDetail(item) {
        const temporal = this.state.cycleInventoryStorage
        const index = temporal.Detail.indexOf(item)
        if (index !== -1) {
            temporal.Detail[index].countBy = null
            temporal.Detail[index].status = 0
            await this.setState({ cycleInventoryStorage: temporal })
        }

    }
    completePercentage() {
        this.setState({ porcetaje: 0 })
        var count = 0;
        var total = this.state.cycleInventoryStorage.Detail.length

        for (const item of this.state.cycleInventoryStorage.Detail) {
            if (item.status === 1)
                count++
        }

        for (let a = 0; a < ((count * 100) / total); a++) {
            this.addValue()
        }


    }



    textStatus(value) {
        if (value === 0) {
            return "Not checked"
        }
        return "Checked"
    }





    addValue() {
        let cantidad = this.state.porcetaje;
        cantidad++;
        this.setState({ porcetaje: cantidad });
        this.ProgrressBarRef.current.setValue(cantidad);
    }

    handleModalOpen = (modal) => {
        const temporal = this.state.General
        temporal[modal] = true
        this.setState({ General: temporal })
    }

    handleModalClose = (modal) => {
        const temporal = this.state.General
        temporal[modal] = false
        this.setState({ General: temporal })
    }

    render() {
        return (
            <div className='inventoryCycle'>
                <p className='text-center display-1 pb-2' >Cycle Inventory</p>
                <div>

                    <div className='row pb-2'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-5'>
                                    <button className='btn btn-primary btn-lg w-100' disabled={this.state.General.secureTransaction} hidden={this.state.cycleInventoryStorage.Header.status === 0} onClick={() => this.startNewCycleInventory()}> Start Cycle Inventory</button>
                                    <button className='btn btn-danger btn-lg w-100' disabled={this.state.General.secureTransaction} hidden={this.state.cycleInventoryStorage.Header.status === 1} onClick={() => this.endCycleInventory()}> End Cycle Inventory</button>
                                </div>

                                <div className='col-5'><button className='btn btn-success btn-lg w-100' onClick={() => this.handleModalOpen("showModal2")} > Open Old Cycle Inventory</button></div>
                                <div className='col-1'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row pb-5'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-5'>Inventory complete:</p>
                            <ProgressBar ref={this.ProgrressBarRef} />
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row pb-3'>
                        <div className='col-1'></div>
                        <div className='col-5 text-center'>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text"><AiOutlineSearch /></span>
                                <input type="text" className="form-control" placeholder='Search by ItemCode, BIN, Description, Category, UPC ...' id='searchCycleInv1' onChange={this.valueSearchBar} />
                            </div>
                        </div>
                        <div className='col-5 text-start'>
                            <div className='row fw-bold'>
                                <div className='col-4'></div>
                                <div className='col-4'>
                                    <div className="form-check">
                                        <input className="form-check-input" value={"-1"} onChange={this.valueRadioButton} checked={this.state.General.chekvalue === "-1"} type="radio" name="flexRadioDefault" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            All items
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value={"0"} onChange={this.valueRadioButton} checked={this.state.General.chekvalue === "0"} type="radio" name="flexRadioDefault" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            No Checked Items
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" value={"1"} onChange={this.valueRadioButton} checked={this.state.General.chekvalue === "1"} type="radio" name="flexRadioDefault" />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Checked Items
                                        </label>
                                    </div>
                                </div>
                                <div className='col-4'></div>
                            </div>

                        </div>
                        <div className='col-1'></div>

                    </div>

                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <p className='display-5'>Items</p>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row'>

                        <div className='col-12 tableFixHead tb-5'>
                            <table className='table'>
                                <thead>
                                    <tr className='bg-dark text-light text-center'>
                                        <th className='bg-dark'>Item Code</th>
                                        <th className='bg-dark'>Description</th>
                                        <th className='bg-dark'>Quantity</th>
                                        <th className='bg-dark'>BIN</th>
                                        <th className='bg-dark'>System Quantity</th>
                                        <th className='bg-dark'>Difference</th>
                                        <th className='bg-dark'>Counted By</th>
                                        <th className='bg-dark'>Status</th>
                                        <th className='bg-dark'>Comentary</th>
                                        <th className='bg-dark'></th>
                                        <th className='bg-dark'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.cycleInventoryStorage.DetailFilter.map((item, i) => (
                                        <tr key={i}>

                                            <td>{item.ItemCode}</td>
                                            <td>{item.Description}</td>
                                            <td><input disabled={item.status === 1} type="number" key={item.realQuantity} defaultValue={item.realQuantity} id={"realQuantityCycleInv_" + item.id} className="form-control text-end" /></td>
                                            <td className='text-center'>{item.BIN}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.systemQuantity}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.difference}</td>
                                            <td className='text-center'>{item.countBy === null ? "-" : item.countBy}</td>
                                            <td className='text-center'>{this.textStatus(item.status)}</td>
                                            <td><textarea disabled={item.status === 1} className="form-control" key={item.comentary === 'null' ? '' : item.comentary} id={"comentaryCycleInv_" + item.id} defaultValue={item.comentary === 'null' ? '' : item.comentary}></textarea></td>
                                            <td className='text-center'>
                                                <button type="button" className="btn btn-success" disabled={this.state.General.secureTransaction} onClick={() => this.setCycleInventoryDetailInfo(item, "comentaryCycleInv_" + item.id, "realQuantityCycleInv_" + item.id,)} hidden={item.status === 1}>Check</button>
                                                <button type="button" className="btn btn-danger" onClick={() => this.updateCycleInventoryDetail(item)} hidden={item.status === 0}>Change</button>
                                            </td>
                                            <td className='text-center'><button onClick={() => this.getGeneralHistory(item.ItemCode)} type="button" className="btn btn-info">Detail</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr className='bg-secondary text-light'>

                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                    </div>


                </div>

                <ModalOrders title={'Old Cycle Inventory'} show={this.state.General.showModal2} close={(modal = "showModal2") => this.handleModalClose(modal)}>
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

                        </tbody>
                        <tfoot className='tfoot'>
                            <tr className='bg-secondary text-light'>

                            </tr>
                        </tfoot>

                    </table>
                </ModalOrders>
                <ModalOrders title={'Detail of Product'} show={this.state.General.showModal3} close={(modal = "showModal3") => this.handleModalClose(modal)}>
                    <div className='row'>
                        <div className='col'>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text"><AiOutlineSearch /></span>
                                <input type="text" className="form-control" placeholder='Search by BIN, Description, Date...' id='searchHistoryCycleInv1' />
                            </div>
                        </div>
                        <div className='col'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioButtonHistory" value={"0"} checked={this.state.General.checkHistory === "0"} onChange={this.valueRadioButton2} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Purchase Orders
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioButtonHistory" value={"1"} checked={this.state.General.checkHistory === "1"} onChange={this.valueRadioButton2} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Transfers
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioButtonHistory" value={"2"} checked={this.state.General.checkHistory === "2"} onChange={this.valueRadioButton2} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Inventory Adjustments
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="radioButtonHistory" value={"3"} checked={this.state.General.checkHistory === "3"} onChange={this.valueRadioButton2} />
                                <label className="form-check-label" htmlFor="flexRadioDefault2">
                                    Outbound Orders
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 tableFixHead pt-5'>
                            <table className='table'>
                                <thead>
                                    <tr className='bg-dark text-light text-center'>
                                        <th className='bg-dark' hidden={!(this.state.General.checkHistory === "0" || this.state.General.checkHistory === "3")}>Order Number</th>
                                        <th className='bg-dark'>{(this.state.General.checkHistory === "0" || this.state.General.checkHistory === "3" || this.state.General.checkHistory === "2") ? "BIN" : "Old BIN"}</th>
                                        <th className='bg-dark' hidden={(this.state.General.checkHistory === "0" || this.state.General.checkHistory === "3" || this.state.General.checkHistory === "2")}>New BIN</th>
                                        <th className='bg-dark'>{(this.state.General.checkHistory === "1" ? "Quantity" : (this.state.General.checkHistory === "3") ? "Quantity Shipped" : "Old Quantity")}</th>
                                        <th className='bg-dark' hidden={(this.state.General.checkHistory === "3" || this.state.General.checkHistory === "1")}>New Quantity</th>
                                        <th className='bg-dark'>Description</th>
                                        <th className='bg-dark'>Date</th>
                                        <th className='bg-dark'>Username</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.General.generalHistoryFilter.map((item, i) => (
                                        <tr className='text-center' key={i}>

                                            <td hidden={this.state.General.checkHistory==="2"||this.state.General.checkHistory==="1"}>{item.OrderNumber}</td>
                                            <td>{item.BIN}</td>
                                            <td hidden={this.state.General.checkHistory==="2"||this.state.General.checkHistory==="0"||this.state.General.checkHistory==="3"}>{item.BIN2}</td>
                                            <td hidden={this.state.General.checkHistory==="1"||this.state.General.checkHistory==="3"}>{item.OldQuantity}</td>
                                            <td>{item.NewQuantity}</td>
                                            <td>{item.description}</td>
                                            <td>{item.fecha}</td>
                                            <td>{item.username}</td>
                                        </tr>
                                    ))}

                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr className='bg-secondary text-light'>

                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>
                </ModalOrders>
            </div>
        )
    }
}
