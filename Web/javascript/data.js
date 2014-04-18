google.load('visualization', '1.0', {'packages':['corechart','table']});

$(document).ready(function(){
	getMenuData();
	// google.setOnLoadCallback(drawPieChart);
	// google.setOnLoadCallback(drawBarGraph);
	// google.setOnLoadCallback(drawTable);
});

/*****************/
/*   Inflaters   */
/*****************/
function inflateForm(menu) {
	var field = $('fieldset#ingredientFormArea');
	console.log(menu);
	for(var type in menu) {
		for (var item in type) {
			console.log(menu[type][item]);
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

// function testDQuery() {
//     $.ajax({
//         type: 'POST',
//         url: rootURL + '/dquery',
//         dataType: "json", // data type of response
//         data: formToJSON(),
//         success: function(data){
//             console.log(data);
//         },
//         error: function(jqXHR, textStatus, errorThrown){
//             alert("Login failed. Make sure your password and email are correct.");
//             console.log("Login failed");
//             console.log(jqXHR, textStatus, errorThrown);
//         }
//     });
// }

// function formToJSON() {
//      return JSON.stringify({
// 		"count":true, 
// 		"returnType":"base_id",
// 		"startTime":"2014-03-30 12:04:03", 
// 		"endTime": "2014-04-30 12:04:03",
// 		"hasAnyIngredients":["1", "2"]
//     });
// }


/******************************/
/*   Google chart functions   */
/******************************/
function drawPieChart() {

	// // Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Base');
	data.addColumn('number', 'Quantity');
	data.addRows([
		['Hamburger', 3],
		['Black Bean', 5],
		['Turkey', 1],
		['Chicken', 1],
		['Veggie', 2]
	]);

	//Set chart options
	var options = {'title':'All bases - pie chart',
	               'width':600,
	               'height':400};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('pieChart'));
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

	var chart = new google.visualization.ColumnChart(document.getElementById('barGraph'));
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

  var table = new google.visualization.Table(document.getElementById('table'));
  table.draw(data, {showRowNumber: true});

  google.visualization.events.addListener(table, 'select', function() {
    var row = table.getSelection()[0].row;
    alert('You selected ' + data.getValue(row, 0));
  });
}