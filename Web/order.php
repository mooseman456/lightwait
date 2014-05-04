<?php
session_start();
session_cache_limiter(false);

if (!isset($_SESSION['userType']) && $_SESSION['userType'] != 1){
	header('Location: index.php');
	die();
}

$pageTitle = "Order";
$navElements=array(
	"order"=>"order.php",
	"account"=>"account.php",
	"logout"=>"index.php");
$javascript = 'javascript/order.js';
include('include/header.php');
?>

<form id="menuForm">
	<div id="orderWrapper">
		<div class="beside">
			This is an empty div
		</div>
		<div id="basesDiv">
			<img src="images/base_icon.png" alt="Base"/>
		</div>
		<div id="breadsDiv">
			<img src="images/bread_icon.png" alt="Bread"/>
		</div>
		<div id="cheesesDiv">
			<img src="images/cheese_icon.png" alt="Cheese"/>
		</div>
		<div id="toppingsDiv">
			<img src="images/topping_icon.png" alt="Topping"/>
		</div>
		<div id="friesDiv">
			<img src="images/fries_icon.png" alt="Fries"/>
		</div>
		<div id="submitDiv">
			<img src="images/chef_icon.png" alt="Chef"/>
			<h2>Your Order</h2>
			<ul id="pickedItems">
			</ul>
		</div>
		<div class="beside">
			This is another empty div
		</div>
		<img class="left arrow" src="images/arrow.png" alt="Previous"/>
		<img class="right arrow" src="images/arrow.png" alt="Previous"/>
	</div>
	<p>Add items to your order by clicking on them in the menu!</p>
</form>

</body>
</html>