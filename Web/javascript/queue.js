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
	var orderElement = $('<section class="queue" id="order'+orderId+'"><ul></ul></section>');
	$('div#queueWindow').append(orderElement);
	var order = orders[index];
	$(orderElement).children('ul').append('<li class="orderName">'+order['fName']+' '+order['lName']+'</li>');
	$(orderElement).children('ul').append('<li class="orderTime"></li>');
	var clock = $('li').last();
	var timeSeed = order['timePlaced'];
	// startClock(clock, timeStamp);
	timeWrap(clock,timeSeed);
	$(orderElement).children('ul').append('<li class="orderBase">'+order['base_name']+'</li>');
	$(orderElement).children('ul').append('<li class="orderBread">'+order['bread_name']+'</li>');
	$(orderElement).children('ul').append('<li class="orderCheese">'+order['cheese_name']+'</li>');
	var toppings = "";
	for( var i in order['toppings']) {
		toppings += order['toppings'][i] + ', ';
		//$(orderElement).children('ul').append('<li>'+order['toppings'][i]+'<li>');
	}
	toppings = toppings.slice(0,toppings.length-2);
	$(orderElement).children('ul').append('<li class="orderToppings">'+toppings+'</li>');
	$(orderElement).children('ul').append('<span class="orderHelpMessage">click to bump</span>');

	orderElement.click(function(e) {
		console.log(orderElement);
		orderElement.remove();
		console.log(orderId+' '+userId);
		updateOrder(orderId, userId); //Server stuff
		updateSidebar();
		updateCurrentWindow();
	});
}
function timeWrap(clock, timeSeed) {
	timeSeed = new Date(timeSeed);
	startTime();
	console.log(timeSeed);
	function startTime() {
	    var today=new Date();
	    var waitTime = new Date(today-timeSeed);
	    var m=waitTime.getMinutes();
	    var s=waitTime.getSeconds();
	    m = checkTime(m);
	    s = checkTime(s);
	    clock.html(m+":"+s);
	    var t = setTimeout(function(){startTime()},500);
	}

	function checkTime(i) {
	    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
	    return i;
	}
}


function startClock(clock, startTime) {
	startTime = startTime.split(' ');
	var date = startTime[0].split('-');
	var time = startTime[1].split(':');
	var today = new Date;
	for(var i=0; i< 100; i++) {
		console.log(today);
		var orderTime = new Date(date[0],date[1]-1,date[2],time[0],time[1],time[2]);
		var waitTime = Math.round((today - orderTime)/1000);
		console.log(orderTime);
		console.log(waitTime);
		waitMinutes = Math.round(waitTime/60);
		waitSeconds = waitTime%60;
		console.log(waitMinutes+':'+waitSeconds);

		clock.html(waitMinutes+':'+waitSeconds);
		setTimeout(function(){}, 3000);
	}

	// var tYear = today.getFullYear();
	// var tMonth = today.getMonth() +1;
	// var tDay = today.getDay();
	// var tHour= today.getHours();
	// var tMinutes = today.getMinutes();
	// var tSeconds = today.getSeconds();
	// today = new Date(tYear, tMonth, tDay, tHour, tMinutes, tSeconds);
	// if (date[0] !== tYear || date[1] !== tMonth || date[2] !== tDay) {
	// 	clock.html("too old");
	// } else {
	// 	clock.html()
	// }

	// while (true) {
	// 	time = 0;
	// 	clock.html(""+time);
	// }
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
		$("#quantityList").append('<div>'+key+'<span>'+value+'</span></div>');
	}
}

// UPDATE PAGENUMBERS
function updatePagenumbers() {
	var maxPage = Math.ceil(orders.length/8);
	if (maxPage < 1) {
		maxPage = 1;
	}
	if (currentPage > maxPage) {
		currentPage--;
	}
	$('div.navigation img').removeClass('inactive');
	if (currentPage===1) {
		$('img[src*=prev]').addClass('inactive');
	}
	if(currentPage === maxPage) {
		$('img[src*=next]').addClass('inactive');
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
			getActiveOrders();
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
		url: rootURL + '/recall',
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
		url: rootURL + '/activeorders',
		dataType: 'json', // data type of response
		success: function(data){ 
			console.log(JSON.stringify(data));
			orders = data;
			updateSidebar();
			updateCurrentWindow();
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('Could not get orders from database');
			console.log(textStatus);
			console.log(errorThrown);
			console.log(jqXHR);
		}
	});
	console.log("done");
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
