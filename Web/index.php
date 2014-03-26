<?php
<<<<<<< HEAD
	$pageTitle = "Login";
	include 'include/header.php';
=======
	$pageTitle = "Home";

	include('include/header.php');
>>>>>>> bc1a919a1184f12b690a9ad202f4f4054023fcd6
?>
</head>

<body>
	<div class="login">
		<h1>Log In</h1>
		<form id="loginForm" method="POST">
			<input class="textForm" type="text" name="username" placeholder="Username" required><br/>
			<input class="textForm" type="text" name="password" placeholder="Password" requried><br/>
			<input class="formSubmit" type="submit" value="Log In">
		</form>	
	</div>
	<a href="queue.php">Screw that, I'll hack in!</a>
</body>
</html>
