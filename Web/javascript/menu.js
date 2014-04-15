
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
            console.log(JSON.stringify(data));
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
function updateAvailability(type, id) {
    $.ajax({
        type: 'POST',
        url: rootURL + '/updateAvailability/' + type + '/' + id,
        success: function(){
            console.log("Availability of "+type+":"+id+" changed");
        },
            error: function(jqXHR, textStatus, errorThrown){
            console.log("Availability change faild");
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
            section.children().last().change(function() {
                var isChecked = section.children().last().prop('checked');
                updateAvailability(typeName, item, isChecked);
            });

            section.append('<input type="button" value="delete" />');
            section.children().last().click(function() {
                console.log("Delete is not currently supported");
            });
        }
        curr.append('<form id="add'+typeName+'Form"method="PUTS" action="#"</form>');
        item = curr.children().last();
        item.append('<input type="text" name="ingredient" placeholder="New Item" />');
        item.append('<input type="submit" value="Add Item" />');
        //Add item click
        (function() {
            var type = typeName;
            var form = item;
            item.submit(function(e) {
                e.preventDefault();
                var name = form.children('input[name="ingredient"]').val().toLowerCase();
                console.log("type: "+type+", name: "+name)
                addIngredient(type, name);
            });
        })();
    }

    //Edit menu nav bar
    pane = $('#menu-categories-pane');
    for(var type in data) {
        pane.append('<div><a href="#'+type+'">'+type+'</a></div>');
    }
}
function simpleAlert(e) {
    e.preventDefault();
    alert("damn functors");
}

function addItemFunct(typeName) {
    return function(e) {
        e.preventDefault();
        alert("found it");
    }
}

function inflateChefMenu(data) {
    for(var key in data){
        $(".mainForm").append("<div></div>");
        var currentItem=".mainForm div:last-child";
        $(currentItem).append("<h2>"+key+"</h2>");
        for(var i=0; i<data[key].length; i++){
            var allPurpose=data[key][i].name;
            $(currentItem).append("<label for=\""+allPurpose+"\">"+allPurpose+"</label>");
            $(currentItem).append("<input id=\""+allPurpose+"\" type=\"checkbox\"><br/>");
            if(data[key][i].available==1){
                var evil=$(currentItem+" input:nth-last-child(2)");
                $(evil).prop("checked", true);
            }
        }
    }
    $(".mainForm").append("<input id=\"availButton\" type=\"submit\">");
    $("#availButton").click(function(){
        var switchOn = new Array;
        var switchOff = new Array;
        var g=0;
        for(var key in data){
            g++;
            for(var h=0; h<data[key].length; h++){
                var inputPos="body > div > form > div:nth-child("+(g)+") > input:nth-child("+((h*3)+3)+")";
                //console.log(data[key][h].name+",--- "+data[key][h].available+", ---"+$(inputPos).is(":checked"));
                if(data[key][h].available!=$(inputPos).is(":checked")){
                    if(data[key][h].available==1)
                        updateAvailability(data[key], data[key][h].name, false);
                        //switchOff.push(data[key][h].name);
                    if(data[key][h].available==0)
                        updateAvailability(data[key], data[key][h].name, true);
                        //switchOn.push(data[key][h].name);
                }
            }
        }
    });
}
