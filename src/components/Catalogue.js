import React, { Component } from 'react'
import CartaProducto from './CartaProducto'
import {getInformationNoData} from '../services/CABE.js'
import server from '../services/Connection/backEndLink'

export default class Catalogue extends Component {

    state={
        Catalogo:[],
        ProdcutosMostrados:[]
    }

    async obtenerProductos(){
        const Enpoint = '/Items/get'
        console.log( await getInformationNoData(Enpoint));
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" className="btn catalogueOpen btn-lg w-100" data-bs-toggle="modal" data-bs-target={"#Catalogo" + this.props.nombrePadre} onClick={()=>this.obtenerProductos()}>Open Catalogue </button>
                <div className="modal fade" id={"Catalogo" + this.props.nombrePadre} tabIndex="-1" aria-labelledby="catalogoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="catalogoModalLabel">Catalogue</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body container">
                                <div className='row form-group pt-4'>
                                    <input className='form-control' placeholder='Search by ItemCode,BIN,Description...'/>
                                </div>
                                <div className='row'>
                                    <div className='col-6 ' data-bs-dismiss="modal">
                                        <CartaProducto ItemCode={'FARMCA1006'} Description={'Descripcion de Farcma 1006 para ver cmo se ve 16x35 onz (libras)'} OnHand={'23'} />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
