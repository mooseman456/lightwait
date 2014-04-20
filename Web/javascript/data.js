google.load('visualization', '1.0', {'packages':['corechart','table']});
var numSerchGroups=1;

$(document).ready(function(){
	drawPieChart();
	testDQuery();

	// Click Listeners
	$('div#chartPicker a').click(function(e) {
		e.preventDefault();
		var response = e.target.id;
		switch(response) {
			case "pieChart":
				drawPieChart();
				break;
			case "barGraph":
				drawBarGraph();
				break;
			case "table":
				drawTable();
				break;
			case "lineGraph":
				drawLineGraph();
				break;
		}
	});

	$('input[type=button][name=add]').click(function(e) {
		alert("TODO");
	});
}); //End .ready()

/*****************/
/*   Inflaters   */
/*****************/
function inflateForm(menu) {
	var hasField = $('fieldset#hasIngredientsFormArea');
	var hasNotField = $('fieldset#hasNotIngredientsFormArea');
	for(var type in menu) {
		//console.log(typeof type);
		for(var item in type) {
			//console.log(typeof menu[type][item]);
			if(typeof menu[type][item] === "object") {
				var id = menu[type][item]['name']+"Checkbox";
				hasField.append('<input type="checkbox" name="ingredients" id="'+id+'" />');
				hasField.append('<label for="'+id+'"">'+menu[type][item]['name']+'</label>');
				id += "Not";
				hasNotField.append('<input type="checkbox" name="ingredients" id="'+id+'" />');
				hasNotField.append('<label for="'+id+'"">'+menu[type][item]['name']+'</label>');
			}
		}
	}
}

/************/
/*   Form   */
/************/

/***********/
/*  AJAX   */
/***********/

//Get menu data from the database and call inflate function
function getMenuData() {
    $.ajax({
        type: 'GET',
        url: rootURL+"/ingredients",
        dataType: "json", // data type of response
        success: function(data){
            //console.log(JSON.stringify(data));
            inflateForm(data);
        }
   });
}

function testDQuery() {
    $.ajax({
        type: 'POST',
        url: rootURL + '/dquery',
        dataType: "json", // data type of response
        data: formToJSON(),
        success: function(data){
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Text query failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function formToJSON() {

     return JSON.stringify(query2);
}


/******************************/
/*   Google chart functions   */
/******************************/
function drawPieChart() {
	var json = '[["Hamburger", 50],["Black Bean", 20],["Turkey", 60],["Chicken", 52],["Veggie", 89]]';
	var jObject = JSON.parse(json);

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Base');
	data.addColumn('number', 'Quantity');
	data.addRows(jObject);

	//Set chart options
	var options = {'title':'All bases - pie chart',
	               'width':600,
	               'height':400};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart'));
	chart.draw(data, options);
}

function drawBarGraph() {
	var data = google.visualization.arrayToDataTable([
		['Year', 'Sales', 'Expenses'],
		['2004',  1000,      400],
		['2005',  1170,      460],
		['2006',  660,       1120],
		['2007',  1030,      540]
	]);

	var options = {
		title: 'Company Performance',
		hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	chart.draw(data, options);
}

function drawTable() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Name');
	data.addColumn('number', 'Salary');
	data.addColumn('boolean', 'Full Time');
	data.addRows(5);
	data.setCell(0, 0, 'John');
	data.setCell(0, 1, 10000, '$10,000');
	data.setCell(0, 2, true);
	data.setCell(1, 0, 'Mary');
	data.setCell(1, 1, 25000, '$25,000');
	data.setCell(1, 2, true);
	data.setCell(2, 0, 'Steve');
	data.setCell(2, 1, 8000, '$8,000');
	data.setCell(2, 2, false);
	data.setCell(3, 0, 'Ellen');
	data.setCell(3, 1, 20000, '$20,000');
	data.setCell(3, 2, true);
	data.setCell(4, 0, 'Mike');
	data.setCell(4, 1, 12000, '$12,000');
	data.setCell(4, 2, false);

	var table = new google.visualization.Table(document.getElementById('chart'));
	table.draw(data, {showRowNumber: true});

	google.visualization.events.addListener(table, 'select', function() {
		var row = table.getSelection()[0].row;
		alert('You selected ' + data.getValue(row, 0));
	});
}

function drawLineGraph() {
	var data = google.visualization.arrayToDataTable([
		['Year', 'Sales', 'Expenses'],
		['2004',  1000,      400],
		['2005',  1170,      460],
		['2006',  660,       1120],
		['2007',  1030,      540]
	]);

	var options = {
		title: 'Company Performance'
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart'));
		chart.draw(data, options);
}

/********************/
/*   Test Queries   */
/********************/
//TODO: remove these
var query1 = {
	"count":true,
	"startTime":"2014-03-30 12:04:03", 
	"endTime":"2014-04-30 12:04:03",
	"searchForAll":false,
	"searchForAny":true,
	"queryArray":{
		"base_id": ["1"],
		"bread_id":["1"],
		"fry_id":["1"]
	}
}

var query2 = {
	"count":true,
	"startTime":null, 
	"endTime":null,
	"searchForAll":false,
	"searchForAny":true,
}






