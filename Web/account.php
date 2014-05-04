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
                <input class="textForm tooltip" type="email" name="currentEmail" placeholder="Current Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="email" name="newEmail" placeholder="New Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="email" name="confirmEmail" placeholder="Confirm Email" title="Please match previous email field" required>
                <input type="submit" name="submit" value="Edit Email">
            </form>
        </div>
        <div class="floatingBox" id="passWrap">
            <form id="editPasswordForm">
                <input class="textForm tooltip" type="password" name="currentPassword" pattern=".{8,20}" placeholder="Current password" title="Your current password" required>
                <input class="textForm tooltip" type="password" name="newPassword" pattern=".{8,20}" placeholder="New password" title="Password between 8 and 20 characters" required>
                <input class="textForm tooltip" type="password" name="confirmPassword" pattern=".{8,20}" placeholder="Confirm password" title="Must match previous password field" required>
                <input type="submit" name="submit" value="Edit Password">
            </form>
        </div>
    </div>

</body>
</html>