import { closeAllPages,openPage } from "./changeVisibility";


export function CloseAllPages() {
    closeAllPages();
}

export function OpenCompanyDashBoard() {
    CloseAllPages();
    openPage( "App");
    openPage( "CompanyDashBoard");
}

export function OpenLobby() {
    CloseAllPages();
    openPage( "App")
    openPage( "GeneralPages")
    openPage( "Lobby")
}

export function OpenCycleInventory() {
    CloseAllPages();
    openPage( "App")
    openPage( "GeneralPages")
    openPage( "CycleInventory")
}
export  function OpenCycleInventoryGraph(){
    CloseAllPages()
    openPage("App")
    openPage("GeneralPages")
    openPage("CycleInventoryGraph")
}

export  function OpenKPIGraph(){
    CloseAllPages()
    openPage("App")
    openPage("GeneralPages")
    openPage("KPIGraph")
}

export function OpenLogin() {
    CloseAllPages();
    openPage( "login")
}

export default{OpenLogin,CloseAllPages,OpenCycleInventory,OpenLobby,OpenCompanyDashBoard,OpenCycleInventoryGraph}
