import React, { Component } from 'react'
import { Pie,Doughnut, Bar,Line } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title,PointElement,LineElement,Filler } from 'chart.js';
import { faker } from '@faker-js/faker';
export default class CycleInvetoryGraph extends Component {
    state = {

    }
    constructor(){
        super()
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
    componentDidMount() {

    }

    datapie={
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
    }

    optionsbar = {
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
          },
        },
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      };
      
    labels=['January', 'February', 'March', 'April', 'May', 'June', 'July']
      
       databar = {
        labels:this.labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: this.labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
          },
          {
            label: 'Dataset 2',
            data: this.labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(75, 192, 192)',
            stack: 'Stack 0',
          },
          {
            label: 'Dataset 3',
            data: this.labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 1',
          },
        ],
      };

      optionsarea = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

      dataarea = {
        labels:this.labels,
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: this.labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

      optionsLine2 = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

      databars = {
        labels:this.labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: this.labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: this.labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };
    render() {
        return (
            <div className='CycleInventoryReport'>
                <p className='text-center display-1 pb-2' >Cycle Inventory Graphs</p>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <select className="form-select form-select-lg mb-3" aria-label="select option">
                            <option selected>Select an old Cycle Inventory to see they graphs</option>
                            <option value="1">Cycle Invetory No. 1 06/20/2022-06/27/2022</option>
                            <option value="1">Cycle Invetory No. 2 06/29/2022-07/27/2022</option>
                            <option value="1">Cycle Invetory No. 3 08/15/2022-08/30/2022</option>
                        </select>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row pb-4'>
                    <div className='col'>
                        <p className='text-center display-4 pb-3' >Example Pie Graph</p>
                        <Pie data={this.datapie}></Pie>
                    </div>
                    <div className='col'>
                        <p className='text-center display-4 pb-3'>Example Doughnut Graph</p>
                        <Doughnut data={this.datapie}></Doughnut>
                    </div>            
                </div>
                <div className='row pb-4'>
                    <div className='col'>
                        <p className='text-center display-4 pb-3' >Example Bar Graph</p>
                        <Bar options={this.optionsbar} data={this.databar}></Bar>
                    </div>
                    <div className='col'>
                        <p className='text-center display-4 pb-3'>Example Line Graph</p>
                        <Line options={this.optionsarea} data={this.dataarea}></Line>
                    </div>            
                </div>
                <div className='row pb-4'>
                    <div className='col'>
                        <p className='text-center display-4 pb-3' >Example Another Line Graph</p>
                        <Line options={this.optionsLine2} data={this.databar}></Line>
                    </div>
                    <div className='col'>
                        <p className='text-center display-4 pb-3'>Example Bars Graph</p>
                        <Bar options={this.optionsLine2} data={this.databars}></Bar>
                    </div>            
                </div>
            </div>
        )
    }

}