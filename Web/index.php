<?php
	$pageTitle = "Home";
	$navElements = array(	"chef"=>"queue.php",
							"order"=>"order.php");
	include('include/header.php');
?>
	<div class="login">
		<h1>Log In</h1>
		<form id="loginForm" method="POST">
			<input class="textForm" type="text" name="username" placeholder="Username" required><br/>
			<input class="textForm" type="text" name="password" placeholder="Password" requried><br/>
			<input class="formSubmit" type="submit" value="Log In">
		</form>	
	</div>
	<button id="apiTestButton">Test API</button>
</body>
</html>
