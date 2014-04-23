<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 3) {
        header('Location: index.php');
        die();
    }
	
    $navElements=array(
		"home"=>"administrator.php",
		"data"=>"data.php",
		"users"=>"users.php",
		"menu"=>"menu.php",
		"logout"=>"index.php");
	$pageTitle="Data";
	$javascript= ["https://www.google.com/jsapi","javascript/data.js"];
	include('include/header.php');
?>

<div class="boxy data" id="queryInput">
	<div class="floatingNavigation">
		<a id="simpleSearch">Simple</a>
		<a id="advancedSearch">Advanced</a>
	</div>
	<div id="advancedSearchContainer">
		<form action="#" method="GET" name="searchGroup-1">
			<fieldset>
				<legend>With</legend>
				<textarea placeholder="ingredients" name="with"></textarea>
				<input type="radio" name="andor" value="and" id="andRadioWith-1" />
				<label for="andRadioWith-1">And</label>
				<input type="radio" name="andor" value="or" id="orRadioWith-1" />
				<label for="orRadioWith-1">Or</label>
			</fieldset>
			<fieldset>
				<legend>Without</legend>
				<textarea placeholder="ingredients" name="without"></textarea>
				<input type="radio" name="andor" value="and" id="andRadioWithout-1" />
				<label for="andRadioWithout-1">And</label>
				<input type="radio" name="andor" value="or" id="orRadioWithout-1" />
				<label for="orRadioWithout-1">Or</label>
			</fieldset>
			<fieldset>
				<label for="dateGT-1">After</label>
				<input type="date" name="dateGT" id="dateGT-1" />
				<input type="time" name="timeGT" id="timeGT-1" />
			</fieldset>
			<fieldset>
				<label for="dateLT-1">Before</label>
				<input type="date" name="dateLT" id="dateLT-1" />
				<input type="time" name="timeLT" id="timeLT-1" />
			</fieldset>
			<fieldset>
				<label for="color-1">Color</label>
				<input type="color" name="color" />
			</fieldset>
			<input type="button" name="delete" value="Remove This Search Group" />
		</form>
		<input type="button" name="add" value="Add Search Group" />
		<input type="button" name="query" value="Query" />
	</div>
	<div id="simpleSearchContainer">
		<form action="#" name="simpleSearch">
			<fieldset id="simpleSearch-types">
				<legend>Types</legend>
			</fieldset>
			<input type="submit" name="query" value="Query" />
		</form>
	</div>
</div>

<div class="boxy" id="visuals">
	<div class="floatingNavigation">
		<a id="pieChart">Pie Chart</a>
		<a id="barGraph">Bar Graph</a>
		<a id="lineGraph">Line Graph</a>
		<!-- <a id="table">Table</a> -->
	</div>
	<div class="chart" id="chart"></div> 
</div>

</body>

</html>