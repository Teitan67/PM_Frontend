import ReactExport from 'react-data-export';
import React from 'react';
import {AiFillFileExcel } from "react-icons/ai"
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet

const ExcelDocument=(props)=>{
    return(
        <>
        
        <ExcelFile  element={<button type="button" hidden={props.hidden} className="btn btn-success btn-lg w-100 h-100">Download Report In XLSX <AiFillFileExcel/></button>} filename={props.archname}>
            <ExcelSheet dataSet={props.data} name={props.sheetname}/>
        </ExcelFile>
        
        
        </>
    )
}

export default ExcelDocument