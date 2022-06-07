import React, { Component } from 'react'
import "../css/login-style.css"
import Footer from '../components/Footer'
import { AiOutlineUser,AiOutlineKey } from 'react-icons/ai';
export default class Login extends Component {
  render() {
    return (
      <div className='container-fluid login'>
        <div className='container pb-4'>
          <div className='row pt-4 pb-3 d-flex justify-content-center'>
            <div className='col-11 contLogin'>
              <div className='row d-flex justify-content-center pt-5'>
                <div className='userImg'>
                  <img src='/assets/userico.png' alt='' />
                </div>

              </div>
              <div className='row d-flex justify-content-center pt-5 pb-3'>
                <div className='col-7'>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text"><AiOutlineUser/></span>
                    <input type="text" className="form-control" placeholder='Username'/>
                  </div>
                </div>
              </div>
              <div className='row d-flex justify-content-center pt-4 pb-3'>
                <div className='col-7'>
                  <div className="input-group input-group-lg">
                    <span className="input-group-text"><AiOutlineKey/></span>
                    <input type="password" className="form-control" placeholder='Password'/>
                  </div>
                </div>
              </div>

              <div className='row d-flex justify-content-center pt-4 pb-3 text-center'>
                <div className='col-7'>
                  <button type="button" className="btn btn-primary btn-lg">Login</button>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Footer />
      </div>


    )
  }
}
