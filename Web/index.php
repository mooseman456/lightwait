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
        <img src="http://3.bp.blogspot.com/_zrYqLNVtWxs/TDUs_9wk30I/AAAAAAAAGYE/y8TKo3EQIXQ/s1600/backyard++burger.png">
        <p>Are you tired of waiting around in Mac's Place just to pick up a burger and some fries? Are you exhausted from having to be in a public place for longer than 2 minutes? Are you a professor who is examining a website made by some students in order to judge whether they are competent in the field that you are teaching? Then we have the product for you!</br></br>
        Lightwait is the premier ordering service for both customers and managers of Mac's Place! We bring you the greatest part about Mac's Place, without the literal worst thing in the world! Waiting and doing nothing! Now you can wait and do nothing in the comfort of your own residence! Just place an order and be on your merry way!</p>

    </div>

</body>
</html>
