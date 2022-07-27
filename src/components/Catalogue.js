import React, { Component } from 'react'
import CartaProducto from './CartaProducto'
import { getInformationNoData } from '../services/CABE.js'


export default class Catalogue extends Component {

    constructor(props) {
        super(props);
        this.retornarProducto = React.createRef();
    }

    state = {
        Catalogo: [],
        ProductosMostrados: []
    }

    async obtenerProductos() {
        const buscador = document.getElementById('catalogo_busqueda');
        const Enpoint = '/Items/get'
        const respuesta = await getInformationNoData(Enpoint);
        
        if (respuesta.status.code === 1) {
            this.setState({ Catalogo: respuesta.data });
            this.setState({ ProductosMostrados: respuesta.data });
        }
        buscador.value='';
        setTimeout( ()=>{buscador.focus();}, 300);
    }

    buscarProductos = e => {
  
            let busqueda = e.target.value;
            let Productos = this.state.Catalogo.filter((producto) => {
                if (((
                        this.contiene(producto.itemCode,busqueda)
                    ||  this.contiene(producto.abbreviatedDesc,busqueda)
                    ||  this.contiene(producto.upc,busqueda))
                    )
                ) {
                    return producto
                } else {
                    return null
                }
            });
            this.setState({ ProductosMostrados: Productos });
    }

    contiene(parametro,busqueda){
        return parametro.toString().toLowerCase().includes(busqueda.toLocaleLowerCase())
    }

    getProducto(producto){
        //Aqui asignamos el producto al estado del padre
        const Padre = this.props.Padre
        const Products = Padre.state.products;
        producto.BIN="";
        producto.unitCost=0;
        producto.originalUnitCost=0;
        producto.quantityOrdered=0;
        producto.quantityReceived=0;
        producto.totalCost=0;
        Products.push(producto);
        Padre.setState({products:Products});
        
    }

    render() {
        return (
            <React.Fragment>
                <button type="button" disabled={this.props.disabled} className="btn catalogueOpen btn-lg w-100" data-bs-toggle="modal" data-bs-target={"#Catalogo" + this.props.nombrePadre} onClick={() => this.obtenerProductos()}>Open Catalogue </button>
                <div className="modal fade" id={"Catalogo" + this.props.nombrePadre} tabIndex="-1" aria-labelledby="catalogoModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="catalogoModalLabel">Catalogue</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body ">
                                <div className='row form-group pt-4'>
                                    <input className='form-control' placeholder='Search by ItemCode,BIN,Description...' id='catalogo_busqueda' onKeyUp={this.buscarProductos} />
                                </div>
                                <div className='row'>
                                    {
                                        this.state.ProductosMostrados.map((producto, i) => (
                                            <div key={i} className='col-6 ' data-bs-dismiss="modal" onClick={()=>this.getProducto(producto)}>
                                                <CartaProducto ItemCode={producto.itemCode} Description={producto.abbreviatedDesc} OnHand={producto.OnHand} UPC={producto.upc} />
                                            </div>
                                        ))
                                    }
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
