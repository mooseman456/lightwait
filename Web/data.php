<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 3) {
        header('Location: index.php');
        die();
    }
	
    $navElements=array(
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
		<a id="simpleQuery">Simple</a>
		<a id="advancedQuery">Advanced</a>
	</div>
	<div id="advancedQueryContainer">
		<form action="#" method="GET" name="queryGroup-1">
			<fieldset>
				<legend>With</legend>
				<textarea placeholder="ingredients" name="with"></textarea>
				<input type="radio" name="withAndor" value="and" id="andRadioWith-1" />
				<label for="andRadioWith-1">And</label>
				<input type="radio" name="withAndor" value="or" id="orRadioWith-1" />
				<label for="orRadioWith-1">Or</label>
			</fieldset>
			<fieldset>
				<legend>Without</legend>
				<textarea placeholder="ingredients" name="without"></textarea>
				<input type="radio" name="withoutAndor" value="and" id="andRadioWithout-1" />
				<label for="andRadioWithout-1">And</label>
				<input type="radio" name="withoutAndor" value="or" id="orRadioWithout-1" />
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
			<input type="button" name="delete" value="Remove This Query Group" />
		</form>
		<input type="button" name="add" value="Add Query Group" />
		<input type="button" name="query" value="Query" />
	</div>
	<div id="simpleQueryContainer">
		<form action="#" name="simpleQuery">
			<fieldset id="simpleQuery-types">
				<legend>Query by type</legend>
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
	<div class="chart" id="chart">
		<p>Submit a query to the left in order to see a visualization.</p>
	</div> 
</div>

</body>

</html>