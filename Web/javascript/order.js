var rootURL = "api/index.php";

$(document).ready(function(){
    getMenuData();

    
});

function updateScroller(currentIndex) {
    
        // Remove old click listeners
        $('#orderWrapper').children().eq(currentIndex-1).unbind();
        $('#orderWrapper').children().eq(currentIndex).unbind();
        $('#orderWrapper').children().eq(currentIndex+1).unbind();

        $('#orderWrapper').children().eq(currentIndex-1).find('input[type="radio"]').unbind();
        $('#orderWrapper').children().eq(currentIndex).find('input[type="radio"]').unbind();
        $('#orderWrapper').children().eq(currentIndex+1).find('input[type="radio"]').unbind();

        $('#orderWrapper').children().eq(currentIndex-1).addClass('beside');
        $('#orderWrapper').children().eq(currentIndex).removeClass();
        $('#orderWrapper').children().eq(currentIndex+1).addClass('beside');

        // Add new click listeners
        // Scroll left when left pointing arrow clicked
        $('#orderWrapper').children().eq(currentIndex-1).click(function() {
            console.log("prev");
            if (currentIndex !== 1) {
            hideArrows();
            scrollLeft(currentIndex);
            currentIndex--;
            updateScroller(currentIndex);
        }
        });

        // $('#orderWrapper').children().eq(currentIndex).find('input[type="radio"]').click(function() {
        //     console.log("current");
        //     var finalPageIndex = $('#orderWrapper div').length-2;
        //     if (currentIndex != finalPageIndex) {
        //     hideArrows();
        //     scrollRight(currentIndex);
        //     currentIndex++;
        //     updateScroller(currentIndex);
        // }
        // });

        // Scroll right when right pointing arrow clicked
        $('#orderWrapper').children().eq(currentIndex+1).click(function() {
            console.log("next");
            var finalPageIndex = $('#orderWrapper div').length-2;
            if (currentIndex != finalPageIndex) {
            hideArrows();
            scrollRight(currentIndex);
            currentIndex++;
            updateScroller(currentIndex);
        }
        });
    }

function openScroller() {
    $("#orderWrapper").scrollLeft(getScrollLocation(0, true));
    updateScroller(1);
}

function scrollLeft(currentIndex) {
    console.log("Scrolling left");
    $("#orderWrapper").animate({scrollLeft:getScrollLocation(currentIndex, false)}, 300, function() {showArrows();});
}

function scrollRight(currentIndex) {
    console.log("Scrolling right");
    $("#orderWrapper").animate({scrollLeft:getScrollLocation(currentIndex, true)}, 300, function() {showArrows();});
}

function getScrollLocation(currentIndex, isScrollingRight) {
    var wrapperWidth = $('#orderWrapper').width();
    var divWidth = $('#orderWrapper div').width();
    var leftPosition = $('#orderWrapper').scrollLeft();
    var location;

    if (isScrollingRight === true) {
        if (currentIndex === 0) {
            location = leftPosition+(divWidth*(4/5));
        } else {
            location = leftPosition+divWidth;
        }
    } else {
        if (currentIndex == $('#orderWrapper div').length-1) {
            location = (leftPosition-(divWidth*(4/5)));
        } else if (currentIndex === 1) {
            location = leftPosition;
        } else {
            location = leftPosition-divWidth;
        }
    }

    return location;
}

function hideArrows() {
    $('#orderWrapper').find('.arrow').removeClass('fade-in');
    $('#orderWrapper').find('.arrow').addClass('fade-out');
}

function showArrows() {
    $('#orderWrapper').find('.arrow').removeClass('fade-out');
    $('#orderWrapper').find('.arrow').addClass('fade-in');
}

function getMenuData() {
    $.ajax({
        type: 'GET',
        url: rootURL+"/ingredients",
        dataType: "json", // data type of response
        success: function(data){
            console.log($('title').html());
            if($('title').html().toLowerCase()=='order') {
                inflateOrderMenu(data);
                openScroller();
            } else {
                console.log("ERROR: Could not load menu data for this page.");
            }
        }
    });
}

