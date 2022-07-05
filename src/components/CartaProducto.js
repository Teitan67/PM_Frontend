import React, { Component } from 'react'
import '../css/CartaProducto.css'


export default class CartaProducto extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div className="conteiner cartaHover" >
                <div className="row">
                    <div className="col-6 imgC ">
                        <img src={"./assets/notavailable.png"} alt="Card  cap" className='imgC'/>
                    </div>
                    <div className="col-6">
                        <div className="row text-start pt-5">
                            <h5 className="card-title">{this.props.ItemCode}</h5>
                        </div>
                        <div className="row text-start">
                            <p className="card-text fs-6">{this.props.Description}</p>
                        </div>
                        <div className="row text-start" >
                            <p className="card-text fs-5"><b>OnHand:</b> {this.props.OnHand}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
