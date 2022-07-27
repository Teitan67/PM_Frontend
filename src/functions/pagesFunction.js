import { closeAllPages,openPage } from "./changeVisibility";
import { removeCookie } from "../services/cookieService";


export function CloseAllPages() {
    closeAllPages();
}

export async function OpenCompanyDashBoard() {
    CloseAllPages();
    var boton=document.getElementById('catalogueOfCompanyActioner')
    await boton.click()
    openPage( "App");
    openPage( "CompanyDashBoard");
}

export function OpenLobby() {
    CloseAllPages();
    openPage( "App")
    openPage( "GeneralPages")
    openPage( "Lobby")
    //OpenPikingSystem()
}

export async function OpenCycleInventory() {
    CloseAllPages();
    var boton=document.getElementById('actionatorCycleInventory')
    await boton.click()
    openPage( "App")
    openPage( "GeneralPages")
    openPage( "CycleInventory")
}
export function OpenCycleInventoryGraph(){
    CloseAllPages()
    openPage("App")
    openPage("GeneralPages")
    openPage("CycleInventoryGraph")
}

export async function OpenKPIGraph(){
    CloseAllPages()
    var boton=document.getElementById('actionatorKPI')
    await boton.click()
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
    openPage("Inventory")
}

export function OpenPikingSystem(){
    CloseAllPages()
    openPage("App");
    openPage("GeneralPages");
    openPage("PikingSystem");
}
export async function OpenPurchaseOrder(){
    CloseAllPages()
    var button=document.getElementById('vendorsFromPurchaseOrder')
    await button.click()
    openPage("App")
    openPage("GeneralPages")
    openPage("PurchaseOrder")
}

export function CloseCompanySession(){
    removeCookie('Company')
    OpenCompanyDashBoard()

}

export default{OpenLogin,CloseAllPages,OpenCycleInventory,OpenLobby,OpenCompanyDashBoard,OpenCycleInventoryGraph,CloseCompanySession}