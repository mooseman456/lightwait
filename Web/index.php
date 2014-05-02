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
	<div id="loginWrapper">
      <div class="floatingBox">
   		<form id="loginForm">
   			<input class="textForm tooltip" type="email" name="email"  placeholder="Email" title="Please input your email" required />
   			<input class="textForm tooltip" type="password" name="password" placeholder="Password" title="Please input your password" pattern=".{8,20}" required/>
   			<input class="formSubmit tooltip" type="submit" value="Login">
   		</form>
   	</div>
        <div class="floatingBox">
            <form id="createAccountForm">
                <input class="tooltip" type="text" name="fName" placeholder="First Name" title="Please provide your first name. Only letters, apostrophes, commas, and periods allowed." pattern="^[a-zA-Z ,.'-]+$" required>
                <input class="tooltip" type="text" name="lName" placeholder="Last Name" title="Plase provide your last name. Only letters, apostrophes, commas, and periods allowed" pattern="^[a-zA-Z ,.'-]+$" required>
                <input class="textForm tooltip" type="email" name="email" placeholder="Email" title="Please input a valid email address" required>
                <input class="textForm tooltip" type="password" name="password" pattern=".{8,20}" placeholder="Password" title="Password between 8 and 20 characters" required>
                <input class="formSubmit" type="submit" value="Create Account">
            </form>
        </div>
    </div>
    <div id="aboutWrapper">
        <p>This is text about lightwait.  Later I'll probably ask Joe to write more here, but for now I'm just going to be rambling for a bit.  Lightwait is amazing and you should order things here.  Lightwait has a very high potiential to change your life.  Just saying...</p>
    </div>

</body>
</html>
