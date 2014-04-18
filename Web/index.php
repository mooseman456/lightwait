<?php

    session_cache_limiter(false);
    session_start();
    if (isset($_SESSION['userType'])){
        if ($_SESSION['userType'] == 1) {
            header('Location: order.php');
            die();
        }
        else if ($_SESSION['userType'] == 2){
            header('Location: queue.php');
            die();
        } 
        
        else if ($_SESSION['userType'] == 3){
            header('Location: administrator.php');
            die();
        }
    }
    
    $pageTitle = "Home";
	   $navElements = null;
    $javascript = 'javascript/account.js';
	include('include/header.php');
?>
	<div class="content">
      <div class="accountForm">
   		<h1>Log In</h1>
   		<form name="loginForm" id="loginForm" method="POST" action="#" >
   			<input class="textForm tooltip" type="email" name="email"  placeholder="Email" title="Please input your email" required ><br/>
   			<input class="textForm tooltip" type="password" name="password" placeholder="Password" title="Please input your password" pattern=".{8,20}" required><br/>
   			<input class="formSubmit tooltip" type="submit" value="Log In">
   		</form>
   	</div>
        <div class="accountForm">
            <h1>Create an Account</h1>
            <form id="createAccountForm" method="POST" action="#">
                <input class="textForm tooltip" type="email" name="email" placeholder="Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="password" name="password" pattern=".{8,20}" placeholder="Password" title="Password between 8 and 20 characters" required>
                <input class="tooltip" type="text" name="fName" placeholder="First Name" title="Please provide your first name" required>
                <input class="tooltip" type="text" name="lName" placeholder="Last Name" title="Plase provide your last name" required>
                <input class="tooltip" type="tel" name="phone" placeholder="Phone Number" title="Plase input a valid phone-number" required>
                <input class="formSubmit" type="submit" value="Create Account">
            </form>
        </div>
   </div>

</body>
</html>
