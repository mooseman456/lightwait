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

function addOrder() {
  $db = getConnection();
  $request = Slim::getInstance()->request();
  $order = json_decode($request->getBody());
  
  $query = "INSERT INTO Orders (user_id, hasFries, timePlaced, isActive, bread_id, base_id, cheese_id)
        VALUES (:user_id, :hasFries, :timePlaced, :isActive, (SELECT bread_id FROM Breads WHERE name = :breadname), (SELECT base_id FROM Bases WHERE name = :basename), 
        (SELECT cheese_id FROM Cheeses WHERE name = :cheesename))";

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
}

function getMenuData() {

  $mysqli = getConnection();

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
    // Arrays that will hold all menu data
    $menuTypes = array("Bases", "Breads", "Cheeses", "Toppings");
    $baseArray = array();
    $breadArray = array();
    $cheeseArray = array();
    $toppingArray = array();
    $menuData = array("Bases"=>$baseArray, "Breads"=>$breadArray, "Cheeses"=>$cheeseArray, "Toppings"=>$toppingArray);
    $menuIndex = -1;

    while ($mysqli->more_results()) {
      // Store first result set
      $mysqli->next_result();
      $menuIndex++;
      if ($result = $mysqli->store_result()) {
        while ($row = $result->fetch_row()) {
          array_push($menuData[$menuTypes[$menuIndex]], $row[0]);
        }
        $result->free();
      }
    }
  }
  $encoded = json_encode($menuData);
  printf($encoded);

  // Close mysqli connection
  $mysqli->close();
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="root";
	$dbpass="root";
	$dbname="lightwait";
	$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
  if($db->connect_errno > 0){
    die('Unable to connect to database [' . $db->connect_error . ']');
  }
  return $db;
}

?>