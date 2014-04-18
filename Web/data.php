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
		<!-- <fieldset>
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
		</fieldset> -->

		<fieldset>
			<input type="date" name="beginDate" id="startTime"/>
			<input type="time" name="startTime" id="startTime"/>
			<label for="beginDate">Before</label>
			<input type="date" name="afterDate" id="afterDate"/>
			<input type="time" name="afterTime" id="afterTime"/>
			<label for="beginDate">After</label>
		</fieldset>

		<fieldset>
			<input type="checkbox" name="count" value="count" id="count">
			<label for="count">Count</label>
		</fieldset>
		
		<fieldset name="Sorting">
			<input type="radio" name="sort" value="sortAscend" id="sortAscend"/ >
			<label for="sortAscend">Sort Ascending</label>
			<input type="radio" name="sort" value="sortDescend" id="sortDescend" />
			<label for="sortDescend">Sort Descending</label>
			<input type="radio" name="sort" value="sortNone" id="sortNone" />
			<label for="sortNone">No Sorting</label>
		</fieldset>



		<fieldset id="ingredientsFormArea" name="Ingredients">

		</fieldset>

		<!-- <fieldset>
			<input type="text" name="hasAllIngredients" placeholder="Has All" id="hasAllIngredient" />
			<input type="button" value="Add">
			<div class="ingredientList">Ingredients</div>
			<input type="text" name="hasNotAllIngredients" placeholder="Has Not All" id="hasNotAllIngredients" />
			<input type="button" value="Add">
			<div class="ingredientList">Ingredients</div>
			<input type="text" name="hasAnyIngredient" placeholder="Has Any" id="hasAnyIngredient" />
			<input type="button" value="Add">
			<div class="ingredientList">Ingredients</div>
			<input type="text" name"hasNotAnyIngredient" placeholder="Has Not Any" id"hasNotAnyIngredient" />
			<input type="button" value="Add">
			<div class="ingredientList">Ingredients</div>
		</fieldset> -->


		<input type="submit" value="Retrieve" />
	</form>
</div>

<div id="table"></div> 
<div id="pieChart"></div>
<div id="barGraph"></div>

</body>

</html>