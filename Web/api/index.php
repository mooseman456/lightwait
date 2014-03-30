<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/orders', 'getOrders');
$app->get('/menu', 'getMenuData');
$app->post('/order', 'addOrder');
$app->post('/webOrder', 'webOrder');

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

function webOrder() {
  $mysqli = getConnection();
  date_default_timezone_set('America/Chicago');
  $query = "INSERT INTO Orders (user_id, hasFries, timePlaced, isActive, bread_id, base_id, cheese_id) 
            VALUES (25, true, "."\"" . date('Y/m/d H:i:s') ."\", 1, (SELECT bread_id FROM Breads WHERE name = \"".$_POST['breadType'] ."\"), 
            (SELECT base_id FROM Bases WHERE name = \"". $_POST['baseType'] ."\"), (SELECT cheese_id FROM Cheeses WHERE name = \"".$_POST['cheeseType']."\"))";
  echo $query;
  $mysqli->query($query);

}

function addOrder() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $order = json_decode($request, true);
  $query = "INSERT INTO Orders (user_id, hasFries, timePlaced, isActive, bread_id, base_id, cheese_id) 
            VALUES (".$order['user_id'].", ". $order['hasFries'] .", \"". $order['timePlaced'] ."\", 1, (SELECT bread_id FROM Breads WHERE name = \"".$order['bread'] ."\"), 
            (SELECT base_id FROM Bases WHERE name = \"".$order['base'] ."\"), (SELECT cheese_id FROM Cheeses WHERE name = \"".$order['cheese']."\"))";
  
  $mysqli->query($query);

  $orderID = $mysqli->insert_id;

  foreach($order['toppings'] as $key=>$val) {
    $query = "INSERT INTO OrderToppings (order_id, topping_id) VALUES ('$orderID', (SELECT topping_id FROM Toppings WHERE name='".$order['toppings'][$key]."'))";
    $mysqli->query($query);

    $return = json_encode($query);
    echo $return;
  }

}

function getMenuData() {

  $mysqli = getConnection();

  // Check mysqli connection
  if (mysqli_connect_errno()) {
    printf("Connect failed: %s\n", mysqli_connect_error());
    exit();
  }

  $query  = "SELECT name FROM Bases WHERE available = 1;";
  $query .= "SELECT name FROM Breads WHERE available = 1;";
  $query .= "SELECT name FROM Cheeses WHERE available = 1;";
  $query .= "SELECT name FROM Toppings WHERE available = 1;";
  $query .= "SELECT name FROM Fries WHERE available = 1";

  // Perform a multiquery to get all the ingredients
  if ($mysqli->multi_query($query)) {
    // Arrays that will hold all menu data
    $menuTypes = array("Bases", "Breads", "Cheeses", "Toppings", "Fries");
    $baseArray = array();
    $breadArray = array();
    $cheeseArray = array();
    $toppingArray = array();
    $friesArray = array();
    $menuData = array("Bases"=>$baseArray, "Breads"=>$breadArray, "Cheeses"=>$cheeseArray, "Toppings"=>$toppingArray, "Fries"=>$friesArray);
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