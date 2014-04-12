<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 2) {
        header('Location: index.php');
        die();
    }

	$pageTitle = "Availability";
	$navElements = array("back"=>"queue.php","logout"=>"index.php");
	$javascript = 'javascript/menu.js';
	include 'include/header.php';
?>
	<div class="chartHolder">
		<form class="mainForm" method="POST" onsubmit="return false;">

		</form>
	</div>
</body>
</html>