<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/orders', 'getOrders');

$app->run();

function getOrders() {
	$sql = "select * FROM orders ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$orders = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($orders);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="Macs";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>