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
        <div class="floatingBox">
        	<form id="editAccountForm" method="PUT">
                <input class="textForm tooltip" type="email" name="email" placeholder="Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="password" name="password" pattern=".{8,20}" placeholder="Password" title="Password between 8 and 20 characters" required>

                <input class="tooltip" type="text" name="fName" placeholder="First Name" title="Please provide your first name. Only letters, apostrophes, commas, and periods allowed." pattern="^[a-zA-Z ,.'-]+$" required>
                <input class="tooltip" type="text" name="lName" placeholder="Last Name" title="Plase provide your last name. Only letters, apostrophes, commas, and periods allowed" pattern="^[a-zA-Z ,.'-]+$" required>

                <!--
        		<input type="email" name="email" placeholder="Email">
        		<input type="password" name="password" placeholder="Password">
        		<input type="text" name="fName" placeholder="First Name">
        		<input type="text" name="lName" placeholder="Last Name"> -->
        		<input type="submit" name="submit" value="Edit Account">
        	</form>
        </div>
    </div>

</body>
</html>