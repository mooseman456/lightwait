//  Queue Javascript
//	Lightwait Project
//	Created 4/4/14 by Luke Oglesbee

//	TODO: Display orders as they come.  As it is now you must refresh the page



const rootURL = "api/index.php"
var orders = [];
var currentPage=1;
var maxPage=1;


$(document).ready(function() {
   getActiveOrders();
   
   /***********************/
   /*   Event Listeners   */
   /***********************/

   //Previous page arrow
   $('div.navigation img[alt~="Previous"]').click(function() {
      if (currentPage > 1)
         currentPage--;
      updatePagenumbers();
      updateCurrentWindow();
   });
   
   //Next page arrow
   $('div.navigation img[alt~="Next"]').click(function() {
      if(currentPage < Math.ceil(orders.length)/8) {
         currentPage++;
      }
      updatePagenumbers();
      updateCurrentWindow();
   });

   //Recall button
   $("#recall").click(function() {
      console.log("You clicked the recall button");
      recallOrder();
      getActiveOrders();
      //updateCurrentWindow();
   });
});

/***************************/
/*  Content Manipulaters   */
/***************************/

// UPDATE CURRENT WINDOW
// 
function updateCurrentWindow() {
  $('div.window').empty();
  updatePagenumbers();
  if (orders.length==0) {
     $('div.window').append('<h1>No pending orders</h1>');
  } else {
     for(var i=(currentPage-1)*8; i<currentPage*8 && i < orders.length; i++) {
        pushOrderToWindow(i);
     }
  }
}

// PUSH ORDER TO WINDOW
// Takes an element from the order array and appends it to the end of the order window
function pushOrderToWindow(index) {
  var orderId = orders[index].order_id;
  var timeStamp = orders[index].timePlaced;
  var orderElement = $('<section class="queue" id="order'+orderId+'"><h1>Order #'+orderId+'</h1><ul></ul></section>');
  $('div.window').append(orderElement);
  $.each(orders[index], function(key,val) {
     if ($.isArray(val)) {
        val.forEach( function(item) {

           $(orderElement.children('ul')).append('<li>'+item+'</li>');
        });
     } else {
        $(orderElement.children('ul')).append('<li>'+val+'</li>');
     }
  });
  orderElement.append('<button class="bump">Bump</button>');

  orderElement.children('button').click(function(event) {
     console.log("bumped");
     orderElement.remove();
     orders.splice(index,1);
     updateOrder(orderId);
     updatePagenumbers();
     updateSidebar();
     updateCurrentWindow();
  });
}

// UPDATE SIDEBAR
// Takes an array of JSON orders
// Sets the number of bases in the side panel
// Returns nothing
function updateSidebar() {
  var baseTypeCount = [];
  for(var i=0; i < orders.length; i++) {
     //If the base is not in baseTypeCount, add the key to baseTypeCount
     if( baseTypeCount[orders[i].Base] ){
        baseTypeCount[orders[i].Base] += 1;
     //Else, incrment that element
     } else {
        baseTypeCount[orders[i].Base] = 1;
     }
     // TODO:
     // Add the info in baseTypeCount to the html
  }
}

// UPDATE PAGENUMBERS
function updatePagenumbers() {
  $('#page_number').html((currentPage) + "/" + Math.ceil(orders.length/8));
}


/************/
/*   AJAX   */
/************/
// Update Order
function updateOrder(id) {
  console.log(id);
  $.ajax({
     type: 'PUT',
     contentType: 'application/json',
     url: rootURL + "/" + id,
     dataType: "text",
     data: id,
     success: function(data, textStatus, jqXHR){
        console.log("Order uploaded");
        console.log(data, textStatus, jqXHR);
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Order upload failed");
        console.log(jqXHR, textStatus, errorThrown);
     }
  });
}

// Recall Order
function recallOrder() {
  console.log("RECALL");
  $.ajax({
     type: 'GET',
     url: rootURL + "/recall",
     async: false,
     success: function(data, textStatus, jqXHR){
        console.log("Order recalled");
        console.log(data, textStatus, jqXHR);
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Order recall failed");
        console.log(jqXHR, textStatus, errorThrown);
     }
  });
}

// Get Active Orders
function getActiveOrders() {
  $.ajax({
     type: 'GET',
     url: rootURL + "/activeorders",
     dataType: "json", // data type of response
     success: function(data){ 
        orders = data;
        console.log(orders); //DEBUG
        console.log(data);
        
        updateSidebar();

        updateCurrentWindow();
     }
  });
}




