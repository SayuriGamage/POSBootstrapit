let customer_array = [];

// Function to load the customer data into the table
let loadCustomerTable = () => {
    $("#customerTableBody").empty(); // Clear the table before adding new rows
    customer_array.map((customer) => {
        let data = `<tr><td>${customer.id}</td><td>${customer.name}</td><td>${customer.tel}</td><td>${customer.address}</td></tr>`;
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
