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


let selected_customer_index=null;

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

$('#customerTableBody').on('click','tr',function (){
    let index=$(this).index();

    selected_customer_index=$(this).index();

    let customer_obj=customer_array[index];


    let full_name=customer_obj.full_name;
    let mobile=customer_obj.mobile;
    let email=customer_obj.email;
    let address =customer_obj.address;

    $('#name').val(full_name);
    $('#telephone').val(mobile);
    $('#email').val(email);
    $('#address').val(address);

});

$('#update').on('click',function (){
    let index=selected_customer_index;


    let full_name=$('#name').val();
    let mobile=$('#telephone').val();
    let email=$('#email').val();
    let address=$('#address').val();

    let customer=new CustomerModel(
        customer_array[index].id,
        full_name,
        mobile,
        email,
        address
    );

    customer_array[selected_customer_index] =customer;

    cleanCustomerForm();
    loadCustomerTable();
});


$("#delete").on('click',function (){
    const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
        confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
});
swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
}).then((result) => {
    if (result.isConfirmed) {

        // ==========================================================
        customer_array.splice(selected_customer_index, 1);

        // clean customer form
        cleanCustomerForm();

        // reload the table
        loadCustomerTable();
        // ==========================================================

        swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your customer has been deleted.",
            icon: "success"
        });
    } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
    ) {
        swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
        });
    }
});


});





































