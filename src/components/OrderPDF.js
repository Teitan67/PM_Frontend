import React, { Component } from 'react'
import "../css/general-style.css"
import { AiFillPrinter } from "react-icons/ai"
import ModalOrders from './ModalComponent'
import pdfConfig from '../pdfConfig/pdfConfig'
import { Document, Image, PDFViewer, View, Page, Text } from '@react-pdf/renderer'


export class OrderPDF extends Component {
    // eslint-disable-next-line
    constructor(props) {

        super(props)

    }

    state = {
        showModal: false
    }

    handleModalOpen = () => {
        this.setState({ showModal: true })
    }

    handleModalClose = () => {
        this.setState({ showModal: false })
    }


    render() {
        return (
            <React.Fragment>

                <div className="d-grid gap-2">
                    <button disabled={this.props.disabled} type="button" onClick={() => this.handleModalOpen()} className={"btn " + this.props.colorButton + " btn-lg"}>Print Order <AiFillPrinter /></button>
                </div>
                <ModalOrders title={this.props.title} show={this.state.showModal} close={() => this.handleModalClose()}>
                    <PDFViewer className="w-100" style={{ minHeight: "90vh" }}>
                        <Document>
                            <Page wrap>

                                {/*THIS IS THE HEADER OF THE DOCUMENT*/}
                                <View style={pdfConfig.HeaderStyle} fixed>
                                    <View style={pdfConfig.HeaderMargin}>
                                        <Image style={pdfConfig.BusinessLogo} src={this.props.companyLogo} />
                                        <View style={pdfConfig.ContactInfo}>
                                            {this.props.contactInfo.map((element, e) => (
                                                <Text key={e}>{element}</Text>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                                {/*ORDER INFO*/}
                                <View fixed style={pdfConfig.OrderInformation}>
                                    <View style={pdfConfig.OrderTitleStyle}>
                                        <Text>{this.props.OrderTitle}</Text>
                                    </View>
                                    <View style={pdfConfig.marginInfo}>
                                        <View style={pdfConfig.TitleStyle}>
                                            {this.props.OrderInfo1.map((element, e) => (
                                                <Text style={pdfConfig.TextSeparator} key={e}>{element}</Text>
                                            ))}
                                        </View>

                                        <View style={pdfConfig.TitleStyle}>
                                            {this.props.OrderInfo2.map((element, e) => (
                                                <Text style={pdfConfig.TextSeparator} key={e}>{element}</Text>
                                            ))}
                                        </View>

                                    </View>
                                </View>
                                
                                <View style={pdfConfig.Table}>
                                                <View fixed style={pdfConfig.CabeceraTabla}>
                                                    {['ItemCode', 'Description', 'BIN', 'Quantity Ordered','Quantity Received','Standar Cost','Total Cost'].map((tit, e) => (
                                                        e !== 1 ? <Text style={pdfConfig.ColumnaNormal} key={e}>{tit}</Text> : <Text style={pdfConfig.ColumnaGrande} key={e}>{tit}</Text>
                                                    ))}
                                                </View>

                                                {/*
                                                    this.state.Impresion.Productos.map((elemento, e) => (
                                                        e % 7 === 0 && e !== 0 ?
                                                            <View break key={e} style={PurchaseOrderPrint.CuerpoTabla}>
                                                                <View key={e} style={PurchaseOrderPrint.Fila}>{
                                                                    this.EncabezadoInfo(['item', 'description', 'BIN', 'Quantity'], elemento).map((fila, e2) => (
                                                                        e2 !== 1 ? <View style={PurchaseOrderPrint.ColumnaNormalCuerpo} key={e2}><Text  key={e2}>8{fila}</Text></View> : <View style={PurchaseOrderPrint.ColumnaGrandeCuerpo} key={e2}><Text key={e2}>{fila}</Text></View>
                                                                    ))
                                                                }</View>
                                                            </View>
                                                            :
                                                            <View key={e} style={PurchaseOrderPrint.CuerpoTabla}>
                                                                <View key={e} style={PurchaseOrderPrint.Fila}>{
                                                                    this.EncabezadoInfo(['item', 'description', 'BIN', 'Quantity'], elemento).map((fila, e2) => (
                                                                        e2 !== 1 ? <View style={PurchaseOrderPrint.ColumnaNormalCuerpo} key={e2}><Text  key={e2}>{fila}</Text></View> : <View style={PurchaseOrderPrint.ColumnaGrandeCuerpo} key={e2}><Text key={e2}>{fila}</Text></View>
                                                                    ))
                                                                }</View>
                                                            </View>
                                                    ))
                                                */
                                                }
                                                
                                                <View style={pdfConfig.CabeceraTabla}>
                                                    
                                                    {
                                                    /*
                                                    ['', 'Total', '', this.state.Impresion.Totales].map((tit, e) => (
                                                        e !== 1 ? <Text style={pdfConfig.ColumnaNormal} key={e}>{tit}</Text> : <Text style={pdfConfig.ColumnaGrande} key={e}>{tit}</Text>
                                                    ))
                                                    */}
                                                </View>
                                            </View>


                            </Page>
                        </Document>
                    </PDFViewer>
                </ModalOrders>
            </React.Fragment>
        )
    }
}

