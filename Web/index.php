<?php
	$pageTitle = "Home";
	$navElements = array("queue"=>"queue.php", "order"=>"order.php");
   $javascript = 'javascript/main.js'
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

         <?php include('include/accountForm.php'); ?>
      </div>
   </div>

</body>
</html>
