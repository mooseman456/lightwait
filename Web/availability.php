<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 2) {
        header('Location: index.php');
        die();
    }

	$pageTitle = "Availability";
	$navElements = array(
        "queue"=>"queue.php",
        "account"=>"account.php",
        "logout"=>"index.php");
	$javascript = 'javascript/menu.js';
	include 'include/header.php';
?>
	<div class='floatingBox availability'>
		<form id='chefChangeAvailabilityForm'>
			<ul id='available-column1'></ul>
			<ul id='available-column2'></ul>
		</form>
	</div>
</body>
</html>