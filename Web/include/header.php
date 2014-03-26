<?php
   require 'Slim/Slim.php';
   \Slim\Slim::registerAutoloader();

   //database connection
   //require_once 'login.php'
   //$db = new mysqli($db_hostname, $db_username, $db_password, $db_database);
   //if ($db->connect > 0) {
   //		die('Unable to connect to database [' . $db->connect_error . ']');
   //}

   $app = new \Slim\Slim();

   /*$app->get('/Orders', function() use ($db, $app) {
   		$query = "SELECT Users.fName, Users.lName, Orders.timePlaced, Orders.OrderID, Breads.name, Bases.name, Cheeses.name, Orders.hasFries 
				FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID INNER JOIN Breads ON Orders.BreadID = Breads.BreadID
				INNER JOIN Bases ON Orders.BaseID = Bases.BaseID INNER JOIN Cheeses ON Orders.CheeseID = Cheeses.CheeseID ORDER BY Orders.OrderID";
   		
   		$result = mysqli_query($db, $query);
   		$orders = mysqli_fetch_object($result);
   		echo json_encode($orders);
   });
   $app->run();*/
?>

<!Doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?php echo $pageTitle ?></title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link href='http://fonts.googleapis.com/css?family=Ubuntu:400,500' rel='stylesheet' type='text/css'>

	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="javascript/main.js"></script>