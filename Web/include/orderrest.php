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
	$sql = "SELECT Users.fName, Users.lName, Orders.timePlaced, Orders.order_id, Breads.name, Bases.name, Cheeses.name,
				(SELECT name FROM Toppings), (SELECT hasFries FROM Orders WHERE hasFries = true) FROM Orders INNER JOIN Users ON Orders.user_id = Users.user_id 
				INNER JOIN Breads ON Orders.bread_id = Breads.bread_id INNER JOIN Bases ON Orders.base_id = Bases.base_id INNER JOIN Cheeses ON Orders.cheese_id = Cheeses.cheese_id 
				INNER JOIN OrderToppings ON Orders.order_id = OrderToppings.order_id WHERE Orders.isActive = true ORDER BY Orders.order_id";
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
	$sql = "INSERT INTO Orders (user_id, hasFries, timePlaced, isActive, bread_id, base_id, cheese_id)
				VALUES (:user_id, :hasFries, :timePlaced, :isActive, (SELECT bread_id FROM Breads WHERE name = :breadname), (SELECT base_id FROM Bases WHERE name = :basename), 
				(SELECT cheese_id FROM Cheeses WHERE name = :cheesename))";
	$tsql = "INSERT INTO OrderToppings (order_id, topping_id) VALUES(:toppingname)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("user_id", $order->UserID);
		$stmt->bindParam("hasFries", $order->hasFries);
		$stmt->bindParam("timePlaced", $order->timePlaced)
		$stmt->bindParam("isActive", $order->isActive);
		$stmt->bindParam("breadname", $order->Bread);
		$stmt->bindParam("basename", $order->Base);
		$stmt->bindParam("cheesename", $order->Cheese);
		$stmt->bindParam("toppings", $order->Toppings);
		$stmt->execute();
		foreach(:toppings as $topping)
		{
			$stmt = $db->prepare($tsql);
			$stmt->bindParam("toppingname", $topping); //PDO::PARAM_STR
			$stmt->execute();
		}
		//$order->id = $db->lastInsertId();
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