import { closeAllPages,openPage } from "./changeVisibility";
import { removeCookie } from "../services/cookieService";


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

export  function OpenInventory(){
    CloseAllPages()
    openPage("App")
    openPage("GeneralPages")
    openPage("Inventory")//arreglar
}

export function CloseCompanySession(){
    removeCookie('Company')
    OpenCompanyDashBoard()

}

export default{OpenLogin,CloseAllPages,OpenCycleInventory,OpenLobby,OpenCompanyDashBoard,OpenCycleInventoryGraph,CloseCompanySession}