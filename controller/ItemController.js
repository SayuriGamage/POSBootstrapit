import ItemModel from "../models/itemModel.js";
import {customer_array, item_array} from "../db/database.js";
import {loadItemBx} from "./OrderController.js";

// Validate unit price
const validateUnitPrice = (unitPrice) => {
    const unitPriceRegex = /^(?!0\.00)\d{1,8}(\.\d{1,2})?$/;
    return unitPriceRegex.test(unitPrice);
};

// Load items into the table
export const loadAllItemTable = () => {
    $("#itemTableBody").empty();
    item_array.forEach((item) => {
        let data = `<tr><td>${item.code}</td><td>${item.description}</td><td>${item.price}</td><td>${item.qtyOnHand}</td></tr>`;
        $("#itemTableBody").append(data);
    });
};

// Clear item form
const cleanItemForm = () => {
    $('#code').val("");
    $('#description').val("");
    $('#price').val("");
    $('#qtyOnHand').val("");
}

let selected_item_index=null;

$("#saveItem").on("click", function () {
    console.log("Save button clicked");

    // Get input values
    let code = $('#code').val();
    let description = $('#description').val();
    let price = $('#price').val();
    let qtyOnHand = $('#qtyOnHand').val();

    // Validation
    if (code.length === 0) {
        Swal.fire("Error", "Code cannot be empty", "error");
    } else if (description.length === 0) {
        Swal.fire("Error", "Description cannot be empty", "error");
    } else if (!validateUnitPrice(price)) {
        Swal.fire("Error", "Invalid price format", "error");
    } else if (isNaN(qtyOnHand) || qtyOnHand <= 0) {
        Swal.fire("Error", "Quantity on hand must be a positive number", "error");
    } else {

        let item = new ItemModel(code, description, price, qtyOnHand);
        console.log(item);

        item_array.push(item);


        cleanItemForm();
        loadAllItemTable();
        loadItemBx()

        Swal.fire("Success", "Item added successfully", "success");
    }
});

$('#itemTableBody').on('click','tr',function (){
    let index=$(this).index();

    selected_item_index=$(this).index();
    let item_obj=item_array[index];


    let code=item_obj.code;
    let description=item_obj.description;
    let price=item_obj.price;
    let qtyOnHand=item_obj.qtyOnHand;



    $('#code').val(code);
    $('#description').val(description);
    $('#price').val(price);
    $('#qtyOnHand').val(qtyOnHand);

});


$('#updateItem').on('click',function (){
   let index=selected_item_index;


   let code=$('#code').val();
   let description=$('#description').val();
   let price=$('#price').val();
   let qtyOnHand=$('#qtyOnHand').val();



   let item=new ItemModel(
       code,
       description,
       price,
       qtyOnHand
   );

   item_array[selected_item_index]=item;

   cleanItemForm();
   loadAllItemTable();
});

$("#deleteItem").on('click',function (){
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
            item_array.splice(selected_item_index, 1);

            // clean customer form
            cleanItemForm();

            // reload the table
            loadAllItemTable();
            // ==========================================================

            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
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











































































