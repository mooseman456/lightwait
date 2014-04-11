
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
        console.log("Account creation failed");
        console.log(jqXHR, textStatus, errorThrown);
     }
  });
}

//TODO: Luke doesn't think this has a purpose, but you should correct him.
function returnItem(ingredient, jsonObject){
   for(var key in data){
      for(var k=0; k<data[key].length; k++){
         if(data[i][k].name===ingredient){
            return [key, k];
         }
      }
   }
}

/**************************/
/*   Inflater functions   */
/**************************/
function inflateAdminMenu(data) {
    //TODO: write this.
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
                        switchOff.push(data[key][h].name);
                    if(data[key][h].available==0)
                        switchOn.push(data[key][h].name);
                    //console.log(switchOn);
                }
            }
        }

    });
}
