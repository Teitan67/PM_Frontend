import  {StyleSheet } from '@react-pdf/renderer'

const pdfConfig=StyleSheet.create({

    HeaderStyle:{
        backgroundColor:"rgb(20, 42, 77)",
        color:"rgb(255, 255, 255)",
    },
    HeaderMargin:{
        top:"45px",
        height:"150px"
    },

    BusinessLogo:{
        width:"150px",
        left:"35px",
        top:"10px"
    },
    ContactInfo:{
        textAlign:"justify",
        fontSize:"14px",
        top:"-30px",
        left:"220px"
    },
//backgroundColor:"rgb(69, 71, 74)",
    marginInfo:{
        width:"80%",
        marginLeft:"10%",
        padding:"20px",
        display: "flex",
        flexDirection: "row",
        marginBottom:"8px",
        color:"rgb(255, 255, 255)"

    },
    OrderTitleStyle:{
        color:"rgb(255, 255, 255)",
        textAlign:"center",
        fontSize:"20px",
        marginTop:"4px"
    },
    OrderInformation:{
        width:"100%",
        backgroundColor:"rgb(69, 71, 74)",
    },
    TitleStyle:{
        textAlign:"left",
        fontSize:"14px",
        width:"50%",
    },

    TextSeparator:{
        marginBottom:"4px"
    },
    InfoEncabezadoStyle:{
        width:"30%",
        fontSize:"12px",
    },
    TextSeparator2:{
        marginTop:"1px",
        marginBottom:"3.5px"
    },

    Table:{
        width:"80%",
        marginLeft:"10%",
        
    },

    CabeceraTabla:{
        width:"100%",
        backgroundColor:"#000000",
        color:"#F0FFFF",
        textAlign:"center",
        padding:"8px",
        fontSize:"14px",
        display: "flex",
        flexDirection: "row",
    },

    ColumnaNormal:{
        width:"15%",
        textAlign:"center",
        fontSize:"14px",
    },

    ColumnaGrande:{
        width:"54%",
        textAlign:"center",
        fontSize:"14px",
    },
    CuerpoTabla:{
        width:"100%",
        textAlign:"center",
        padding:"8px",
        fontSize:"11px",
        
        
    },
    ColumnaGrandeCuerpo:{
        width:"54%",
        fontSize:"9px",
        textAlign:"justify",
        padding:"8px",
    },
    ColumnaNormalCuerpo:{
        width:"15%",
        textAlign:"center",
        display:"block",
        marginTop:"1.2%"
    },

   

    Fila:{
        width:"100%",
        display: "flex",
        flexDirection: "row",
    }

    
   
});

export default pdfConfig;