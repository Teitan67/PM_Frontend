import React, { Component } from 'react'
import ProgressBar from '../components/ProgressBar'
import { AiOutlineSearch } from "react-icons/ai"
import '../css/table-responsive.css'

export default class CycleInvetory extends Component {

    constructor(props) {
        super(props);
        this.ProgrressBarRef = React.createRef();
    }

    state = {
        porcetaje: 0
    }

    componentDidMount() {
        this.ProgrressBarRef.current.setValue(0);
    }

    addValue(){
        let cantidad = this.state.porcetaje;
        cantidad++;
        this.setState({porcetaje:cantidad});
        this.ProgrressBarRef.current.setValue(cantidad);
    }

    render() {
        return (
            <div>
                <p className='text-center display-1' >Cylce Inventory</p>
                <p>Inventory complete:</p>
                <ProgressBar ref={this.ProgrressBarRef} />
                <button onClick={()=>this.addValue()}></button>
                <div>
                    <label className='w-75'>
                        Search:
                        <input className='form-control' placeholder='Search by ItemCode, BIN, Description, Category, UPC ...' />
                    </label>
                    <button className='btn btn-primary'><AiOutlineSearch /></button>
                    <p className='display-5'>Items</p>
                    <table className='table'>
                        <thead className='thead'>
                            <tr className='bg-dark text-light'>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Actual Quantity</th>
                                <th>System Quantity</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>2</td>
                                <td>3</td>
                                <td>4</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                            </tr>
                        </tbody>
                        <tfoot className='tfoot'>
                            <tr className='bg-secondary text-light'>
                                <td>9</td>
                                <td>9</td>
                                <td>9</td>
                                <td>9</td>
                                <td>9</td>
                            </tr>
                        </tfoot>

                    </table>
                </div>
            </div>
        )
    }
}
