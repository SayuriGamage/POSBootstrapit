


let customer_array = [];

// Function to load the customer data into the table
let loadCustomerTable = () => {
    $("#customerTableBody").empty(); // Clear the table before adding new rows
    customer_array.map((customer, index) => {
        let data = `
            <tr>
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.tel}</td>
                <td>${customer.address}</td>
                <td><button class="btn btn-sm btn-secondary select-btn" data-index="${index}">Select</button></td>
            </tr>`;
        $("#customerTableBody").append(data);
    });
};


// Save button click event handler
$("#save").on("click", function () {
    console.log("click add customer button");

    // Get input values
    let id = $("#id").val();
    let name = $("#name").val();
    let tel = $("#tel").val();
    let address = $("#address").val();

    console.log("Customer Data: ", id, name, tel, address);

    // Create a new customer object
    let customer = {
        id: id,
        name: name,
        tel: tel,
        address: address
    };

    customer_array.push(customer);

    console.log("Customer Array: ", customer_array);

    // Reload the customer table
    loadCustomerTable();

    // Reset the form fields
    $("#customerForm")[0].reset();
});

// Variable to store the selected customer's index
let selectedCustomerIndex = null;

// Handle "Select" button click for updating customer
$(document).on("click", ".select-btn", function () {
    selectedCustomerIndex = $(this).data("index");
    const customer = customer_array[selectedCustomerIndex];

    // Populate the form with the selected customer data
    $("#id").val(customer.id);
    $("#name").val(customer.name);
    $("#tel").val(customer.tel);
    $("#address").val(customer.address);
});

// Update button click event handler
$("#update").on("click", function () {
    console.log("click update customer button");

    if (selectedCustomerIndex !== null) {
        // Get updated input values
        let id = $("#id").val();
        let name = $("#name").val();
        let tel = $("#tel").val();
        let address = $("#address").val();

        // Update customer data in the array
        customer_array[selectedCustomerIndex] = {
            id: id,
            name: name,
            tel: tel,
            address: address
        };

        console.log("Updated Customer Array: ", customer_array);

        // Reload the customer table with updated data
        loadCustomerTable();

        // Reset the form and selected index
        $("#customerForm")[0].reset();
        selectedCustomerIndex = null;
    } else {
        console.log("No customer selected for update");
    }
});

$("#delete").on("click",function (){
    console.log("click delete customer button");

    if(selectedCustomerIndex !== null){
       customer_array.splice(selectedCustomerIndex,1);

       loadCustomerTable();

       $("#customerForm")[0].reset();
       selectedCustomerIndex=null;


    }else {
        console.log("no customer selected for deletion");
    }
});


