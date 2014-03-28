<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/Orders', 'getOrders');	//gets all of the orders 
$app->get('/Orders/:OrderID', 'getOrder');	//gets an order based on an orderID

$app->post('/Orders', 'addOrder');	//currently working on

$app->put('/Orders/:OrderID', 'updateOrder');	//updates the isActive and timeFinished values of an order
$app->delete('/Orders/:OrderID', 'deleteOrder');	//deletes an order based on the orderID

$app->run();

function getOrders() {
	$sql = "SELECT Users.fName, Users.lName, Orders.timePlaced, Orders.OrderID, Breads.name, Bases.name, Cheeses.name, Toppings.name,
				(SELECT name FROM Toppings), (SELECT hasFries FROM Orders WHERE hasFries = true) FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID 
				INNER JOIN Breads ON Orders.BreadID = Breads.BreadID INNER JOIN Bases ON Orders.BaseID = Bases.BaseID INNER JOIN Cheeses ON Orders.CheeseID = Cheeses.CheeseID 
				INNER JOIN OrderToppings ON Orders.OrderID = OrderToppings.OrderID WHERE Orders.isActive = true ORDER BY Orders.OrderID";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo '{"order": ' . json_encode($orders) . '}';
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getOrder($OrderID) {
	$sql = "SELECT Users.fName, Users.lName, Orders.timePlaced, Orders.OrderID, Breads.name, Bases.name, Cheeses.name, Toppings.name,
				(SELECT name FROM Toppings), (SELECT hasFries FROM Orders WHERE hasFries = true) FROM Orders INNER JOIN Users ON Orders.UserID = Users.UserID 
				INNER JOIN Breads ON Orders.BreadID = Breads.BreadID INNER JOIN Bases ON Orders.BaseID = Bases.BaseID INNER JOIN Cheeses ON Orders.CheeseID = Cheeses.CheeseID 
				INNER JOIN OrderToppings ON Orders.OrderID = OrderToppings.OrderID WHERE Orders.OrderID = :OrderID AND Orders.isActive = true";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("OrderID", $OrderID);
		$stmt->execute();
		$order = $stmt->fetchObject();  
		$db = null;
		echo json_encode($order); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addOrder() {
	error_log('addOrder\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$order = json_decode($request->getBody());
	$sql = "INSERT INTO Orders (OrderID, UserID, BreadID, BaseID, CheeseID, hasFries, timePlaced, isActive) 
				VALUES (:OrderID, :UserID, :BreadID, :BaseID, :CheeseID, :hasFries, timePlaced, isActive)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("OrderID", $order->OrderID);
		$stmt->bindParam("UserID", $order->UserID);
		$stmt->bindParam("BreadID", $order->BreadID);
		$stmt->bindParam("BaseID", $order->BaseID);
		$stmt->bindParam("CheeseID", $order->CheeseID);
		$stmt->bindParam("hasFries", $order->hasFries);
		$stmt->bindParam("isActive", $order->isActive);
		$stmt->execute();
		$order->id = $db->lastInsertId();
		$db = null;
		echo json_encode($order); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateOrder($OrderID) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$order = json_decode($body);
	$sql = "UPDATE Orders SET timeFinished=:timeFinished, isActive=:isActive WHERE OrderID=:OrderID";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("timeFinished", $order->timeFinished)
		$stmt->bindParam("isActive", $order->isActive);
		$stmt->bindParam("OrderID", $OrderID);
		$stmt->execute();
		$db = null;
		echo json_encode($order); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteOrder($OrderID) {
	$sql = "DELETE FROM Orders WHERE OrderID=:OrderID";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("OrderID", $OrderID);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="127.0.0.1";
	$dbuser="root";
	$dbpass="";
	$dbname="cellar";	//database name will need to be changed
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>