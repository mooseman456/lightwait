
var rootURL = "api/index.php"
var mMenuData;
var mCurrType = "Bases";

$(document).ready(function(){
    getMenuData();

    /** Click listeners   */
    /* Type selector for menu view */
    $('.typeSelect').click(function(e) {
        mCurrType=$(this).children().html();
        inflateAdminMenu();
    });

    /* Add item  */
    $('form#addItemToMenuForm input[type=submit]').click(function(e){
        console.log("add item");
        console.log(mMenuData);
        // Get the name and title case it
        tName = $('input[name=name').val();
        tName = tName.toLowerCase();
        tName = tName.replace(/\b./g, function(m){
            return m.toUpperCase();
        });

        mCurrType = $('input[name=type]:checked').attr('value');
        mMenuData[mCurrType].push({
            'name':tName,
            'available':true,
        });
        mMenuData[mCurrType].sort(stringCompare);
        $('form#addItemToMenuForm')[0].reset();
        inflateAdminMenu();
        addIngredient(mCurrType, tName);
    });
});

/************/
/*   AJAX   */
/************/

//Get menu data from the database and call inflate function
function getMenuData() {
    $.ajax({
        type: 'GET',
        url: rootURL+"/ingredients",
        dataType: "json", // data type of response
        success: function(data){
            console.log(JSON.stringify(data));
            console.log(data.Toppings);
            for (type in data) {
                data[type].sort(stringCompare);
            }
            mMenuData = data;
            if($('title').html().toLowerCase()=='menu') {
                inflateAdminMenu();
            } else if($('title').html().toLowerCase()=='availability') {
                inflateChefMenu();
            } else {
                console.log("ERROR: Could not load menu data for this page.");
            }   
        }
   });
}

//Add an ingredient to the database
function addIngredient(type, name) {
    $.ajax({
        type: 'POST',
        url: rootURL + '/ingredient/' + type + '/' + name,
        dataType: "json", // data type of response
        async: false,
        success: function(){
            console.log("Ingredient added");
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Could not add ingredient");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

//Changes the availability of a an ingredient in the database
//Name is the name of an ingredient and availabilityStatus is a boolean value
function updateAvailability(type, isChecked, id) {
    $.ajax({
        type: 'PUT',
        url: rootURL + '/updateAvailability/' + type + '/' + isChecked + '/' + id,
        success: function(){
            console.log("Availability of "+type+":"+id+" changed");
        },
            error: function(jqXHR, textStatus, errorThrown){
            console.log("Availability change failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function deleteItem(type, id) {
    $.ajax({
        type: 'POST',
        url: rootURL + '/delete/' + type + '/' + id,
        success: function(){
            console.log("Item deleted");
        },
            error: function(jqXHR, textStatus, errorThrown){
            console.log("Item deletion failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}


/**************************/
/*   Inflater functions   */
/**************************/
function inflateAdminMenu() {
    //Menu categories edit pane
    pane = $('#menuDisplayTypeView');
    pane.empty();
    pane.append('<ul>');
    for (itemNum in mMenuData[mCurrType]) {
        itemName = mMenuData[mCurrType][itemNum]["name"];
        pane.append('<li></li>');
        list = $('li').last();
        list.append('<span>'+itemName+'</span>');
        list.append('<img id="item'+itemNum+'-delete" src="images/delete.png" alt="delete" />');
        list.append('<label for="item'+itemNum+'-availableCheckbox">Available</label>');
        list.append('<input type="checkbox" name="item'+itemNum+'-availableCheckbox" value="item'+itemNum+'-availableCheckbox" id="item'+itemNum+'-availableCheckbox"/>');
        if (mMenuData[mCurrType][itemNum]['available'] == true) {
            $('input[type=checkbox]').last().prop('checked',true);
        }
        // Availability check changed listener
        (function() {
            checkbox = $('input[type=checkbox]').last();
            type = mCurrType;
            id = mMenuData[mCurrType][itemNum]['id'];
            checkbox.change(function(e) {
                isChecked = checkbox.prop('checked');
                console.log('Box checked: '+isChecked);
                updateAvailability(type, isChecked, id);
            });
        })();
        (function() {
            var deleteButton = $('img').last();
            deleteButton.click(function() {
                alert("Delete is not currently supported. Contact lightwait support for assistance.");
                //TODO: Delete action
            });
        })();
    }
    pane.append('</ul>');
}



function inflateChefMenu(data) {
    console.log(data);
    $(".mainForm").append("<div></div>");
    var currentItem=".mainForm > div:last-child";
    for(var key in data){
      
        //$(currentItem).append("<h2>"+key+"</h2>");
        for(var i=0; i<data[key].length; i++){
            var allPurpose=data[key][i].name;
            if(allPurpose.indexOf("No ") === -1){
                //$(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
                //$(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"><br/>");
                var coolString="<div>"+allPurpose+"<div class=\"onoffswitch\">\
                <input type=\"checkbox\" name=\"onoffswitch\" class=\"onoffswitch-checkbox\" id=\""+allPurpose+"\">\
                <label class=\"onoffswitch-label\" for=\""+allPurpose+"\">\
                    <div class=\"onoffswitch-inner\"></div>\
                    <div class=\"onoffswitch-switch\"></div>\
                </label>\
                </div></div>";
                $(currentItem).append(coolString);
                if(data[key][i].available==1){
                    
                    var evil=$(currentItem+" > div:nth-last-child(1) > div > input");
                    //console.log(data[key][i].name);
                    //console.log($(evil));
                    $(evil).prop("checked", true);
                }
                (function() {
                    var checkbox = $(currentItem+" > div:last-child > div > input");
                    var type = key;
                    var id = data[key][i].id;
                    checkbox.change(function(e) {
                        var isChecked = checkbox.prop('checked');
                        console.log('Box checked: '+isChecked);
                        updateAvailability(type, isChecked, id);
                    });
                })();
            }
        }
    }
    /*$(".mainForm").append("<input id=\"availButton\" type=\"submit\">");
    $("#availButton").click(function(){
        var switchOn = new Array;
        var switchOff = new Array;
        var g=0;
        for(var key in data){
            g++;
            for(var h=0; h<data[key].length; h++){
                var inputPos="body > div > form > div:nth-child("+(g)+") > div:nth-child("+(h+2)+") > div > input";
                //console.log(data[key][h].name+",--- "+data[key][h].available+", ---"+$(inputPos).is(":checked"));
                if(data[key][h].available!=$(inputPos).is(":checked")){
                    console.log(data[key]);
                    if(data[key][h].available==1)
                        updateAvailability(key, false, data[key][h].id);
                        //switchOff.push(data[key][h].name);
                    if(data[key][h].available==0)
                        updateAvailability(key, true, data[key][h].id);
                        //switchOn.push(data[key][h].name);
                }
            }
        }
    });*/
}

var stringCompare = function(a, b) {
    if (a.name < b.name) {
        return -1;
    } if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}
