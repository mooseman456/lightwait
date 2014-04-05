<?php
	$pageTitle = "Order";
	$navElements=array("account"=>"account.php","logout"=>"index.php");
	$javascript='javascript/main.js';
	include('include/header.php');
?>
	<div class="order-wrapper">
		<p>Add items to your order by clicking on them in the menu</p>
		<div id="menuWrapper" class="order-page">
			<form id="menuForm" method="POST" action="api/index.php/webOrder">
			</form>
		</div>
		
	</div>
</body>

</html>