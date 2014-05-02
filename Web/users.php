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
	$javascript="javascript/users.js";
	include('include/header.php');
?>
	<div class="accountWrapper">
		<div class="floatingBox"> 
			<form id="adminCreateAccountForm" method="POST" action="#">
				<input class="textForm" type="email" name="email" placeholder="Email" required>
				<input class="textForm" type="password" name="password" pattern=".{8,20}" placeholder="Password" required>
				<input type="text" name="fName" placeholder="First Name" required>
				<input type="text" name="lName" placeholder="Last Name" required>
				<input type="radio" name="chef" value="chef" id="create-chef-checkbox">
				<label for="create-chef-checkbox">Chef</label>
				<input type="radio" name="chef" value="chef" id="create-admin-checkbox">
				<label for="create-admin-checkbox">Administrator</label>
				<input class="formSubmit" type="submit" value="Create Account">
			</form>
		</div>
	</div>
</body>

</html>