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
                    <div className='container-fluid justify-content-center text-center bg-dark text-white pt-4'>
                       
                            <div className='logoFooter pt-2 pb-2'>
                            <img src='/assets/logoM.png' alt='MayalandSolutions'/>
                            
                            <p>Copyright &#169; {this.ActualYear()} Mayaland Solutions.<br/> All Rights Reserved.</p>      
                        </div>
                        
                    </div>
                    </div>
                    
                
            </React.Fragment>
        )
    }
}