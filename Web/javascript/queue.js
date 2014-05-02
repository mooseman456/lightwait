//  Queue Javascript
//	Lightwait Project
//	Created 4/4/14


const rootURL = "api/index.php"
var orders = [];
var currentPage=1;


$(document).ready(function() {
    getActiveOrders();

    /** Set height of queueWindow to fill remaining window afer navbar */
    setHeight();
    $(window).resize(function() {
    	setHeight();
    });

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
		recallOrder();
		getActiveOrders();
		//updateCurrentWindow();
    });
});

/***************************/
/*  Content Manipulaters   */
/***************************/

// UPDATE CURRENT WINDOW
// Add items in the order array to the window
function updateCurrentWindow() {
	$('div#queueWindow').empty();
	updatePagenumbers();
	if (orders.length==0) {
		$('div#queueWindow').append('<h1>No pending orders</h1>');
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
	var userId = orders[index].user_id;
	var timeStamp = orders[index].timePlaced;
	var orderElement = $('<section class="queue" id="order'+orderId+'"><h1>Order #'+orderId+'</h1><ul></ul></section>');
	$('div#queueWindow').append(orderElement);
	$.each(orders[index], function(key,val) {
		if ($.isArray(val)) {
			val.forEach( function(item) {
				if (item !== null)
			   		$(orderElement.children('ul')).append('<li>'+item+'</li>');
			});
		} else {
			if (val !== null)
				$(orderElement.children('ul')).append('<li>'+val+'</li>');
		}
	});

	orderElement.click(function(event) {
		orderElement.remove();
		orders.splice(index,1);
		updateOrder(orderId, userId); //Server stuff
		updateSidebar();
		updateCurrentWindow();
	});
}

// UPDATE SIDEBAR
// Takes an array of JSON orders
// Sets the number of bases in the side panel
// Returns nothing
function updateSidebar() {
	$("#quantityList").empty();
	var baseTypeCount = [];
	for(var i=0; i < orders.length; i++) {
		//If the base is not in baseTypeCount, add the key to baseTypeCount
		if( baseTypeCount[orders[i].base_name] ){
			baseTypeCount[orders[i].base_name] += 1;
		//Else, incrment that element
		} else {
		baseTypeCount[orders[i].base_name] = 1;
		}
	//add base Type Count to sidebar
	}
	for(var key in baseTypeCount) {
		var value = baseTypeCount[key];
		$("#quantityList").append("<span>"+key+"="+value+"</span><br/>");
	}
}

// UPDATE PAGENUMBERS
function updatePagenumbers() {
	var maxPage = Math.ceil(orders.length/8);
	if (maxPage < 1) {
		maxPage = 1;
	}
 	$('#page_number').html((currentPage) + "/" + maxPage);
}


/************/
/*   AJAX   */
/************/
// Update Order
function updateOrder(orderid, userid) {
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + orderid + '/' + userid,
		success: function(){

		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log("Order upload failed");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}

// Recall Order
function recallOrder() {
	$.ajax({
		type: 'GET',
		url: rootURL + "/recall",
		async: false,
		success: function(){

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
			console.log(JSON.stringify(data));
			updateSidebar();
			updateCurrentWindow();
		}
	});
}

function updateQuantity(type, id) {
	$.ajax({
		type: 'PUT',
		url: rootURL + '/' + type +'/' +id,
		dataType: "json", // data type of response
		success: function(data, textStatus, jqXHR){
			console.log("Order recalled");
			console.log(data, textStatus, jqXHR);
		}
	});
}

/*   Random helpers   */
function setHeight() {
	var navbarHeight = $('nav').height();
    var windowHeight = $(window).height();
    var contentHeight = windowHeight-navbarHeight;
    $('div#queueWindow').height(contentHeight);
    $('div#sidebar').height(contentHeight);
}
