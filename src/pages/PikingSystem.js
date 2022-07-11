import React, { Component } from 'react'
import Catalogue from '../components/Catalogue'

export default class PikingSystem extends Component {
    render() {
        return (
            <div>
                <p className='fs-1'>Piking System</p>
                <div className='form-group '>
                    <input className='form-control w-75 d-inline fs-3' disabled />
                    <button className='btn btn-success d-inline fs-3 w-25'>Sales order mode</button>
                </div>
                <div>
                    <label className='w-50'>
                        Order name:
                        <input className='form-control' disabled />
                    </label>
                    <label className='w-50'>
                        Order by:
                        <input className='form-control' disabled />
                    </label>

                </div>
                <div>
                    <p className='bg-primary text-white p-2 fs-3 text-center'>Piking list</p>
                    <div className='pb-5 bg-light'>
                        <label className='w-100 '>
                            Search by UPC:
                            <input className='form-control ' placeholder='Scanner...' />
                        </label>
                        <div className='w-100'>
                            <Catalogue nombrePadre={'PickinSystem'} Padre={this} />
                        </div>

                    </div>
                    <table className='table'>
                        <thead className='thead bg-secondary text-white'>
                            <tr>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Quantity Ordered</th>
                                <th>Weight</th>
                                <th>Total Weight</th>
                                <th>BIN</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot className='tfoot bg-dark text-white'>
                            <tr>
                                <td></td>
                                <td>Totals</td>
                                <td>0</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                    <p className='bg-primary text-white p-2 fs-3 text-center'>Picked up list</p>
                    <table className='table'>
                        <thead className='thead bg-secondary text-white'>
                            <tr>
                                <th>Item Code</th>
                                <th>Description</th>
                                <th>Quantity Ordered</th>
                                <th>Quantity Shipped</th>
                                <th>Weight</th>
                                <th>Total Weight</th>
                                <th>BIN</th>
                                <th>Comments</th>
                            </tr>
                        </thead>
                        <tbody className='tbody'>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                        <tfoot className='tfoot bg-dark text-white'>
                            <tr>
                                <td></td>
                                <td>Totals</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

            </div>
        )
    }
}
