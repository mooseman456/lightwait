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
		<form action="#" method="GET" name="searchGroup1">
			<fieldset>
				<legend>With</legend>
				<textarea placeholder="ingredients" name="with"></textarea>
				<input type="radio" name="andor" value="and" id="andRadioWith1" />
				<label for="andRadioWith1">And</label>
				<input type="radio" name="andor" value="or" id="orRadioWith1" />
				<label for="orRadioWith1">Or</label>
			</fieldset>
			<fieldset>
				<legend>Without</legend>
				<textarea placeholder="ingredients" name="without"></textarea>
				<input type="radio" name="andor" value="and" id="andRadioWithout1" />
				<label for="andRadioWithout1">And</label>
				<input type="radio" name="andor" value="or" id="orRadioWithout1" />
				<label for="orRadioWithout1">Or</label>
			</fieldset>
			<fieldset>
				<label for="dateGT1">After</label>
				<input type="date" name="dateGT" id="dateGT1" />
				<input type="time" name="timeGT" id="timeGT1" />
			</fieldset>
			<fieldset>
				<label for="dateLT1">Before</label>
				<input type="date" name="dateLT" id="dateLT1" />
				<input type="time" name="timeLT" id="timeLT1" />
			</fieldset>
			<fieldset>
				<label for="color1">Color</label>
				<input type="color" name="color" />
			</fieldset>
			<input type="button" name="delete" value="Remove This Search Group" />
		</form>
		<form action="#" method="GET" name="searchGroup2">
			<fieldset>
				<legend>With</legend>
				<textarea placeholder="ingredients" name="with"></textarea>
				<input type="radio" name="andor" value="and" id="andRadioWith2" />
				<label for="andRadioWith2">And</label>
				<input type="radio" name="andor" value="or" id="orRadioWith2" />
				<label for="orRadioWith2">Or</label>
			</fieldset>
			<fieldset>
				<legend>Without</legend>
				<textarea placeholder="ingredients" name="without"></textarea>
				<input type="radio" name="andor" value="and" id="andRadioWithout2" />
				<label for="andRadioWithout2">And</label>
				<input type="radio" name="andor" value="or" id="orRadioWithout2" />
				<label for="orRadioWithout2">Or</label>
			</fieldset>
			<fieldset>
				<label for="dateGT2">After</label>
				<input type="date" name="dateGT" id="dateGT2" />
				<input type="time" name="timeGT" id="timeGT2" />
			</fieldset>
			<fieldset>
				<label for="dateLT2">Before</label>
				<input type="date" name="dateLT" id="dateLT2" />
				<input type="time" name="timeLT" id="timeLT2" />
			</fieldset>
			<fieldset>
				<label for="color2">Color</label>
				<input type="color" name="color" />
			</fieldset>
			<input type="button" name="delete" value="Remove This Search Group" />
		</form>
		<input type="button" name="add" value="Add Search Group" />
		<input type="button" name="query" value="Query" />
	</div>
	<div id="simpleSearchContainer">
		<p>Simple search has not been implemented yet.</p>
	</div>
</div>

<div class="boxy" id="visuals">
	<div class="floatingNavigation">
		<a id="pieChart">Pie Chart</a>
		<a id="barGraph">Bar Graph</a>
		<a id="lineGraph">Line Graph</a>
		<a id="table">Table</a>
	</div>
	<div class="chart" id="chart"></div> 
</div>

</body>

</html>