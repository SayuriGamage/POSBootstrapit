import ItemModel from "../models/itemModel.js";
import { item_array } from "../db/database";

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


        item_array.push(item);


        cleanItemForm();
        loadAllItemTable();

        Swal.fire("Success", "Item added successfully", "success");
    }
});
