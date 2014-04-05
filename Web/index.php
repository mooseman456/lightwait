
<?php
	$pageTitle = "Home";
	$navElements = array("queue"=>"queue.php", "order"=>"order.php");
   $javascript = 'javascript/account.js';
	include('include/header.php');
?>
	<div class="content">
      <div class="accountForm">
   		<h1>Log In</h1>
   		<form id="loginForm" method="POST" action="#" onsubmint="login()">
   			<input class="textForm" type="email" name="email" placeholder="Email" required><br/>
   			<input class="textForm" type="password" name="password" placeholder="Password" requried><br/>
   			<input class="formSubmit" type="submit" value="Log In">
   		</form>
   	</div>
      <div class="accountForm">
         <h1>Create an Account</h1>
         <form id="createAccountForm" method="POST" action="api/createAccount.php">
            <input class="textForm" type="email" name="username" placeholder="Email" required>
            <input class="textForm" type="password" name="password" placeholder="Password" required>
            <input type="text" name="fName" placeholder="First Name" required>
            <input type="text" name="lName" placeholder="Last Name" required>
            <input type="tel" name="phone" placeholder="Phone Number" required>
            
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

</body>
</html>
