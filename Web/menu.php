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
	$pageTitle="Menu";
	$javascript="javascript/menu.js";
	include('include/header.php');
?>

	<div id="adminMenuWrapper">
		<div class="floatingBox" id="addItemFormWrapper">
			<form id="addItemToMenuForm">
				<input type="text" name="name" placeholder="Name" required pattern="[a-zA-Z]+">
				<input type="radio" name="type" value="Bases" id="addItemForm-typeBase" required>
				<label for="addItemForm-typeBase">Base</label>
				<input type="radio" name="type" value="Breads" id="addItemForm-typeBread" required>
				<label for="addItemForm-typeBread">Bread</label>
				<input type="radio" name="type" value="Cheeses" id="addItemForm-typeCheese" required>
				<label for="addItemForm-typeCheese">Cheese</label>
				<input type="radio" name="type" value="Toppings" id="addItemForm-typeTopping" required>
				<label for="addItemForm-typeTopping">Topping</label>
				<input type="radio" name="type" value="Fries" id="addItemForm-typeFry" required>
				<label for="addItemForm-typeFry">Fry</label>
				<input type="submit" name="addItemButton" value="Add Item">
			</form>
		</div>

		<div id="menuDisplayWrapper">
			<div id="menuDisplayTypeSelector">
				<div class="typeSelect"><span>Bases</span></div>
				<div class="typeSelect"><span>Breads</span></div>
				<div class="typeSelect"><span>Cheeses</span></div>
				<div class="typeSelect"><span>Toppings</span></div>
				<div class="typeSelect"><span>Fries</span></div>
			</div>
			<div class="floatingBox" id="menuDisplayTypeView"></div>
		</div>
	</div>
</body>

</html>