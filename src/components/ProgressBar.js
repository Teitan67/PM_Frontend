import React, { Component } from 'react'


export default  class ProgressBar extends Component {

    constructor(props){
        super(props);
        this.progressBarRef = React.createRef();
    }

    state = {
        min:0, 
        max:100,
        value:0,
        size:50
    }

    componentDidMount(){
        this.setValue(95);
    }

    
    configBar(min,max,size = 25){
        this.setState({min:min});
        this.setState({max:max});
        this.setState({value:min});
        this.setState({size:size});
    }

    setValue(valor){
        if(valor>=this.state.min && valor <= this.state.max){ 
            this.setState({value:valor});
        }else{
            console.error('ERROR: La cantidad en la progress bar no esta dentro de los limites establecidos, revise el codigo de configuración');
        }
    }

    render() {
        return (
            <div className="progress" style={{height: this.state.size+"px"}} ref={this.progressBarRef}>
                <div
                    className="progress-bar progress-bar-striped progress-bar-animated bg-primary "
                    role="progressbar"
                    aria-valuenow={this.state.value}
                    aria-valuemin={this.state.min}
                    aria-valuemax={this.state.max}
                    style={{ width: this.state.value+"%" }}>
                    {this.state.value}%
                </div>
            </div>
        )
    }
}

