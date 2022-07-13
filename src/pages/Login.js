import React, { Component } from 'react'
import "../css/login-style.css"
import Footer from '../components/Footer'
import { AiOutlineUser, AiOutlineKey, AiOutlineLogin } from 'react-icons/ai';
import { selectWithDataService } from '../services/auth/authservices';
import { getValueCookie, setNewCookie } from '../services/cookieService';
import {automaticCloseAlert} from'../functions/alerts'
import md5 from 'md5'
import { closeSession } from "../functions/closeSession"
import App from '../components/App';
import { OpenCompanyDashBoard, /*OpenLobby,*/ OpenLogin, OpenPurchaseOrder } from '../functions/pagesFunction';






export default class Login extends Component {

  state = {
    loginStorage: {
      userName: '',
      password: ''
    }
  }

  onChangeById = e => {
    var idState = e.target.id.split('_')
    const temp = this.state.loginStorage
    if (idState.length === 2) {
      temp[idState[1]] = e.target.value
    }

    this.setState({ loginStorage: temp })
  }

  onKeyDown = async e => {
    if (e.key === 'Enter') {
      await this.Login()
    }
  }

  componentDidMount(){
    if(getValueCookie('userName')){
      if(getValueCookie('Company')){
        //OpenLobby()
        OpenPurchaseOrder()
      }else{
        OpenCompanyDashBoard()
      }
    }else{
      OpenLogin()
    }
    
  }


  async Login() {
    const temp = this.state.loginStorage
    const btn = document.getElementById('btn_signin');
    const btn_logo = btn.innerHTML;
    const datos = {
      userName: temp.userName,
      password: md5(temp.password),
    }
    btn.innerHTML = 'Loading...';
    btn.disabled = true;
    const datos2 = await selectWithDataService(datos, "/login")
    if (datos2 != null) {
      if (datos2.status.code === 1) {
        if (datos2.token !== 'invalid') {
          await automaticCloseAlert('correct', 'Welcome: ' + datos2.data.name + " " + datos2.data.surname)
          setNewCookie('sessionAuthToken', datos2.token, 50)
          setNewCookie('userName', datos2.data.userName, 50)
          setNewCookie('name', datos2.data.name, 50)
          setNewCookie('surname', datos2.data.surname, 50)
          window.location.reload()
          //await OpenCompanyDashBoard()
        } else {
          closeSession()
          automaticCloseAlert('incorrect', 'Your  Username or Password are incorrect. Please try again')

        }
      }
    }
    btn.innerHTML = btn_logo;
    btn.disabled = false;
  }


  render() {

    return (
      <React.Fragment>
        <div id='login' className='page'>
          <div className='container-fluid pb-1'>
            <div className='container'>
              <div className='row pt-5 pb-3 d-flex justify-content-center'>
                <div className='col-9 contLogin'>
                  <div className="border border-5 border-primary"></div>
                  <div className='row d-flex justify-content-center pt-5   '>
                    <p className='display-2 '>Login</p>

                    <div className='row d-flex justify-content-center pt-5 pb-3'>
                      <div className='col-11'>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text"><AiOutlineUser /></span>
                          <input type="text" id='Login_userName' onChange={this.onChangeById} onKeyDown={this.onKeyDown} className="form-control" placeholder='Username' />
                        </div>
                      </div>
                    </div>
                    <div className='row d-flex justify-content-center pt-4 pb-3'>
                      <div className='col-11'>
                        <div className="input-group input-group-lg">
                          <span className="input-group-text"><AiOutlineKey /></span>
                          <input type="password" id='Login_password' onKeyDown={this.onKeyDown} onChange={this.onChangeById} className="form-control" placeholder='Password' />
                        </div>
                      </div>
                    </div>

                    <div className='row d-flex justify-content-center pt-4 pb-3 text-center'>
                      <div className='col-7'>
                        <button id='btn_signin' type="button" className="btn btn-primary btn-lg" onClick={() => this.Login()}>Sign in <AiOutlineLogin /></button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        
        <div id='App' className='page'>
          <App />
        </div>
      </React.Fragment>
    )
  }
}
