import React, { Component } from 'react';
import "../css/footer-style.css"

export default class Footer extends Component{

    ActualYear(){
        const time=new Date()
        var year=time.getFullYear()
        return year.toString()
    }


    render(){
        return(
            <React.Fragment>
                    <div className='GenFooter'>
                    <div className='row text-center bg-dark text-white pt-3'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            <div className='logoFooter pb-3'>
                            <img src='/assets/logoM.png' alt='MayalandSolutions'/>
                            </div>
                            <p>Copyright &#169; {this.ActualYear()} Mayaland Solutions.<br/> All Rights Reserved.</p>      
                        </div>
                        <div className='col-1'></div>
                    </div>
                    </div>
                    
                
            </React.Fragment>
        )
    }
}