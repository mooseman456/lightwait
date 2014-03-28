<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/orders', 'getOrders');
$app->get('/menu', 'getMenuData');

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

function getMenuData() {

  $mysqli = new mysqli("localhost", "root", "root", "lightwait");

  // Check mysqli connection
  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

  $query  = "SELECT name FROM Bases;";
  $query .= "SELECT name FROM Breads;";
  $query .= "SELECT name FROM Cheeses;";
  $query .= "SELECT name FROM Toppings";

  // Perform a multiquery to get all the ingredients
  if ($mysqli->multi_query($query)) {
    while ($mysqli->more_results()) {
      /* store first result set */
      $mysqli->next_result();
      if ($result = $mysqli->store_result()) {
        $totalJSON;
        while ($row = $result->fetch_row()) {
          $json = json_encode($row[0]);
          printf("%s\n", $json);
        }
        $result->free();
      }
      /* print divider */
      if ($mysqli->more_results()) {
        printf("-----------------\n");
      }
    }
  }

  // Close mysqli connection
  $mysqli->close();
}

function jsonConcatenation($json) {
  $totalJSON .= (string)$json;
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="lightwait";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>