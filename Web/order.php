<?php
	$pageTitle = "Order";
	$navElements=array("account"=>"account.php","logout"=>"index.php");
	include('include/header.php');
?>
	<div class="order-wrapper">
		<p>Add items to your order by clicking on them in the menu</p>
		<div id="menuWrapper" class="order-page">
			<form id="menuForm" method="POST" action="http://localhost/lightwait/Web/api/index.php/webOrder">
				<!-- <ul id="basesMenu">
					<li>
						<input type="radio" name="baseType" id=jsonName value=jsonName>
						<label for=jsonName>jsonName</label>
					</li>

				</ul>
				<ul id="toppingsMenu"> -->
			</form>
		</div>
		
	</div>
</body>

</html>