<?php
    session_cache_limiter(false);
    session_start();
    if (!isset($_SESSION['userType']) || $_SESSION['userType'] != 1) {
        header('Location: index.php');
        die();
    }
    
    $pageTitle="Thank you!";
    $navElements=array("account"=>"account.php","logout"=>"index.php");
    include('include/header.php');
?>
    <h1>Thank you for your order!</h1>
</body>
</html>