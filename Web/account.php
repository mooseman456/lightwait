<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 1) {
        header('Location: index.php');
        die();
    }
    $pageTitle="Account";
    $navElements = Array("order" => "order.php","logout"=>"index.php");
    $javascript = 'javascript/account.js';
    include('include/header.php');
?>
    
	<form id="editAccountForm" method="PUT" action="#">
        <h2>Edit Account Information</h2>
		<input type="email" name="email" placeholder="Email">
		<input type="password" name="password" placeholder="Password">
		<input type="text" name="fName" placeholder="First Name">
		<input type="text" name="lName" placeholder="Last Name">
		<input type="tel" name="phone" placeholder="Phone">
		<input type="submit" name="submit" value="Submit Changes">
	</form>

</body>
</html>