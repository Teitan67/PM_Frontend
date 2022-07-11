import React, { Component } from 'react'
import ProgressBar from '../components/ProgressBar'
import { AiOutlineSearch, AiFillCalendar } from "react-icons/ai"
import '../css/table-responsive.css'
import '../css/general-style.css'
import ModalOrders from '../components/ModalComponent';
import { create_Delete_Update_Information, getInformationWithData } from '../services/CABE';
import Swal from "sweetalert2";
import { getValueCookie } from '../services/cookieService';
import { automaticCloseAlert } from '../functions/alerts'
import {formatInputDate, FormatQueryReturnDate, getActualDateUTC, getDateFromReports, OrderArrayByDate } from '../functions/dateFormat'
import { getDataSet } from '../functions/generateDataSetExcel'
import ExcelDocument from '../components/ExcelDocument'



export default class CycleInvetory extends Component {

    constructor(props) {
        super(props);
        this.ProgrressBarRef = React.createRef();
    }

    state = {
        dataset: [{
            columns: [],
            data: []
        }],
        porcetaje: 0,
        General: {
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
            habilitar: false,
            chekvalue: '0',
            checkHistory: '0',
            selectedItem: '',
            selectedCycleInventory: null,
            secureTransaction: false,
            generalHistory: [],
            outBounds: [],
            purchaseOrders: [],
            generalHistoryFilter: [],
            oldCycleInventory: [],
            detailOldCycleSelected: [],
            detailOldCycleSelectedFilter: []
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



    searchOlderCycleInventoryDetail = e => {
        let search = e.target.value


        var DetailFilter = this.state.General.detailOldCycleSelected.filter((item) => {
            if (item.ItemCode.toString().toLowerCase().includes(search.toLowerCase()) || item.BIN.toString().toLowerCase().includes(search.toLowerCase()) || item.status.toString().toLowerCase().includes(search.toLowerCase())) {
                return item
            } else {
                return null
            }
        })

        const temporal = this.state.General
        temporal.detailOldCycleSelectedFilter = DetailFilter
        this.setState({ General: temporal })
    }



    getBySearchBar(search) {
        if (search !== "" && this.state.General.chekvalue !== '-1') {
            var DetailFilter = this.state.cycleInventoryStorage.Detail.filter((item) => {
                if ((item.ItemCode.toString().toLowerCase().includes(search.toLowerCase()) || item.productLine.toString().toLowerCase().includes(search.toLowerCase()) || item.BIN.toString().toLowerCase().includes(search.toLowerCase()) || item.Description.toString().toLowerCase().includes(search.toLowerCase())) && item.status.toString().toLowerCase().includes(this.state.General.chekvalue)) {
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


    getCategory(stat) {
        var busqueda = ""
        switch (stat) {
            case "0":
                busqueda = "purchase"
                break;
            case "1":
                busqueda = "transferencia"
                break;
            case "2":
                busqueda = "ajuste"
                break;
            case "3":
                busqueda = "outbound"
                break;
            default:
                busqueda = ""
                break;
        }
        return busqueda;
    }



    async componentDidMount() {
        this.ProgrressBarRef.current.setValue(0);

    }

    async getLastCycleInventory() {
        const data = {
            company: getValueCookie('Company')
        }
        const route = '/inventory/lastCycle/post';
        const datos = await getInformationWithData(route, data)

        if (datos.status.code === 1) {
            if (datos.data.length > 0) {
                const temporal = this.state.cycleInventoryStorage
                temporal.Header = datos.data[0]

                if (temporal.Header.status === 0) {
                    await this.getDetailCycleInventory(temporal.Header.id, "actual")
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


    async getOldCycleInventory() {
        const data = {
            company: getValueCookie('Company')
        }
        const route = '/invertory/oldCycleInventorys/post';
        const datos = await getInformationWithData(route, data)
        if (datos.status.code === 1) {
            if (datos.data.length > 0) {
                const temporal = this.state.General
                temporal.oldCycleInventory = datos.data
                await this.setState({ General: temporal })

            } else {
                const temporal = this.state.General
                temporal.oldCycleInventory = []
                await this.setState({ General: temporal })
            }
        }
    }


    async getDetailCycleInventory(id, type) {
        const data = {
            id: id
        }
        const route = '/inventory/cycledetail/post';
        const datos = await getInformationWithData(route, data)
        if (type === "actual") {

            if (datos.status.code === 1) {
                if (datos.data.length > 0) {
                    const temporal = this.state.cycleInventoryStorage
                    temporal.Detail = datos.data
                    temporal.DetailFilter = datos.data
                    await this.setState({ cycleInventoryStorage: temporal })
                    await this.completePercentage()
                    await this.getByStat('0')
                } else {
                    const temporal = this.state.cycleInventoryStorage
                    temporal.Detail = []
                    await this.setState({ cycleInventoryStorage: temporal })
                }
            }
        } else if (type === "old") {
            const temporal = this.state.General
            temporal.detailOldCycleSelected = datos.data
            temporal.detailOldCycleSelectedFilter = datos.data
            await this.setState({ General: temporal })
        }

    }
    getOldDetailCycleInventory(item) {
        const temporal = this.state.General
        temporal.selectedCycleInventory = item
        this.setState({ General: temporal })
        this.getDetailCycleInventory(item.id, "old")
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
            company: getValueCookie('Company'),
            userName: getValueCookie('userName')
        }
        await Swal.fire({
            title: 'Number of Days of Cyclical Inventory',
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
                    title: `The Cyclical Inventory was created!`,
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
            title: 'Do you want to end the actual Cyclical Inventory?',
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
                        Swal.fire('Cyclical inventory are closed!', '', 'success')
                        this.setState({ porcetaje: 0 })
                        this.ProgrressBarRef.current.setValue(0);

                    } else {
                        Swal.fire('Cyclical inventory could not be closed', '', 'error')
                    }

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            }

        })
        this.enableTransaction()
    }

    async setCycleInventoryDetailInfo(item, idQuant) {
        this.disableTransaction()
        
        const quant = document.getElementById(idQuant).value
        const temporal = this.state.cycleInventoryStorage
        const index = temporal.Detail.indexOf(item)
        if (index !== -1) {
          
            temporal.Detail[index].realQuantity = Number(quant)
            temporal.Detail[index].countBy = getValueCookie('userName')
            temporal.Detail[index].date=getActualDateUTC()
            temporal.Detail[index].difference = temporal.Detail[index].realQuantity - temporal.Detail[index].systemQuantity
            temporal.Detail[index].status = 1
            console.log(temporal.Detail[index])
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


    async openOlCycleInventory() {
        const temporal = this.state.General
        temporal.detailOldCycleSelected = []
        temporal.detailOldCycleSelectedFilter = []
        temporal.selectedCycleInventory = null
        this.setState({ General: temporal })
        this.getOldCycleInventory()
        await this.handleModalOpen("showModal2")
    }

    async getInfoProduct() {
        var date1 = formatInputDate(document.getElementById('searchHistoryCycleInvDate1').value)
        var date2 = formatInputDate(document.getElementById('searchHistoryCycleInvDate2').value)
        const data = {
            ItemCode: this.state.General.selectedItem.ItemCode,
            Start: date1,
            End: date2
        }

        //AQUI COLOCAR LAS LLAMADAS A LOS DATOS
        //const route = '/invertory/getGeneralHistory/post';
        const generalHistoryData = await getInformationWithData('/invertory/getGeneralHistory/post', data)
        const pickList = await getInformationWithData('/pickList/history/getByItemCode', data)
        const transfer = await getInformationWithData('/transfer/history/getByItemCode', data)
        const purchase = await getInformationWithData('/purchase/history/getByItemCode', data)
        const adjust = await getInformationWithData('/adjustment/history/getByItemCode', data)

        if (generalHistoryData.status.code === 1 && pickList.status.code === 1 && transfer.status.code === 1 && purchase.status.code === 1 && adjust.status.code === 1) {

            await this.consolidateTable(pickList.data, purchase.data, transfer.data, adjust.data, generalHistoryData.data)
        }
    }

    async consolidateTable(outbounds, purchase, transfers, adjusts, generalHistory) {


        var InfoArray = []

        for (const row of generalHistory) {
            if (row.Categoria !== "General") {
                const structure = {
                    Type: '',
                    NoOrder: '',
                    BIN: '',
                    BIN2: '',
                    QuantityOrder: '',
                    QuantityShipped: '',
                    User: '',
                    Date: ''
                }
                structure.Type = row.Categoria
                structure.NoOrder = row.OrderNumber
                structure.BIN = row.BIN
                structure.BIN2 = row.BIN2
                structure.QuantityOrder = row.OldQuantity
                structure.QuantityShipped = row.NewQuantity
                structure.User = row.username
                structure.Date = row.Date2
                InfoArray.push(structure)
            }

        }

        for (const row of outbounds) {
            const structure = {
                Type: '',
                NoOrder: '',
                BIN: '',
                BIN2: '',
                QuantityOrder: '',
                QuantityShipped: '',
                User: '',
                Date: ''
            }
            structure.Type = row.Type
            structure.NoOrder = row.OrdenNo
            structure.BIN = row.BIN
            structure.BIN2 = null
            structure.QuantityOrder = row.QuantityOrder
            structure.QuantityShipped = row.QuantityShipped
            structure.User = row.username
            structure.Date = FormatQueryReturnDate(row.Date)
            InfoArray.push(structure)

        }

        for (const row of transfers) {
            const structure = {
                Type: '',
                NoOrder: '',
                BIN: '',
                BIN2: '',
                QuantityOrder: '',
                QuantityShipped: '',
                User: '',
                Date: ''
            }
            structure.Type = row.Type
            structure.NoOrder = null
            structure.BIN = row.BINSalida
            structure.BIN2 = row.BINEntrada
            structure.QuantityOrder = row.Quantity
            structure.QuantityShipped = null
            structure.User = row.username
            structure.Date = FormatQueryReturnDate(row.Date)
            InfoArray.push(structure)

        }

        for (const row of purchase) {
            const structure = {
                Type: '',
                NoOrder: '',
                BIN: '',
                BIN2: '',
                QuantityOrder: '',
                QuantityShipped: '',
                User: '',
                Date: ''
            }
            structure.Type = row.Type
            structure.NoOrder = row.OrdenNo
            structure.BIN = row.BIN
            structure.BIN2 = null
            structure.QuantityOrder = row.Quantity
            structure.QuantityShipped = null
            structure.User = row.username
            structure.Date = FormatQueryReturnDate(row.Date)
            InfoArray.push(structure)

        }

        for (const row of adjusts) {
            const structure = {
                Type: '',
                NoOrder: '',
                BIN: '',
                BIN2: '',
                QuantityOrder: '',
                QuantityShipped: '',
                User: '',
                Date: ''
            }
            structure.Type = row.Type
            structure.NoOrder = null
            structure.BIN = row.BIN
            structure.BIN2 = null
            structure.QuantityOrder = row.OldQuantity
            structure.QuantityShipped = row.NewQuantity
            structure.User = row.username
            structure.Date = FormatQueryReturnDate(row.Date)
            InfoArray.push(structure)

        }



        var n = await OrderArrayByDate(InfoArray)
        const temporal = this.state.General
        temporal.generalHistory = n
        temporal.generalHistoryFilter = n
        this.setState({ General: temporal })
    }


    async getGeneralHistory(itemCode) {
        const temporal = this.state.General
        temporal.selectedItem = itemCode
        temporal.generalHistory = []
        temporal.generalHistoryFilter = []
        const data = {
            ItemCode: itemCode.ItemCode,
            Date: FormatQueryReturnDate(this.state.cycleInventoryStorage.Header.startDate)
        }

        const val = await getInformationWithData('/pickList/history/getOutBound', data)
        const val2 = await getInformationWithData('/purchase/history/getFutureByItemCode', data)
        if (val.status.code === 1) {
            temporal.outBounds = val.data

        }

        if (val2.status.code === 1) {
            temporal.purchaseOrders = val2.data

        }

        this.setState({ General: temporal })
        await this.handleModalOpen("showModal3")
    }

    async updateSystemQuantity(item) {

        this.setState({ secureTransaction: true })
        Swal.fire({
            title: 'For this Action you need a User and  Password Admin. Please enter it to continue:',
            html: `<input type="text" id="loginChangeQuantity" class="swal2-input" placeholder="Username">
  <input type="password" id="passwordChangeQuantity" class="swal2-input" placeholder="Password">`,
            backdrop: true,
            showCancelButton: true,
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const login = Swal.getPopup().querySelector('#loginChangeQuantity').value
                const password = Swal.getPopup().querySelector('#passwordChangeQuantity').value
                if (!login || !password) {
                    Swal.showValidationMessage(`Please enter login and password`)
                } else if (login === "diego.perez" && password === "Diego1560") {
                    automaticCloseAlert('correct', 'The Quantity has been updated!')
                } else {
                    automaticCloseAlert('incorrect', 'Username or password are invalid!')
                }

            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        this.setState({ secureTransaction: false })
    }

    generateInfo() {
        let proccessInfo = JSON.parse(JSON.stringify(this.state.cycleInventoryStorage.Detail))
        const headerKeys = ['ItemCode', 'productLine', 'Description', 'realQuantity', 'BIN', 'systemQuantity', 'difference', 'countBy', 'date', 'status', 'comentary']
        for (const item of proccessInfo) {
            for (const head of headerKeys) {
                if (head !== "status") {
                    if (item[head] === null||item[head] ==="null") {
                        item[head] = ""
                    } else if (head === "date") {
                        item[head] = FormatQueryReturnDate(item[head])
                    }
                } else {
                    if (item[head] === 0) {
                        item[head] = "Not checked"
                    } else {
                        item[head] = "Checked"
                    }
                }

            }
        }

        var info = getDataSet(proccessInfo,
            ['Item Code', 'Product Line', 'Description', 'Quantity', 'BIN', 'System Quantity', 'Difference', 'Counted By', 'Date', 'Status', 'Comments'],
            headerKeys)
        //this.setState({dataset:info})
        return info
    }

    async addComentary(item) {
        this.disableTransaction()
        var comm=""
        if(item.comentary){
            comm=item.comentary
        }


        Swal.fire({
            title: 'Product: ' + item.ItemCode + ' \nBIN: ' + item.BIN,
            html: `<div class='textAreaGeneral textAreaComment'>
                    <textarea id='comentOfCycleInventoryDifference' rows="10" cols="50">${comm}</textarea>
                   </div>
            `,
            backdrop:true,
            showCancelButton: true,
            confirmButtonText: 'Save Commentary',
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const coment = Swal.getPopup().querySelector('#comentOfCycleInventoryDifference').value
                const temporal = this.state.cycleInventoryStorage
                const index = temporal.Detail.indexOf(item)
                if (index !== -1) {
                    temporal.Detail[index].comentary = coment
                    const response = await create_Delete_Update_Information('/invertory/updateDetailCycle/post', temporal.Detail[index])
                    if (response.status.code === 1) {
                        automaticCloseAlert('correct', 'The comment was save!')
                        await this.setState({ cycleInventoryStorage: temporal })
                    } else {
                        automaticCloseAlert('incorrect', 'The comment was not save')
                    }
                }
                
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
        await this.enableTransaction()
    }


    render() {
        return (
            <div className='inventoryCycle'>
                <button hidden id='actionatorCycleInventory' onClick={() => this.getLastCycleInventory()}></button>
                <p className='text-center display-1 pb-2' >Cyclical Inventory</p>
                <div>

                    <div className='row pb-2'>
                        <div className='col-12'>
                            <div className='row'>
                                <div className='col-1'></div>
                                <div className='col-5'>
                                    <button className='btn btn-primary btn-lg w-100' disabled={this.state.General.secureTransaction} hidden={this.state.cycleInventoryStorage.Header.status === 0} onClick={() => this.startNewCycleInventory()}> Start Cyclical Inventory</button>
                                    <button className='btn btn-danger btn-lg w-100' disabled={this.state.General.secureTransaction} hidden={this.state.cycleInventoryStorage.Header.status === 1} onClick={() => this.endCycleInventory()}> End Cyclical Inventory</button>
                                </div>

                                <div className='col-5'><button className='btn btn-success btn-lg w-100' onClick={() => this.openOlCycleInventory()} > Open Olds Cyclical Inventory</button></div>
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
                                <input type="text" autoComplete='off' className="form-control" placeholder='Search by ItemCode, BIN, Description, Category, UPC ...' id='searchCycleInv1' onChange={this.valueSearchBar} />
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

                    <div className='row pb-3'>
                        <div className='col-1'></div>
                        <div className='col-5 text-center'>

                            <ExcelDocument hidden={this.state.cycleInventoryStorage.Header.status === 1} data={this.generateInfo()} sheetname={"CycleInventoryDetail"} archname={"CYCLICAL INVENTORY NO " + this.state.cycleInventoryStorage.Header.id + " COMPANY " + getValueCookie('Company') + " DATE " + getDateFromReports()} ></ExcelDocument>

                        </div>
                        <div className='col-5 text-start'>

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

                        <div className='col-12 tb-5'>
                            <table className='table'>
                                <thead className='thead'>
                                    <tr className='text-light text-center'>
                                        <th className='bg-dark'>Item Code</th>
                                        <th className='bg-dark'>Product Line</th>
                                        <th className='bg-dark'>Description</th>
                                        <th className='bg-dark'>Quantity</th>
                                        <th className='bg-dark'>BIN</th>
                                        <th className='bg-dark'>System Quantity</th>
                                        <th className='bg-dark'>Difference</th>
                                        <th className='bg-dark'>Counted By</th>
                                        <th className='bg-dark'>Status</th>
                                        <th className='bg-dark'></th>
                                        <th className='bg-dark'></th>
                                        <th className='bg-dark'></th>
                                        <th className='bg-dark'></th>
                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {this.state.cycleInventoryStorage.DetailFilter.map((item, i) => (
                                        <tr key={i}>

                                            <td>{item.ItemCode}</td>
                                            <td>{item.productLine}</td>
                                            <td>{item.Description===""?".":item.Description}</td>
                                            <td><input disabled={item.status === 1} type="number" key={item.realQuantity} defaultValue={item.realQuantity} id={"realQuantityCycleInv_" + item.id} className="form-control text-end" /></td>
                                            <td className='text-center'>{item.BIN}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.systemQuantity}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.difference}</td>
                                            <td className='text-center'>{item.countBy === null ? "-" : item.countBy}</td>
                                            <td className='text-center'>{this.textStatus(item.status)}</td>
                                            <td><button type="button" className="btn btn-secondary " onClick={() => this.addComentary(item)} disabled={this.state.General.secureTransaction||item.status===0}>Add Comments</button></td>
                                            <td className='text-center'>
                                                <button type="button" className="btn btn-success " disabled={this.state.General.secureTransaction} onClick={() => this.setCycleInventoryDetailInfo(item,"realQuantityCycleInv_" + item.id,)} hidden={item.status === 1}>Check</button>
                                                <button type="button" className="btn btn-danger " disabled={this.state.General.secureTransaction} onClick={() => this.updateCycleInventoryDetail(item)} hidden={item.status === 0}>Change</button>
                                            </td>
                                            <td className='text-center'><button onClick={() => this.getGeneralHistory(item)} type="button" className="btn btn-info ">Detail</button></td>
                                            <td className='text-center'><button disabled={this.state.General.secureTransaction} onClick={() => this.updateSystemQuantity(item)} type="button" className="btn btn-warning" hidden={item.status === 0}>Update Inventory</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className='tfoot'>

                                    <tr className='bg-secondary text-light'>
                                        <td></td>
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td>  
                                        <td></td> 
                                        <td></td>     
                                    </tr>
                                </tfoot>

                            </table>
                        </div>

                    </div>


                </div>

                <ModalOrders title={'Old Cyclical Inventory'} show={this.state.General.showModal2} close={(modal = "showModal2") => this.handleModalClose(modal)}>
                    <div className='row pt-3'>
                        <div className='col-12 display-5 pb-3'>
                            <p >Select an old Cyclical Inventory to see they detail:</p>
                        </div>
                        <div className='col-12'>
                            <table className='table'>
                                <thead className='thead'>
                                    <tr className='bg-dark text-light'>
                                        <th className='text-center bg-dark'>Id</th>
                                        <th className='text-center bg-dark'>Start Date</th>
                                        <th className='text-center bg-dark'>Estimated Date to finish</th>
                                        <th className='text-center bg-dark'>Real Finish Date</th>
                                        <th className='text-center bg-dark'>Days</th>
                                        <th className='text-center bg-dark'>Create By</th>
                                        <th className='text-center bg-dark'>Close By</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {
                                        this.state.General.oldCycleInventory.map((item, i) => (
                                            <tr className={this.state.General.selectedCycleInventory === item ? 'bg-warning text-center' : 'text-center'} onClick={() => this.getOldDetailCycleInventory(item)} key={i}>
                                                <td>{item.id}</td>
                                                <td>{item.startDate2}</td>
                                                <td>{item.finishDate2}</td>
                                                <td>{item.realFinishDate2}</td>
                                                <td>{item.realQuantityDays}</td>
                                                <td>{item.createBy}</td>
                                                <td>{item.closeBy}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr className='bg-secondary text-light'>

                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                        <div className='col-12 display-5 '>
                            <p >Detail:</p>
                        </div>
                        <div className='col-12 pt-3 pb-3'>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text"><AiOutlineSearch /></span>
                                <input type="text" className="form-control" placeholder='Search by BIN, Description, Date...' id='searchOldCycleInv' onChange={this.searchOlderCycleInventoryDetail} />
                            </div>
                        </div>
                        <div className='col-12 pt-3 pb-3 text-center'>
                            <div className='row h4'>
                                <div className='col correctCount2'>Exact difference</div>
                                <div className='col negativeCount2'>Negative difference</div>
                                <div className='col positiveCount2'>Positive difference</div>
                                <div className='col notcounted2'>Item not counted</div>
                            </div>
                        </div>
                        <div className='col-12'>{/*Here we need specific information*/}</div>
                        <div className='col-12 tb-5'>
                            <table className='table'>
                                <thead className='thead'>
                                    <tr className='bg-dark text-light text-center'>
                                        <th className='bg-dark'>Item Code</th>
                                        <th className='bg-dark'>Description</th>
                                        <th className='bg-dark'>Quantity</th>
                                        <th className='bg-dark'>BIN</th>
                                        <th className='bg-dark'>System Quantity</th>
                                        <th className='bg-dark'>Difference</th>
                                        <th className='bg-dark'>Counted By</th>
                                        <th className='bg-dark'>Status</th>
                                        <th className='bg-dark'>Comments</th>

                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {this.state.General.detailOldCycleSelectedFilter.map((item, i) => (
                                        <tr className={item.status === 0 ? 'notcounted' : item.difference < 0 ? 'negativeCount' : item.difference === 0 ? 'correctCount' : 'positiveCount'} key={i}>

                                            <td>{item.ItemCode}</td>
                                            <td>{item.Description}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.realQuantity}</td>
                                            <td className='text-center'>{item.BIN}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.systemQuantity}</td>
                                            <td className='text-center'>{item.status === 0 ? "-" : item.difference}</td>
                                            <td className='text-center'>{item.countBy === null ? "-" : item.countBy}</td>
                                            <td className='text-center'>{this.textStatus(item.status)}</td>
                                            <td>{item.comentary === 'null' ? '-' : item.comentary}</td>
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
                <ModalOrders title={'Detail of Product'} show={this.state.General.showModal3} close={(modal = "showModal3") => this.handleModalClose(modal)}>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-5'>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text"><AiFillCalendar /></span>
                                <input type="date" className="form-control" id='searchHistoryCycleInvDate1' />
                            </div>

                        </div>
                        <div className='col-5'>
                            <div className="input-group input-group-lg">
                                <span className="input-group-text"><AiFillCalendar /></span>
                                <input type="date" className="form-control" id='searchHistoryCycleInvDate2' />
                            </div>
                        </div>
                        <div className='col-1'></div>
                    </div>
                    <div className='row text-center pt-3'>
                        <div className='col-5'></div>
                        <div className='col-2'>
                            <button className='btn btn-danger btn-lg' onClick={() => this.getInfoProduct()}>Search</button>
                        </div>
                        <div className='col-5'></div>
                    </div>
                    <div className='row text-center pt-3'>
                        <div className='col-1'></div>
                        <div className='col-5'>
                            <div className='row fs-3'>
                                <div className='col-12 text-start'>
                                    <p>Item Code:</p>
                                </div>
                                <div className='col-12 text-start'>
                                    <p className='fw-bold'>{this.state.General.selectedItem.ItemCode}</p>
                                </div>
                            </div>
                            <div className='row fs-3'>
                                <div className='col-12 text-start'>
                                    <p>Description:</p>
                                </div>
                                <div className='col-12 justifyText'>
                                    <p>{this.state.General.selectedItem.Description}</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-5 text-center'>
                            <img className=' pt-4 detailIMG' src='/assets/notavailable.png' alt='Company' />
                        </div>
                        <div className='col-1'></div>
                    </div>


                    <div className='row text-start pt-2'>
                        <div className='col-12 fs-5'>
                            <p>Current Orders who maybe affect the current physical inventory</p>
                        </div>
                        <div className='col-12 pt-5'>
                            <table className='table'>
                                <thead className='thead'>
                                    <tr className='bg-dark text-light text-center'>
                                        <th className='bg-dark'>Type</th>
                                        <th className='bg-dark'>No Order</th>
                                        <th className='bg-dark'>BIN</th>
                                        <th className='bg-dark'>Quantity Order</th>
                                        <th className='bg-dark'>Quantity Shipped</th>
                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {this.state.General.outBounds.map((item, i) => (
                                        <tr className='text-center' key={i}>
                                            <td className='text-center'>{item.Type}</td>
                                            <td className='text-start'>{item.OrderNo}</td>
                                            <td>{item.BIN}</td>
                                            <td>{item.QuantityOrdered}</td>
                                            <td>{item.QuantityShipped}</td>
                                        </tr>
                                    ))

                                    }
                                    {this.state.General.purchaseOrders.map((item, i) => (
                                        <tr className='text-center' key={i}>
                                            <td className='text-center'>{item.Type}</td>
                                            <td className='text-start'>{item.OrdenNo}</td>
                                            <td>{item.BIN}</td>
                                            <td>{item.Quantity}</td>
                                            <td></td>
                                        </tr>
                                    ))

                                    }

                                </tbody>
                                <tfoot className='tfoot'>
                                    <tr className='bg-secondary text-light'>

                                    </tr>
                                </tfoot>

                            </table>
                        </div>
                    </div>
                    <div className='row pt-3'>
                        <div className='col-12 pt-5'>
                            <table className='table'>
                                <thead className='thead'>
                                    <tr className='bg-dark text-light text-center'>
                                        <th className='bg-dark'>Type</th>
                                        <th className='bg-dark'>No Order</th>
                                        <th className='bg-dark'>BIN</th>
                                        <th className='bg-dark'>New BIN</th>
                                        <th className='bg-dark'>Quantity Order<br />Old Quantity<br /> New Quantity</th>
                                        <th className='bg-dark'>Quantity Shipped</th>
                                        <th className='bg-dark'>Start Total Quantity</th>
                                        <th className='bg-dark'>End Total Quantity</th>
                                        <th className='bg-dark'>Username</th>
                                        <th className='bg-dark'>Date</th>

                                    </tr>
                                </thead>
                                <tbody className='tbody'>
                                    {this.state.General.generalHistoryFilter.map((item, i) => (
                                        <tr className='text-center' key={i}>
                                            <td className='text-start'>{item.Type}</td>
                                            <td className='text-start'>{item.NoOrder}</td>
                                            <td>{item.BIN}</td>
                                            <td>{item.BIN2}</td>
                                            <td>{item.QuantityOrder}</td>
                                            <td>{item.QuantityShipped}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{item.User}</td>
                                            <td>{item.Date}</td>
                                        </tr>
                                    ))

                                    }

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
