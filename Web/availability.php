<?php
	$pageTitle = "Availability";
	$navElements = array("back"=>"queue.php","logout"=>"index.php");
	include 'include/header.php';
?>
	<form id="avail" method="POST">
		<label for="beef">Beef Patties</label>
		<input checked="checked" id="beef" name="beef" type="checkbox"><br/>
		<label for="chick">Chicken Patties</label>
		<input checked="checked" id="chick" type="checkbox"><br/>
		<label for="sweater">Hand-knit Burger Pockets</label>
		<input checked="checked" id="sweater" type="checkbox"></br>
		<input class="availSubmit" type="submit" value="Submit Change">

	</form>
	<a href="index.php">Home</a>
	<a href="queue.php">Back</a>
</body>
</html>