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
            console.log("prev"+currentIndex);
            
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
            console.log("next"+currentIndex);
            var finalPageIndex = $('#orderWrapper div').length-2;
            var currCategory="#orderWrapper > div:nth-of-type("+(currentIndex+1)+")";
            var choicePicked=false;
            for(var i=1; i<=$(currCategory+" > ul > li").length; i++){
                //console.log($(currCategory+" > ul > li:nth-of-type("+i+") > label").html());;

                if($(currCategory+" > ul > li:nth-of-type("+i+") > input").prop("checked")===true){
                    //console.log(i+" is a winner");
                    choicePicked=true;
                }
            }
            if(choicePicked)
                console.log("Oh happy day!");
            else
                console.log("Winter is coming");

            if (currentIndex != finalPageIndex && (choicePicked === true || currentIndex === 4)) {
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

        if (data['Bases'][i]['available'] === '0')
            $('#basesDiv ul').append("<li class=\" outOfStock tooltip\" name=\"Currently unavailable\"> <input disabled class=\"outOfStock\" type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i]['name'] + "\" value=\"" + data['Bases'][i]['name'] + "\" required> <label for=\"" + data['Bases'][i]['name'] + "\">" + data['Bases'][i]['name'] + "</label></li>");
        else
            $('#basesDiv ul').append("<li> <input type=\"radio\" name=\"baseType\" id=\"" + data['Bases'][i]['name'] + "\" value=\"" + data['Bases'][i]['name'] + "\" required> <label for=\"" + data['Bases'][i]['name'] + "\">" + data['Bases'][i]['name'] + "</label></li>");

            //$('#basesDiv ul li:last-child').prop("disabled", true).addClass("outOfStock");
            //$('#basesDiv ul li:last-child').append("(currently unavailable)")
        
    }

    $('#breadsDiv').append("<h2>Choose Your Bread</h2></ul><ul id=\"breadsMenu\">");
    for (var i=0; i<data['Breads'].length; i++){

        if (data['Breads'][i]['available'] === '0')
            $('#breadsDiv ul').append("<li class=\" outOfStock tooltip\" name=\"Currently unavailable\"> <input disabled class=\"outOfStock\" type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i]['name'] + "\" value=\"" + data['Breads'][i]['name'] + "\" required> <label for=\"" + data['Breads'][i]['name'] + "\">" + data['Breads'][i]['name'] + "</label></li>");
        else
            $('#breadsDiv ul').append("<li> <input type=\"radio\" name=\"breadType\" id=\"" + data['Breads'][i]['name'] + "\" value=\"" + data['Breads'][i]['name'] + "\" required> <label for=\"" + data['Breads'][i]['name'] + "\">" + data['Breads'][i]['name'] + "</label></li>");            
    }

    $('#cheesesDiv').append("<h2>Slap Some Cheese On It</h2></ul><ul id=\"cheeseMenu\">");
    for (var i=0; i<data['Cheeses'].length; i++){
        if (data['Cheeses'][i]['available'] === '0')
            $('#cheesesDiv ul').append("<li class=\" outOfStock tooltip\" name=\"Currently unavailable\"> <input disabled class=\"outOfStock\" type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i]['name'] + "\" value=\"" + data['Cheeses'][i]['name'] + "\" required> <label for=\"" + data['Cheeses'][i]['name'] + "\">" + data['Cheeses'][i]['name'] + "</label></li>");
        else
            $('#cheesesDiv ul').append("<li> <input type=\"radio\" name=\"cheeseType\" id=\"" + data['Cheeses'][i]['name'] + "\" value=\"" + data['Cheeses'][i]['name'] + "\" required> <label for=\"" + data['Cheeses'][i]['name'] + "\">" + data['Cheeses'][i]['name'] + "</label></li>");  
    }

    $('#toppingsDiv').append("<h2>Top It Off With Toppings</h2></ul><ul id=\"toppingsMenu\">");
    for (var i=0; i<data['Toppings'].length; i++){
        if (data['Toppings'][i]['available'] === '0')
            $('#toppingsDiv ul').append("<li class=\" outOfStock tooltip\" name=\"Currently unavailable\"> <input disabled class=\"outOfStock\" type=\"checkbox\" name=\"toppingType[]\" id=\"" + data['Toppings'][i]['name'] + "\" value=\"" + data['Toppings'][i]['name'] + "\"> <label for=\"" + data['Toppings'][i]['name'] + "\">" + data['Toppings'][i]['name'] + "</label></li>");
        else
            $('#toppingsDiv ul').append("<li> <input type=\"checkbox\" name=\"toppingType[]\" id=\"" + data['Toppings'][i]['name'] + "\" value=\"" + data['Toppings'][i]['name'] + "\"> <label for=\"" + data['Toppings'][i]['name'] + "\">" + data['Toppings'][i]['name'] + "</label></li>");
    }

    $('#friesDiv').append("<h2>Ya Want Fries With That?</h2></ul><ul id=\"fryMenu\">");
    for (var i=0; i<data['Fries'].length; i++){
        if (data['Fries'][i]['available'] === '0')
            $('#friesDiv ul').append("<li class=\" outOfStock tooltip\" name=\"Currently unavailable\"> <input disabled class=\"outOfStock\" type=\"radio\" name=\"friesType\" id=\"" + data['Fries'][i]['name'] + "\" value=\"" + data['Fries'][i]['name'] + "\" required> <label for=\"" + data['Fries'][i]['name'] + "\">" + data['Fries'][i]['name'] + "</label></li>");
        else
            $('#friesDiv ul').append("<li> <input type=\"radio\" name=\"friesType\" id=\"" + data['Fries'][i]['name'] + "\" value=\"" + data['Fries'][i]['name'] + "\" required> <label for=\"" + data['Fries'][i]['name'] + "\">" + data['Fries'][i]['name'] + "</label></li>");
    }

    $('#submitDiv').append("</ul><input type=\"submit\" value=\"Submit Order\">");

    $('#submitDiv input[type="submit"]').click(function(e) {
        e.preventDefault();
        var base = $('#baseDiv input[type="radio"]:checked').val();
        var bread = $('#breadsDiv input[type="radio"]:checked').val();
        var cheese = $('#cheesesDiv input[type="radio"]:checked').val();
        var toppings = $('#toppingsDiv input[type="checkbox"]:checked').val();
        var fries = $('#friesDiv input [type="radio"]:checked').val();

        console.log("Base " + base);
        console.log("Bread " + bread);
        console.log("Cheese " + cheese);
        console.log("Toppings " + toppings);
        console.log("Fries " + fries);
    })
}