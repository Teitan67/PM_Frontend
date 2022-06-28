import React, { Component } from 'react'
import '../css/table-responsive.css'
import { getInformationNoData } from '../services/CABE'
import BarGraph from '../components/BarGraph'
export default class KPI extends Component {
    constructor(props){
        super(props)
        this.BarGraph1=React.createRef()
        
    }


    state = {
        General:{
            KPIInfo:[],
            KPIInfoFilter:[]
        },
        GraphData:{

        }
    }

     componentDidMount() {
         this.getKPIInfo()
         
    }


    async getKPIInfo(){
        const temporal=this.state.General
        const data=await getInformationNoData('/reports/getKPI')
        temporal.KPIInfo=data
        temporal.KPIInfoFilter=data
        await this.setState({General:temporal})
        await this.generateGraphDays(data)
        
    }

    async generateGraphDays(data){
        this.BarGraph1.current.setTitle('Inventory Cycle Days')
     
        let labels=[]
        let completeInfo=[]
       
        for (const element of data) {
            labels.push('Cycle '+String(element.id))
            completeInfo.push(String(element.realQuantityDays))
        }
        
        var info={
            label: 'Days',
            data: completeInfo,
            backgroundColor:'rgb(17,131,29)',
            
        }
        await this.BarGraph1.current.setLabels(labels)     
        await this.BarGraph1.current.setData([info])
        
        
    }

    render() {
        return (
            <div className='KPI'>
                <p className='text-center display-1 pb-3' >Inventories of Hyperline</p>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10 tableFixHead tb-5'>
                        <table className='table'>
                            <thead>
                                <tr className='text-light text-center'>
                                    <th className='bg-dark'>Type of Inventory</th>
                                    <th className='bg-dark'>Cycle</th>
                                    <th className='bg-dark'>Full cycle count days</th>
                                    <th className='bg-dark'>Closing date</th>
                                    <th className='bg-dark'>Counted items</th>
                                    <th className='bg-dark'>Average binary accuracy</th>
                                    <th className='bg-dark'>Accuracy valued</th>
                                    <th className='bg-dark'>Adjustments</th>
                                    <th className='bg-dark'>Accuracy valued</th>
                                    <th className='bg-dark'>KPI result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.General.KPIInfoFilter.map((element,i)=>(
                                    <tr className= 'text-center' key={i}>
                                    <td>Cycle</td>
                                    <td>{element.id}</td>
                                    <td>{element.realQuantityDays}</td>
                                    <td>{element.realFinishDate2}</td>
                                    <td>{element.ItemsContados}</td>
                                    <td>{element.ExBinaria}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
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
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-5'>
                        <BarGraph ref={this.BarGraph1}/>
                    </div>
                    <div className='col-5'>
                        
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        )
    }

}