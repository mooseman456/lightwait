<?php
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

	<h1>Create Chef Account</h1>
	<form id="createChefAccountForm" method="POST" action="#">
		<input class="textForm" type="email" name="email" placeholder="Email" required>
		<input class="textForm" type="password" name="password" pattern=".{8,20}" placeholder="Password" required>
		<input type="text" name="fName" placeholder="First Name" required>
		<input type="text" name="lName" placeholder="Last Name" required>
		<input type="tel" name="phone" placeholder="Phone Number" required>
		<input class="formSubmit" type="submit" value="Create Account">
	</form>

	<h1>Create Administrator Account</h1>
	<form id="createAdminAccountForm" method="POST" action="#">
		<input class="textForm" type="email" name="email" placeholder="Email" required>
		<input class="textForm" type="password" name="password" pattern=".{8,20}" placeholder="Password" required>
		<input type="text" name="fName" placeholder="First Name" required>
		<input type="text" name="lName" placeholder="Last Name" required>
		<input type="tel" name="phone" placeholder="Phone Number" required>
		<input class="formSubmit" type="submit" value="Create Account">
	</form>
</body>

</html>