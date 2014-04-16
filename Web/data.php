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

<p>This is where you can view order data.</p>

<div id="queryInput">	
	<form action="#" method="GET">
		<input type="radio" name="category" value="Base" id="baseCheckbox" />
		<label for="baseCheckbox">Base</label>
		<input type="radio" name="category" value="Bread" id="breadCheckbox"/>
		<label for="breadCheckbox">Bread</label>
		<input type="radio" name="category" value="Cheese" id="cheeseCheckbox" />
		<label for="cheeseCheckbox">Cheese</label>
		<input type="radio" name="category" value="Toppings" id="toppingsCheckbox"/>
		<label for="toppingsCheckbox">Toppings</label>
		<input type="radio" name="category" value="Fries" id="friesCheckbox"/>
		<label for="friesCheckbox">Fries</label>

		<input type="date" name="beginDate" />
		<input type="date" name="endDate" />
		<input type="submit" value="Retrieve" />
	</form>
</div>
<div class="visual" id="pieChart"></div>
<div class="visual" id="barGraph"></div>
<div class="visual" id="table"></div>
</body>

</html>