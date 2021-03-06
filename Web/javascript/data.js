google.load('visualization', '1.0', {'packages':['corechart','table']});
var mNumQueryGroups=1;
var mQueryGroupId=1;
const maxNumQueryGroups=8;
var mMenuData;
var mCurrentData = null;
var mCurrentType;
var mCurrentChart = 0;

$(document).ready(function(){
	getMenuData(); //Data in mMenu

	// Chart types navigation
	$('#pieChart').click(function(e) {
		if (mCurrentData !== null) {
			drawPieChart(mCurrentData);
			mCurrentChart = 0;
		}
	});
	$('#barGraph').click(function(e) {
		if (mCurrentData !== null) {
			drawBarGraph(mCurrentData);
			mCurrentChart = 1;
		}
	});	

	/*   Simple Query Form   */
	simpleQuery('Bases');

	$('#simpleQueryContainer form[name=simpleQuery]').change(function(e) {
		mCurrentType = $('input[name=type]:checked').val();
		simpleQuery(mCurrentType);
	});
}); //End .ready()

/*****************/
/*   Inflaters   */
/*****************/
// !! This is deprecated
function inflateForm(menu) {
	var hasField = $('fieldset#hasIngredientsFormArea');
	var hasNotField = $('fieldset#hasNotIngredientsFormArea');
	var first = true;
	for(var type in menu) {
		for(var item in type) {
			if(typeof menu[type][item] === "object") {
				var id = menu[type][item]['name']+"Checkbox";
				if (first) {
					hasField.append('<input type="checkbox" name="ingredients" id="'+id+'" checked/>');
					first = false;
				}
				else
					hasField.append('<input type="checkbox" name="ingredients" id="'+id+'" />');

				hasField.append('<label for="'+id+'"">'+menu[type][item]['name']+'</label>');
				id += "Not";
				hasNotField.append('<input type="checkbox" name="ingredients" id="'+id+'" />');
				hasNotField.append('<label for="'+id+'"">'+menu[type][item]['name']+'</label>');
			}
		}
	}
}

function inflateSimpleQuery(menu) {
	var field = $('fieldset#simpleQuery-types');
	var first = true;
	for(var type in menu) {
		if (first) {
			field.append('<input checked type="radio" name="type" id="simpleQuery-types-'+type+'"value="'+type+'"/>');
			first = false;
		}
		else
			field.append('<input type="radio" name="type" id="simpleQuery-types-'+type+'"value="'+type+'"/>');
		
		field.append('<label for="simpleQuery-types-'+type+'">'+type+'</label>');
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
            inflateSimpleQuery(data);
            mMenuData = data;
        }
   });
}

function simpleQuery(typeId) {
	$.ajax({
		type: 'GET',
		url: rootURL+"/squery/"+typeId,
		dataType: "json",
		success: function(data) {
			if (mCurrentChart === 0)
				drawPieChart(data);
			else
				drawBarGraph(data);
			mCurrentData = data;
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("Error loading data.");
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

     return JSON.stringify({
	"count":true,
	"startTime":"2014-03-30 12:04:03", 
	"endTime":"2014-04-30 12:04:03",
	"withConjunction":"AND",
	"withoutConjunction":"AND",
	"queryArray": {
		"base_id":["Cheeseburger"],
		"bread_id":["Wheat"],
		"fry_id":["No Fries"]
	},
	"notQueryArray":{
		"base_id": ["Hamburger"],
		"bread_id":["White"],
		"fry_id":["Fries"]
	}
});
}

/******************************/
/*   Google chart functions   */
/******************************/
function drawPieChart(jData) {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', mCurrentType);
	data.addColumn('number', 'Quantity');
	data.addRows(jData);

	//Set chart options
	var options = {'title':'All bases - pie chart',
	               'width':600,
	               'height':400};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart'));
	chart.draw(data, options);
}

function drawBarGraph(jData) {

	var data = new google.visualization.DataTable();
	data.addColumn('string', mCurrentType);
	data.addColumn('number', 'Quantity');
	data.addRows(jData);

	var options = {
		title: '',
		hAxis: {title: 'Type', titleTextStyle: {color: 'red'}},
		vAxis: {title: 'Quantity', titleTextStyle: {color: 'red'}}
	};

	var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
	chart.draw(data, options);
}

function drawLineGraph(jData) {
	var data = new google.visualization.DataTable();
	data.addColumn('string', mCurrentType);
	data.addColumn('number', 'Quantity');
	data.addRows(jData);

	var options = {
		title: 'Company Performance'
	};

	var chart = new google.visualization.LineChart(document.getElementById('chart'));
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

/********************/
/*   Test Queries   */
/********************/
//TODO: remove these
var query1 = {
	"count":true,
	"startTime":"2014-03-30 12:04:03", 
	"endTime":"2014-04-30 12:04:03",
	"queryForAll":false,
	"queryForAny":true,
	"withConjunction":"AND",
	"withoutConjuction":"AND",
	"queryArray":{
		"base_id": ["1"],
		"bread_id":["1"],
		"fry_id":["1"]
	},
	"notQueryArray":{
		"base_id": ["2"],
		"bread_id":["2"],
		"fry_id":["2"]
	}
}

var query2 = {
	"count":true,
	"startTime":null, 
	"endTime":null,
	"queryForAll":false,
	"queryForAny":true,
}

var baseQuery = {
	"count":true,
	"startTime":null,
	"endTime":null,
	"queryForAll":false,
	"queryForAny":true,
	"queryArray": {
		"base_id":['1'],
	}
}

var advancedQueryFromTemplate = '<form action="#" method="GET" name="queryGroup-idNum"><fieldset><legend>With</legend><textarea placeholder="ingredients" name="with"></textarea><input type="radio" name="withAndor" value="and" id="andRadioWith-idNum" /><label for="andRadioWith-idNum">And</label><input type="radio" name="withAndor" value="or" id="orRadioWith-idNum" /><label for="orRadioWith-idNum">Or</label></fieldset><fieldset><legend>Without</legend><textarea placeholder="ingredients" name="without"></textarea><input type="radio" name="withoutAndor" value="and" id="andRadioWithout-idNum" /><label for="andRadioWithout-idNum">And</label><input type="radio" name="wihtoutAndor" value="or" id="orRadioWithout-idNum" /><label for="orRadioWithout-idNum">Or</label></fieldset><fieldset><label for="dateGT-idNum">After</label><input type="date" name="dateGT" id="dateGT-idNum" /><input type="time" name="timeGT" id="timeGT-idNum" /></fieldset>';
advancedQueryFromTemplate+= '<fieldset><label for="dateLT-idNum">Before</label><input type="date" name="dateLT" id="dateLT-idNum" /><input type="time" name="timeLT" id="timeLT-idNum" /></fieldset>';
advancedQueryFromTemplate+=	'<input type="button" name="delete" value="Remove This Query Group" /></form>';




