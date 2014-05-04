<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 3) {
        header('Location: index.php');
        die();
    }
	
    $navElements=array(
    	"data"=>"data.php",
		"menu"=>"menu.php",
		"users"=>"users.php",
		"account"=>"account.php",
		"logout"=>"index.php");
	$pageTitle="Data";
	$javascript= ["https://www.google.com/jsapi","javascript/data.js"];
	include('include/header.php');
?>

	<div id="simpleQueryContainer">
		<form action="#" name="simpleQuery">
			<fieldset id="simpleQuery-types">
				


			</fieldset>

		</form>
			<form action="#" name="graphTypes">
			<fieldset id="graphSelector">
				
				<input type="radio" name="graphs" id="pieChart" value="Pie Chart" checked>
				<label for="pieChart">Pie Chart</label>
				<input type="radio" name="graphs" id="barGraph" value="Bar Graph">
				<label for="barGraph">Bar Graph</label>
			</fieldset>
			</form>
	</div>




<div class="boxy" id="visuals">
	<div class="chart" id="chart">
		<p>Submit a query to the left in order to see a visualization.</p>
	</div> 
</div>

</body>

</html>