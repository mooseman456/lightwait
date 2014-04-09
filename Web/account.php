<?php
   $pageTitle="Account";
   $navElements = Array("home"=>"index.php","queue" => "queue.php");
   $javascript = 'javascript/account.js';
   include('include/header.php');
?>

	<form id="editAccountForm" method="PUT" action="#">
		<input type="email" name="email" placeholder="Email">
		<input type="password" name="password" placeholder="Password">
		<input type="text" name="fName" placeholder="First Name">
		<input type="text" name="lName" placeholder="Last Name">
		<input type="tel" name="phone" placeholder="Phone">
		<input type="submit" name="submit" value="Submit Changes">
	</form>

</body>
</html>