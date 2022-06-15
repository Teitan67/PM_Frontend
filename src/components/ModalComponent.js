import React from 'react';
import {Modal} from 'react-bootstrap'
import '../css/table-responsive.css'
const ModalOrders = (props) => {
    return (
      <>
      
        <Modal title={props.title} show={props.show} fullscreen={true} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className='container'>
              {props.children}
              </div>
          </Modal.Body>
        </Modal>
      </>
    );
}
 
export default ModalOrders;