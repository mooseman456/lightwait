<?php
	$pageTitle = "Order";
	$navElements=array("account"=>"account.php","logout"=>"index.php");
	include('include/header.php');
?>
	<div class="order-wrapper">
		<p>Add items to your order by clicking on them in the menu</p>
		<div id="menuWrapper" class="order-page">
			<form id="menuForm" method="POST" action="http://54.186.252.120.com/Web/api/index.php/webOrder">
			</form>
		</div>
		
	</div>
</body>

</html>