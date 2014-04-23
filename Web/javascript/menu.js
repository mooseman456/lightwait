
var rootURL = "api/index.php"

$(document).ready(function(){
    getMenuData();
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
            //console.log(JSON.stringify(data));
            if($('title').html().toLowerCase()=='menu') {
                inflateAdminMenu(data);
            } else if($('title').html().toLowerCase()=='availability') {
                inflateChefMenu(data);
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
function inflateAdminMenu(data) {
    //Menu categories edit pane
    var pane = $('#menu-categories-edit-pane');
    var curr;
    var item;
    for (var typeName in data) {
        //console.log(data[typeName]);
        pane.append('<div id="'+typeName+'" class="box"></div>');
        curr=pane.children().last();
        curr.append('<h1>'+typeName+'</h1>');
        curr.append('<div id=ingredientInfo></div>');
        ingredientInfo=curr.children().last();
        for(var index in data[typeName]) {
            item = data[typeName][index]['name'];
            ingredientInfo.append('<section><h2>'+item+'</h2></section>');
            var section = ingredientInfo.children().last();
            section.append('<label for="'+item+'-available">available</label>');
            section.append('<input type="checkbox" value="available" id="'+item+'-available"/>');
            if (data[typeName][index]['available']== true) {
                section.children().last().prop('checked',true);
            }
            //Change availability check action
            (function() {
                var checkbox = section.children().last();
                var type = typeName;
                var id = data[typeName][index]['id'];
                checkbox.change(function(e) {
                    var isChecked = checkbox.prop('checked');
                    console.log('Box checked: '+isChecked);
                    updateAvailability(type, isChecked, id);
                });
            })();

            section.append('<input type="button" value="delete" />');
            (function() {
                var thisSection = section;
                thisSection.children().last().click(function() {
                    alert("Delete is not currently supported. Contact lightwait support for assistance.");
                    //TODO: Delete action
                });
            })();
        }
        curr.append('<form id="add'+typeName+'Form"method="PUTS" action="#"</form>');
        item = curr.children().last();
        item.append('<input type="text" name="ingredient" placeholder="New Item" />');
        item.append('<input type="submit" value="Add Item" />');
        //Add item click action
        (function() {
            var type = typeName;
            var form = item;
            item.submit(function(e) {
                e.preventDefault();
                var name = form.children('input[name="ingredient"]').val().toLowerCase();
                addIngredient(type, name);
                location.reload();
            });
        })();
    }

    //Edit menu nav bar
    pane = $('#menu-categories-pane');
    for(var type in data) {
        pane.append('<div><a href="#'+type+'">'+type+'</a></div>');
    }
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
