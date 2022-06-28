import { displayPage } from "./changeVisibility";

export  function CloseAllPages(){
    //In this part you need add all new pages!!!
    displayPage("none","CompanyDashBoard")
    displayPage("none","App")
    displayPage("none","login")
    displayPage("none","GeneralPages")
    displayPage("none","Lobby")
    displayPage("none","CycleInventory")
    displayPage("none","CycleInventoryGraph")
    displayPage("none","KPIGraph")
}

export  function OpenCompanyDashBoard(){
    CloseAllPages()
    displayPage("","App")
    displayPage("","CompanyDashBoard")
}

export  function OpenLobby(){
   CloseAllPages()
    displayPage("","App")
    displayPage("","GeneralPages")
    displayPage("","Lobby")
}

export  function OpenCycleInventory(){
    CloseAllPages()
    displayPage("","App")
    displayPage("","GeneralPages")
    displayPage("","CycleInventory")
}
export  function OpenCycleInventoryGraph(){
    CloseAllPages()
    displayPage("","App")
    displayPage("","GeneralPages")
    displayPage("","CycleInventoryGraph")
}

export  function OpenKPIGraph(){
    CloseAllPages()
    displayPage("","App")
    displayPage("","GeneralPages")
    displayPage("","KPIGraph")
}

export  function OpenLogin(){
    CloseAllPages()
    displayPage("","login")
}

export default{OpenLogin,CloseAllPages,OpenCycleInventory,OpenLobby,OpenCompanyDashBoard,OpenCycleInventoryGraph}