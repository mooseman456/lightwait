<?php
	$pageTitle = "Home";
	$navElements = array(	"chef"=>"queue.php",
							"order"=>"order.php");
	include('include/header.php');
?>
	<div class="content">
      <div class="accountForm">
   		<h1>Log In</h1>
   		<form id="loginForm" method="POST">
   			<input class="textForm" type="text" name="username" placeholder="Username" required><br/>
   			<input class="textForm" type="password" name="password" placeholder="Password" requried><br/>
   			<input class="formSubmit" type="submit" value="Log In">
   		</form>
   	</div>
      <div class="accountForm">
         <h1>Create an Account</h1>
         <form id="createAccountForm" method="POST">
            <input class="textForm" type="email" name="username" placeholder="Email" required></br>
            <input class="textForm" type="password" name="password" placeholder="Password" required></br>
            <ul id="typeOfAcct">
               <li>
                  <input type="radio" name="accountType" id="customer" value="chef">
                  <label for="customer">Customer</label>
               </li>
               <li>
                  <input type="radio" name="accountType" id="chef" value="chef">
                  <label for="chef">Chef</label>
               </li>
               <li>
                  <input type="radio" name="accountType" id="admin" value="admin">
                  <label for="admin">Administrator</label>
               </li>
            </ul>
            <input class="formSubmit" type="submit" value="Create Account">
         </form>
      </div>
   </div>

<button id="apiTestButton">Test POST</button>

</body>
</html>
