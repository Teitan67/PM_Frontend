import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler } from 'chart.js';



export default class LineAreaGraph extends Component {

    constructor(props) {
        super(props)
        
        ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale,
            LinearScale,
            BarElement,
            Title, CategoryScale,
            LinearScale,
            PointElement,
            LineElement,
            Filler,
        );
    }

    state={
       
        data:{
            labels:[],
            datasets:[
                {
                    fill: true,
                    label: 'Quantity',
                    data: [],
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  }
            ]
        },
        options :{
            responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: '',
          },
        },
        }
    }


   

      async setTitle(text){
       const temporal=this.state.options
       temporal.plugins.title.text=text
       this.setState({options:temporal})
      }

      setLabels(labels){
        const temporal=this.state.data
        temporal.labels=labels
        this.setState({data:temporal})
      }
      setData (data){
        const temporal=this.state.data
        temporal.datasets[0].data=data
        this.setState({data:temporal})
      }

    render(){
        return(
            <React.Fragment>
                <Line options={this.state.options} data={this.state.data}></Line>
            </React.Fragment>
        )
    }
}






