import {order_array} from "../db/database.js";
import {customer_array} from "../db/database.js";
import {item_array} from "../db/database.js";
import {order_details} from "../db/database.js";
import CartModel from "../models/cartModel.js";


$("#cusTel").on('keypress',function (e){
    if(e.which === 13){
        let telephoneNo=$(this).val();
        searchCustomer(telephoneNo);
    }else {
        Alert("Customer not found");
    }
});

function searchCustomer(telephoneNo){
    let customer= customer_array.find(customer =>
        customer._mobile === telephoneNo);

    $("#cusName").val(customer._full_name);

}

export function loadItemBx(){
    $("#itCode").empty();
    item_array.map((item) =>{
        let data=`<option>${item._code}</option>`

        $("#itCode").append(data);
    })
}

$("#itCode").on('input', function () {
    let id = $(this).val();
    let item = item_array.find(item => item._code === id);

    if (item) {
        $("#itName").val(item._description);
        $("#uPrice").val(item._price);
        $("#qtyOnHand1").val(item._qtyOnHand);
    } else {
        // Clear fields if item is not found
        $("#itName").val("");
        $("#uPrice").val("");
        $("#qtyOnHand1").val("");
    }
});
 export const loadToCart =() =>{
     $("#orderTableBody").empty();

     cart_array.forEach((item) =>{
         let data= `<tr><td>${item.item_code}</td><td>${item.description}</td><td>${item.unitPrice}</td><td>${item.qty}</td><td>${item.total}</td></tr>`
    $("#orderTableBody").append(data);
     })
 }


export const setTotalValues = () => {
    let netTotal = cart_array.reduce((acc, item) => acc + item.total, 0);
    $("#netTotal").val(netTotal.toFixed(2));
    $("#subTotal").val(netTotal.toFixed(2));
   /* let cash=$('#cash').val();
    let balance=cash-netTotal;
    $("#balance").val(balance);*/
};


 export const clearQty = () =>{
     $('#qty').val("");
 };



let cart_array=[];

$("#addToCart").on("click",function (){
    let item_code=$('#itCode').val();
    let description=$('#itName').val();
    let price=$('#uPrice').val();
    let qty=$('#qty').val();
    let total=qty*price;

    let qtyOnHand=$("#qtyOnHand1").val();
    let qts=$("#qty").val();

    if(qts< qtyOnHand){
     let cart=new CartModel(
       item_code,
       description,
       price,
       qty,
       total
     )
        cart_array.push(cart);
     loadToCart();
     clearQty();
     setTotalValues();

      }

});

































