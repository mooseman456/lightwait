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
	$pageTitle="Administrator";
	$javascript="javascript/administrator.js";
	include('include/header.php');
?>
	<h1>EF THE POLICE!</h1>


</body>

</html>