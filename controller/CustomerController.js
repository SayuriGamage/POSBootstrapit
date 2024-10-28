// Import CustomerModel and customer_array (verify the import paths)
import CustomerModel from "../models/customerModel.js";
import { customer_array } from "../db/database.js";



const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

const validateMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
}


export const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.forEach((item) => {
        let data = `<tr><td>${item.full_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td></tr>`;
        $("#customerTableBody").append(data);
    });
};


const cleanCustomerForm = () => {
    $('#name').val("");
    $('#telephone').val("");
    $('#email').val("");
    $('#address').val("");
};


//add customer
$("#save").on("click", function () {
    console.log("Save button clicked");

    // Get input values
    let full_name = $('#name').val();
    let mobile = $('#telephone').val();
    let email = $('#email').val();
    let address = $('#address').val();


   if(full_name.length===0){
       Swal.fire({
           icon:"error",
           title:"Invalid Input",
           text:"Invalid full name"
       });

   } else if(!validateMobile(mobile)) {
       Swal.fire({
           icon: "error",
           title: "Invalid Input",
           text: "Invalid Mobile",
       });
   }else if(!validateEmail(email)) {
       Swal.fire({
           icon: "error",
           title: "Invalid Input",
           text: "Invalid Email",
       });
   }else if(address.length===0) {
       Swal.fire({
           icon: "error",
           title: "Invalid Input",
           text: "Invalid Address",
       });
   }else {
       let customer = new CustomerModel(
           customer_array.length + 1,
           full_name,
           mobile,
           email,
           address
       );

       // Push customer to array
       customer_array.push(customer);

       // Clear form and reload table
       cleanCustomerForm();
       loadCustomerTable();

       Swal.fire("Success", "Customer added successfully", "success");
   }
});
