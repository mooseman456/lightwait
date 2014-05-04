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