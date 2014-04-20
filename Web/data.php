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

<div class="box data" id="queryInput">	
	<form action="#" method="GET" name="searchGroup1">
		<fieldset>
			<legend>With</legend>
			<textarea placeholder="ingredients" name="with"></textarea>
			<!-- <input type="textarea" placeholder="ingredients" name="with" id="with" /> -->
			<input type="radio" name="andor" value="and" id="andRadioWith" />
			<label for="andRadioWith">And</label>
			<input type="radio" name="andor" value="or" id="orRadioWith" />
			<label for="orRadioWith">Or</label>
		</fieldset>
		<fieldset>
			<legend>Without</legend>
			<textarea placeholder="ingredients" name="without"></textarea>
			<input type="radio" name="andor" value="and" id="andRadioWithout" />
			<label for="andRadioWithout">And</label>
			<input type="radio" name="andor" value="or" id="orRadioWithout" />
			<label for="orRadioWithout">Or</label>
		</fieldset>
		<fieldset>
			<label for="dateGT">After</label>
			<input type="date" name="dateGT" id="dateGT" />
			<input type="time" name="timeGT" id="timeGT" />
		</fieldset>
		<fieldset>
			<label for="dateLT">Before</label>
			<input type="date" name="dateLT" id="dateLT" />
			<input type="time" name="timeLT" id="timeLT" />
		</fieldset>
		<fieldset>
			<label for="color">Color</label>
			<input type="color" name="color" />
		</fieldset>
		<input type="button" value="Add Search Group" />
		<input type="button" value="Remove Search Group" />
	</form>

	<input type="button" value="Query" />
</div>

<div id="visuals">
	<div id="chartPicker">
		<a href="#pieChart">Pie Chart</a>
		<a href="#">Table</a>
		<a href="#">Bar Graph</a>
		<a href="#">Line Graph</a>
	</div>
	<div class="chart" id="chart"></div> 
</div>

</body>

</html>