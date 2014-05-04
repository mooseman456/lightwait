<?php
	session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 3) {
        header('Location: index.php');
        die();
    }
    
	$navElements=array(
        "data"=>"data.php",
        "menu"=>"menu.php",
        "users"=>"users.php",
        "account"=>"account.php",
        "logout"=>"index.php");
	$pageTitle="Menu";
	$javascript="javascript/users.js";
	include('include/header.php');
?>
    <h2>Create an administrator or chef account</h2>
	<div class="accountWrapper">

		<div class="floatingBox"> 
			<form id="adminCreateAccountForm" method="POST">

                <input class="textForm tooltip" type="email" name="email" placeholder="Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="password" name="password" pattern=".{8,20}" placeholder="Password" title="Password between 8 and 20 characters" required>                
				<input class="tooltip" type="text" name="fName" placeholder="First Name" title="Please provide your first name. Only letters, apostrophes, commas, and periods allowed." pattern="^[a-zA-Z ,.'-]+$" required>
                <input class="tooltip" type="text" name="lName" placeholder="Last Name" title="Plase provide your last name. Only letters, apostrophes, commas, and periods allowed" pattern="^[a-zA-Z ,.'-]+$" required>


				<input type="radio" name="accountType" value="chef" id="create-chef-checkbox" required>
				<label for="create-chef-checkbox">Chef</label>
				<input type="radio" name="accountType" value="admin" id="create-admin-checkbox" required>
				<label for="create-admin-checkbox">Administrator</label>
				<input class="formSubmit" type="submit" value="Create Account">
			</form>
		</div>
	</div>
</body>

</html>