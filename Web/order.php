<?php
	session_start();
	session_cache_limiter(false);

	if (!isset($_SESSION['userType']) && $_SESSION['userType'] != 1){
		header('Location: index.php');
		die();
	}
	
	$pageTitle = "Order";
	$navElements=array("account"=>"account.php","logout"=>"index.php");
	$javascript = 'javascript/order.js';
	include('include/header.php');
?>
	<div class="order-wrapper">
		<p>Add items to your order by clicking on them in the menu<a id="popup">!</a></p>
		<div id="menuWrapper" class="order-page">
			<form id="menuForm" method="POST" action="api/index.php/webOrder">
			</form>
		</div>
		<div id="fade" class="black_overlay"></div>
		<div id="light" class="white_content">You're going Down!<a id="popdown">Close</a></div>
		
	</div>
</body>

</html>