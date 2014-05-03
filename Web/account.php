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
    <div class="accountWrapper">
        <div class="floatingBox" id="emailWrap">
        	<form id="editEmailForm">
                <h2>Change email</h2>
                <input class="textForm tooltip" type="email" name="currentEmail" placeholder="Current Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="email" name="newEmail" placeholder="New Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="email" name="confirmEmail" placeholder="Confirm Email" title="Please match previous email field" required>
                <input type="submit" name="submit" value="Edit Email">
            </form>
        </div>
        <div class="floatingBox" id="passWrap">
            <form id="editPasswordForm">
                <h2>Change password</h2>
                <input class="textForm tooltip" type="password" name="currentPassword" pattern=".{8,20}" placeholder="Current password" title="Your current password" required>
                <input class="textForm tooltip" type="password" name="newPassword" pattern=".{8,20}" placeholder="New password" title="Password between 8 and 20 characters" required>
                <input class="textForm tooltip" type="password" name="confirmPassword" pattern=".{8,20}" placeholder="Confirm password" title="Must match previous password field" required>
                <input type="submit" name="submit" value="Edit Password">
            </form>
        </div> <!--
            <form id="editFirstForm" method="PUT">
                <input class="tooltip" type="text" name="fName" placeholder="First Name" title="Please provide your first name. Only letters, apostrophes, commas, and periods allowed." pattern="^[a-zA-Z ,.'-]+$" required>
                <input class="tooltip" type="text" name="lName" placeholder="Last Name" title="Plase provide your last name. Only letters, apostrophes, commas, and periods allowed" pattern="^[a-zA-Z ,.'-]+$" required>
                <!--
        		<input type="email" name="email" placeholder="Email">
        		<input type="password" name="password" placeholder="Password">
        		<input type="text" name="fName" placeholder="First Name">
        		<input type="text" name="lName" placeholder="Last Name"> 
        		<input type="submit" name="submit" value="Edit Account">
        	</form>
        </div>-->
    </div>

</body>
</html>