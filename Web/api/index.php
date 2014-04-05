<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/orders', 'getOrders');
$app->get('/menu', 'getMenuData');
$app->get('/activeorders', 'getActiveOrders');
$app->get('/recall', 'recallOrder');
$app->get('/recall/:email/:password', 'logIn');
$app->post('/order', 'addOrder');
$app->post('/webOrder', 'webOrder');
$app->post('/account/:fName/:lName/:email/:password/:phoneNumber', 'createAccount');
$app->put('/:id', 'updateOrder');
$app->put('/:type/:id', 'updateAvailability');

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
  $query = "INSERT INTO Orders (user_id, timePlaced, isActive, bread_id, base_id, cheese_id, fry_id) 
            VALUES (25, "."\"" . date('Y/m/d H:i:s') ."\", 1, (SELECT bread_id FROM Breads WHERE name = \"".$_POST['breadType'] ."\"), 
            (SELECT base_id FROM Bases WHERE name = \"". $_POST['baseType'] ."\"), (SELECT cheese_id FROM Cheeses WHERE name = \"".$_POST['cheeseType']."\"),
            (SELECT fry_id FROM Fries WHERE name = \"".$_POST['friesType']."\"))";
  //echo $query;
  $mysqli->query($query);

  echo "<h2>Thank you for your order!</h2>";
  echo "<h3>It has been received and is underway!</h3>";
  echo "<a href=http://54.186.252.120.com/Web/api/index.php>Return home</a>";
}

function addOrder() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $order = json_decode($request, true);
  $query = "INSERT INTO Orders (user_id, timePlaced, isActive, bread_id, base_id, cheese_id, fry_id) 
            VALUES (".$order['user_id'].", \"". $order['timePlaced'] ."\", 1, (SELECT bread_id FROM Breads WHERE name = \"".$order['bread'] ."\"), 
            (SELECT base_id FROM Bases WHERE name = \"".$order['base'] ."\"), (SELECT cheese_id FROM Cheeses WHERE name = \"".$order['cheese']."\"), 
            (SELECT fry_id FROM Fries WHERE name = \"".$order['fries']."\"))";

  $mysqli->query($query);

  $orderID = $mysqli->insert_id;

  foreach($order['toppings'] as $key=>$val) {
    $query = "INSERT INTO OrderToppings (order_id, topping_id) VALUES ('$orderID', (SELECT topping_id FROM Toppings WHERE name='".$order['toppings'][$key]."'))";
    $mysqli->query($query);

    $return = json_encode($query);
    echo $return;
  }

  $mysqli->close();

}

function updateOrder($id) {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();

  $query = "UPDATE Orders SET isActive=0 WHERE order_id=$id";
  $mysqli->query($query);

  $mysqli->close();

  echo json_encode($query); 
}

function updateAvailability($type, $id) {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();

  if (strtolower($type) == "fries") {
    $idName = "fry_id";
  } else {
    $idName = substr(strtolower($type), 0, -1)."_id";
  }
  $query = "UPDATE $type SET available=0 WHERE $idName='$id'";
  $mysqli->query($query);

  $mysqli->close();

  echo json_encode($query); 
}

function recallOrder() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();

  $query = "CALL recallOrder";

  $mysqli->query($query);

  $mysqli->close();

  echo json_encode($query); 
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

function getActiveOrders() {
  $mysqli = getConnection();

  $query = "SELECT Orders.order_id, Users.fName, Users.lName, Breads.name as bread_name, Bases.name as base_name, Cheeses.name as cheese_name, Fries.name as fry_type, Orders.timePlaced 
            FROM Orders JOIN Users ON Orders.user_id=Users.user_id JOIN Breads ON Orders.bread_id=Breads.bread_id JOIN Bases 
            ON Orders.base_id=Bases.base_id JOIN Cheeses ON Orders.cheese_id=Cheeses.cheese_id JOIN Fries ON Fries.fry_id=Orders.fry_id 
            WHERE Orders.isActive='1'";

  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]");
  
  while ($row = $result->fetch_assoc()) {
           // $row['ingredients'][] = $row['bread_name'];
           // $row['ingredients'][] = $row['base_name'];
           // $row['ingredients'][] = $row['cheese_name'];
           // $row['ingredients'][] = $row['fry_type'];
           $array[] = $row;
  }

  $encoded = json_encode($array);
  printf($encoded);

  $mysqli->close();
}

function createAccount($fName, $lName, $email, $password, $phoneNumber) {
  $mysqli = getConnection();

  //Salt and Hash the password
  $password = hash("sha512", $password);

  $query = "INSERT INTO Users (fName, lName, email, password, phoneNumber) VALUES ('$fName', '$lName', '$email', '$password', '$phoneNumber')";
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 
  

  $mysqli->close();

  echo json_encode("Success");
}

function logIn($email, $password) {
  $mysqli = getConnection();



  echo json_encode("Success");
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