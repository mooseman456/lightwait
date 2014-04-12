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

	<div class="wrapper">
		<div id="menu-categories-pane" class="box"></div>
		<div id="menu-categories-edit-pane"></div>
</body>

</html>