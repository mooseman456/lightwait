<?php
	$navElements=array("back"=>"administrator.php","logout"=>"index.php");
	$pageTitle="Menu";
	$javascript="javascript/menu.js";
	include('include/header.php');
?>

	<div class="wrapper">
		<div id="menu-categories-pane" class="box">
			<div>Base</div>
			<div>Bread</div>
			<div>Chees</div>
			<div>Toppings</div>
			<div>Fries</div>
		</div>
		<div id="menu-categories-edit-pane" class="box">
			<section>
				<h1>Base</h1>
				<div id="ingredient-info">
					<div>
						<h2>Ing1</h2>
						<input type="checkbox" name="available" value="available?">
						<input type="button" value="delete">
					</div>
					<div>
						<h2>Ing2</h2>
						<input type="checkbox" name="available" value="available?">
						<input type="button" value="delete">
					</div>
					<div>
						<h2>Ing3</h2>
						<input type="checkbox" name="available" value="available?">
						<input type="button" value="delete">
					</div>
					<div>
						<h2>Ing4</h2>
						<input type="checkbox" name="available" value="available?">
						<input type="button" value="delete">
					</div>
					<div>
						<h2>Ing5</h2>
						<input type="checkbox" name="available" value="available?">
						<input type="button" value="delete">
					</div>
					<form action="puts" action="#">
						<input type="text" name="available" value="available?">
						<input type="submit" value="Add Item">
					</form>
				</div>
			</section>	
		</div>
	</div>
</body>

</html>