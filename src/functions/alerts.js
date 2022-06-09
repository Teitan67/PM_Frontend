import Swal from "sweetalert2";



export const automaticCloseAlert=(type,message)=>{
    switch (type) {
        case "correct":
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
            break;

        case "incorrect":
            Swal.fire({
                icon: 'error',
                title: message,
                showConfirmButton: false,
                timer: 1500
            })
            break;

        default:
            break;
    }
}

export const confirmCloseAlert=(type,message)=>{
    switch (type) {
        case "correct":
            Swal.fire({
                icon: 'success',
                title: message,
                showConfirmButton: true, 
            })
            break;

        case "incorrect":
            Swal.fire({
                icon: 'error',
                title: message,
                showConfirmButton: true,
            })
            break;

        default:
            break;
    }
}

export default  {automaticCloseAlert,confirmCloseAlert}