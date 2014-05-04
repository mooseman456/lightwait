
var rootURL = "api/index.php"
var mMenuData;
var mCurrType = "Bases";

console.log("test");

$(document).ready(function(){
    
    getMenuData();

    /** Click listeners   */
    /* Type selector for menu view */
    $('.typeSelect').click(function(e) {
        mCurrType=$(this).children().html();
        $('.typeSelect').removeClass('selected');
        $(this).addClass('selected');
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
        mMenuData[mCurrType].sort(nameCompare);
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
                data[type].sort(nameCompare);
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

//Remove an ingredient from the database (set isActive = False)
function removeIngredient(type, id) {
    $.ajax({
        type: 'PUT',
        url: rootURL + '/removeingredient/' + type + '/' + id,
        dataType: "json", // data type of response
        async: false,
        success: function(){
            console.log("Ingredient removed");
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Could not remove ingredient");
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

/**************************/
/*   Inflater functions   */
/**************************/
function inflateAdminMenu() {
    //Menu categories edit pane
    pane = $('#menuDisplayTypeView');
    pane.empty();
    pane.append('<ul>');
    for (itemNum in mMenuData[mCurrType]) {
        var itemId = mMenuData[mCurrType]
        itemName = mMenuData[mCurrType][itemNum]["name"];
        pane.append('<li></li>');
        var list = $('li').last();
        list.append('<span>'+itemName+'</span>');
        list.append('<img id="item'+itemNum+'-delete" src="images/delete.png" alt="delete" />');
        list.append('<label for="item'+itemNum+'-availableCheckbox">Available</label>');
        list.append('<input type="checkbox" name="item'+itemNum+'-availableCheckbox" value="item'+itemNum+'-availableCheckbox" id="item'+itemNum+'-availableCheckbox"/>');
        if (mMenuData[mCurrType][itemNum]['available'] == true) {
            $('input[type=checkbox]').last().prop('checked',true);
        }
        // Availability check changed listener
        (function() {
            var checkbox = $('input[type=checkbox]').last();
            var type = mCurrType;
            var id = mMenuData[mCurrType][itemNum]['id'];
            var num = itemNum;
            checkbox.change(function(e) {
                isChecked = checkbox.prop('checked');
                updateAvailability(type, isChecked, id);
                getMenuData();
            });
            var deleteButton = $('img').last();
            deleteButton.click(function() {
                if (confirm('Are you sure you want to delete '+mMenuData[type][num]['name']+'?') ) {
                    removeIngredient(type,id);
                    getMenuData();
                }
            });
        })();
    }
    pane.append('</ul>');
    $('')
}



function inflateChefMenu() {
    console.log(mMenuData);
    var ingredientNames = [];
    var list = $('ul#available-column1');
    var itemCount = 0;
    var itemList = [];
    for (var type in mMenuData) {
        for (var item in mMenuData[type]) {
            if (mMenuData[type][item]['name'].indexOf('No ') !== 0) {
                itemList.push(
                    {'name':mMenuData[type][item]['name'],
                    'id':mMenuData[type][item]['id'],
                    'type':type,
                    'available':mMenuData[type][item]['available']});
            }
        }
    }
    itemList.sort(nameCompare);
    console.log(itemList);
    for(var item in itemList) {
        if (itemCount > itemList.length/2) {
            list=$('ul#available-column2')
        }
        var itemName = itemList[item]['name'];
        var checkboxHtml='<li><span>'+itemName+'</span><div class="onoffswitch">\
            <input type="checkbox" name="available" class="onoffswitch-checkbox" id="chef-'+itemName+'">\
            <label class="onoffswitch-label" for="'+itemName+'">\
                <div class="onoffswitch-inner"></div>\
                <div class="onoffswitch-switch"></div>\
            </label>\
            </div></li>';
        list.append(checkboxHtml);
        if (itemList[item]['available'] == true) {
            $('input[type=checkbox]').last().prop('checked',true);
        }
        (function() {
            var checkbox = $('input[type=checkbox]').last();
            var thisType = itemList[item]['type'];
            var id = itemList[item]['id'];
            checkbox.change(function(e) {
                var isChecked = checkbox.prop('checked');
                console.log('Box checked: '+isChecked);
                updateAvailability(thisType, isChecked, id);
            });
        })();
        itemCount++;
    }
}

var nameCompare = function(a, b) {
    if (a.name < b.name) {
        return -1;
    } if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}