function inflateOrderMenu(data) {
    console.log(data);
    $('#basesDiv').append("<h2>Choose Your Base</h2><ul id=\"basesMenu\">");  
    for (var i=0; i<data['Bases'].length; i++){
        console.log("loadbase base "+ i);
        $('#basesDiv ul').append("<li> <input type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i]['name'] + "\" value=\"" + data['Bases'][i]['name'] + "\" required> <label for=\"" + data['Bases'][i]['name'] + "\">" + data['Bases'][i]['name'] + "</label></li>");
        if (data['Bases'][i]['available'] === '0'){
            $('#basesDiv ul li:last-child').prop("disabled", true).addClass("outOfStock");
           // $('#basesDiv ul li:last-child').append("(currently unavailable)")
        }
    }

    $('#breadsDiv').append("<h2>Choose Your Bread</h2></ul><ul id=\"breadsMenu\">");
    for (var i=0; i<data['Breads'].length; i++){
        $('#breadsDiv ul').append("<li> <input type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i]['name'] + "\" value=\"" + data['Breads'][i]['name'] + "\" required> <label for=\"" + data['Breads'][i]['name'] + "\">" + data['Breads'][i]['name'] + "</label></li>");
        if (data['Breads'][i]['available'] === '0'){
            $('#breadsDiv ul li:last-child').prop("disabled", true).addClass("outOfStock");
            //$('#breadsDiv ul li:last-child').append("(currently unavailable)")
        }    
    }

    $('#cheesesDiv').append("<h2>Slap Some Cheese On It</h2></ul><ul id=\"cheeseMenu\">");
    for (var i=0; i<data['Cheeses'].length; i++){
        $('#cheesesDiv ul').append("<li> <input type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i]['name'] + "\" value=\"" + data['Cheeses'][i]['name'] + "\" required> <label for=\"" + data['Cheeses'][i]['name'] + "\">" + data['Cheeses'][i]['name'] + "</label></li>");
        if (data['Cheeses'][i]['available'] === '0'){
            $('#cheesesDiv ul li:last-child').prop("disabled", true).addClass("outOfStock");
           // $('#cheesesDiv ul li:last-child').append("(currently unavailable)")
        }
    }

    $('#toppingsDiv').append("<h2>Top It Off With Toppings</h2></ul><ul id=\"toppingsMenu\">");
    for (var i=0; i<data['Toppings'].length; i++){
        $('#toppingsDiv ul').append("<li> <input type=\"checkbox\" name=\"toppingType[]\" id=\"" + data['Toppings'][i]['name'] + "\" value=\"" + data['Toppings'][i]['name'] + "\"> <label for=\"" + data['Toppings'][i]['name'] + "\">" + data['Toppings'][i]['name'] + "</label></li>");
        if (data['Toppings'][i]['available'] === '0'){
            $('#toppingsDiv ul li:last-child').prop("disabled", true).addClass("outOfStock");
            //$('#toppingsDiv ul li:last-child').append("(currently unavailable)")
        }
    }

    $('#friesDiv').append("<h2>Ya Want Fries With That?</h2></ul><ul id=\"fryMenu\">");
    for (var i=0; i<data['Fries'].length; i++){
        $('#friesDiv ul').append("<li> <input type=\"radio\" name=\"friesType\" id=\"" + data['Fries'][i]['name'] + "\" value=\"" + data['Fries'][i]['name'] + "\" required> <label for=\"" + data['Fries'][i]['name'] + "\">" + data['Fries'][i]['name'] + "</label></li>");
        if (data['Fries'][i]['available'] === '0'){
            $('#friesDiv ul li:last-child').prop("disabled", true).addClass("outOfStock");
            //$('#friesDiv ul li:last-child').append("(currently unavailable)")
        }
    }

    $('#submitDiv').append("</ul><input type=\"submit\" value=\"Submit Order\">");
}