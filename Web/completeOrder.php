<?php

    if ($_SESSION['user_id'] != 1)
        header('index.php');
    
    $pageTitle = "Home";
    $navElements = null;
    $javascript = 'javascript/account.js';
    include('include/header.php');
?>
    <h1>Thank you for your order!</h1>
</body>
</html>