import React, { Component } from 'react'
import ProgressBar from '../components/ProgressBar'
import { AiOutlineSearch } from "react-icons/ai"
import '../css/table-responsive.css'
import ModalOrders from '../components/ModalComponent';
import { getInformationNoData, create_Delete_Update_Information, getInformationWithData } from '../services/CABE';
import Swal from "sweetalert2";
import { getValueCookie } from '../services/cookieService';
import {automaticCloseAlert} from '../functions/alerts'

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
            habilitar: false,
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
            Detail: []
        }

    }

    componentDidMount() {
        this.ProgrressBarRef.current.setValue(0);
        this.getLastCycleInventory()
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
                await this.setState({ cycleInventoryStorage: temporal })
                await this.completePercentage()

            } else {
                const temporal = this.state.cycleInventoryStorage
                temporal.Detail = []
                await this.setState({ cycleInventoryStorage: temporal })
            }
        }
    }

    async startNewCycleInventory() {
        const data = {
            days: 0,
            userName: getValueCookie('userName')
        }
        Swal.fire({
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

            if (result) {
                await this.getLastCycleInventory()
                await Swal.fire({
                    title: `The Cycle Inventory was created!`,
                })

            }
        })
    }

    async endCycleInventory() {
        const data = {
            id: this.state.cycleInventoryStorage.Header.id,
            userName: getValueCookie('userName')
        }
        Swal.fire({
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
                        this.setState({porcetaje:0})
                        
                    } else {
                        Swal.fire('Cycle inventory could not be closed', '', 'error')
                    }

                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            }

        })
    }

    async setCycleInventoryDetailInfo(item){
        const temporal=this.state.cycleInventoryStorage
        const index=temporal.Detail.indexOf(item)
        if(index!==-1){
            temporal.Detail[index].countBy=getValueCookie('userName')
            temporal.Detail[index].difference=temporal.Detail[index].realQuantity-temporal.Detail[index].systemQuantity
            temporal.Detail[index].status=1
            
            const response=await create_Delete_Update_Information('/invertory/updateDetailCycle/post', temporal.Detail[index])
            if(response.status.code===1){
                await this.setState({cycleInventoryStorage:temporal})
                automaticCloseAlert('correct','The item was check!')
                await this.completePercentage()
            }else{
                automaticCloseAlert('incorrect','The item was not checked')
            }
        }
    }

    async updateCycleInventoryDetail(item){
        const temporal=this.state.cycleInventoryStorage
        const index=temporal.Detail.indexOf(item)
        if(index!==-1){
            temporal.Detail[index].countBy=null
            temporal.Detail[index].status=0    
            await this.setState({cycleInventoryStorage:temporal})
        }
            
    }
    completePercentage(){
        this.setState({porcetaje:0})
        var count=0;
        var total=this.state.cycleInventoryStorage.Detail.length

        for(const item of this.state.cycleInventoryStorage.Detail){
            if(item.status===1)
            count++
        }

        for(let a=0;a<((count*100)/total);a++){
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

    getChanges=async (e,item)=>{
        var identificator=e.target.id.split('_')
        if(identificator.length>0){
            const temporal=this.state.cycleInventoryStorage
            const index=temporal.Detail.indexOf(item)
            switch(identificator[0]){
                case "realQuantityCycleInv":
                    
                    if(index!==-1){
                        temporal.Detail[index].realQuantity=Number(e.target.value)
                        temporal.Detail[index].difference=Number(e.target.value)-temporal.Detail[index].systemQuantity
                        await this.setState({cycleInventoryStorage:temporal})
                    }
                    break;
                case "comentaryCycleInv":
                    if(index!==-1){
                        temporal.Detail[index].comentary=e.target.value
                        await this.setState({cycleInventoryStorage:temporal})
                    }
                    break;
                default:
                    break;
            }
        }
        
    }

    imprimirObjeto(){
        console.log(this.state.cycleInventoryStorage.Detail[0])
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
                                    <button className='btn btn-primary btn-lg w-100' hidden={this.state.cycleInventoryStorage.Header.status === 0} onClick={() => this.startNewCycleInventory()}> Start Cycle Inventory</button>
                                    <button className='btn btn-danger btn-lg w-100' hidden={this.state.cycleInventoryStorage.Header.status === 1} onClick={() => this.endCycleInventory()}> End Cycle Inventory</button>
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
                                <input type="text" className="form-control" placeholder='Search by ItemCode, BIN, Description, Category, UPC ...' />
                            </div>
                        </div>
                        <div className='col-5 text-start'>
                            <div className='row fw-bold'>
                            <div className='col-4'></div>
                            <div className='col-4'>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    All items
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault" />
                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                    No Checked Items
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="flexRadioDefault"/>
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
                                    {this.state.cycleInventoryStorage.Detail.map((item, i) => (
                                        <tr key={i}>

                                            <td>{item.ItemCode}</td>
                                            <td>{item.Description}</td>
                                            <td><input disabled={item.status === 1} type="number" defaultValue={item.realQuantity} id={"realQuantityCycleInv_"+item.id} className="form-control text-end" onChange={(e)=>this.getChanges(e,item)} /></td>
                                            <td className='text-center'>{item.BIN}</td>
                                            <td className='text-center'>{item.systemQuantity}</td>
                                            <td className='text-center'>{item.difference===null?"-":item.difference}</td>
                                            <td className='text-center'>{item.countBy===null?"-":item.countBy}</td>
                                            <td className='text-center'>{this.textStatus(item.status)}</td>
                                            <td><textarea disabled={item.status === 1} className="form-control" id={"comentaryCycleInv_"+item.id} defaultValue={item.comentary==='null'?'':item.comentary} onChange={(e)=>this.getChanges(e,item)} ></textarea></td>
                                            <td className='text-center'>
                                                <button type="button" className="btn btn-success" onClick={()=>this.setCycleInventoryDetailInfo(item)} hidden={item.status === 1}>Check</button>
                                                <button type="button" className="btn btn-danger" onClick={()=>this.updateCycleInventoryDetail(item)} hidden={item.status === 0}>Change</button>
                                            </td>
                                            <td className='text-center'><button type="button" className="btn btn-info">Detail</button></td>
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
