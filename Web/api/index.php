<?php

    session_cache_limiter(false);
    session_start();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/orders', 'getOrders');
$app->get('/activeorders', 'getActiveOrders');
$app->get('/activeingredients', 'getActiveIngredients');
$app->get('/recall', 'recallOrder');
$app->get('/ingredients', 'getAvailability');
$app->get('/account/:email/:password', 'logIn');
$app->get('/accountinfo', 'getAccountInfo');
$app->post('/order', 'addMobileOrder');
$app->post('/webOrder', 'addWebOrder');
$app->post('/account/:usertype/:fName/:lName/:email/:password/:phoneNumber', 'createAccount');
$app->post('/account', 'createMobileAccount');
$app->put('/:orderid/:userid', 'updateOrder');
$app->put('/updateAvailability/:type/:available/:id', 'updateAvailability');
$app->put('/updateaccount/:password/:fName/:lName/:email/:phoneNumber', 'updateAccount');
$app->post('/ingredient/:type/:name', 'addIngredient');
$app->post('/logout', 'logout');

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

function addWebOrder() {
  $mysqli = getConnection();
  date_default_timezone_set('America/Chicago');
  $query = "INSERT INTO Orders (user_id, timePlaced, isActive, bread_id, base_id, cheese_id, fry_id) 
            VALUES (".$_SESSION['user_id'].", "."\"" . date('Y/m/d H:i:s') ."\", 1, (SELECT id FROM Breads WHERE name = \"".$_POST['breadType'] ."\"), 
            (SELECT id FROM Bases WHERE name = \"". $_POST['baseType'] ."\"), (SELECT id FROM Cheeses WHERE name = \"".$_POST['cheeseType']."\"),
            (SELECT id FROM Fries WHERE name = \"".$_POST['friesType']."\"))";
  //echo $query;
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]");

  echo "<h2>Thank you for your order!</h2>";
  echo "<h3>It has been received and is underway!</h3>";
  echo "<a href=../../index.php>Return home</a><br>";
  echo "<a href=../../order.php>New Order</a>";
}

function addMobileOrder() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $order = json_decode($request, true);

  $query = "INSERT INTO Orders (user_id, timePlaced, bread_id, base_id, cheese_id, fry_id)
            VALUES (" . $order['user_id'] . ", '" . date('Y/m/d H:i:s') . "', " . $order['bread'] . ", " . $order['base'] . ", " . $order['cheese'] . ", " . $order['fries'].")";


  $mysqli->query($query);

  echo json_encode($query);

  $orderID = $mysqli->insert_id;

  foreach($order['toppings'] as $key=>$val) {
    $query = "INSERT INTO OrderToppings (order_id, topping_id) VALUES ('".$orderID."', '".$val."')";
    $mysqli->query($query);
    
  }

  $mysqli->close();
}

function updateOrder($orderID, $userID) {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();

  // Query for the user's device token
  $query = "SELECT device_token FROM Users WHERE user_id = " . $userID;
  $result = $mysqli->query($query) or trigger_error($mysqli->error."[$query]"); 

  // Check to see if user has registered for push notifications, returns true if
  // device token is available. Then add to PushQueue
  if($result) {
    $deviceToken = $result->fetch_array();

    // Query for the user's order base
    $query = "SELECT name FROM Bases WHERE id =  (SELECT base_id FROM Orders WHERE order_id =  " . $orderID . ")";
    $base = $mysqli->query($query)->fetch_array() or trigger_error($mysqli->error."[$query]");

    $alert = 'Your ' . strtolower($base[0]) . ' is ready for pick up at Macs Place';
    $body['aps'] = array(
      'alert' => $alert, 
      'sound' => 'default'
    );

    $payload = json_encode($body);
    $query = "INSERT INTO PushQueue (device_token, payload, time_queued) VALUES ('" . $deviceToken[0] . "', '" . $payload . "', CURRENT_TIMESTAMP())";
    $mysqli->query($query);
  }

  // Remove the order from the queue
  $query = "UPDATE Orders SET isActive=0 WHERE order_id=$orderID";
  $mysqli->query($query);

  $mysqli->close();
}

function updateAvailability($type, $available, $id) {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();

  $query = "UPDATE $type SET available=$available WHERE id=$id";
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
}

function getActiveOrders() {
  $mysqli = getConnection();

  $query = "SELECT Orders.order_id, Orders.user_id, Users.fName, Users.lName, Breads.name as bread_name, Bases.name as base_name, Cheeses.name as cheese_name, Fries.name as fry_type, Orders.timePlaced 
            FROM Orders JOIN Users ON Orders.user_id=Users.user_id JOIN Breads ON Orders.bread_id=Breads.id JOIN Bases 
            ON Orders.base_id=Bases.id JOIN Cheeses ON Orders.cheese_id=Cheeses.id JOIN Fries ON Fries.id=Orders.fry_id 
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

function createAccount($usertype, $fName, $lName, $email, $password, $phoneNumber) {
  $mysqli = getConnection();

  //Salt and Hash the password
  $password = hash("sha512", $password);

  $query = "INSERT INTO Users (userType, fName, lName, email, password, phoneNumber) VALUES ('$usertype', '$fName', '$lName', '$email', '$password', '$phoneNumber')";
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 
  
  $mysqli->close();

  echo json_encode($query);
}

function createMobileAccount() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $accountInfo = json_decode($request, true);

  //Salt and Hash the password
  $password = hash("sha512", $accountInfo['password']);

  $query = "INSERT INTO Users (userType, fName, lName, email, password, phoneNumber) VALUES (1, '" . $accountInfo['fName'] . "', '" . $accountInfo['lName'] . "', '" . $accountInfo['email'] . "', '" . $password . "', '" . $accountInfo['phoneNumber'] . "')";

  $mysqli->query($query);

  echo json_encode($query);

  $mysqli->close();
}

function logIn($email, $password) {
  $mysqli = getConnection();

  $email = $mysqli->escape_string($email);
  $password = $mysqli->escape_string($password);

  $password = hash("sha512", $password);

  $query = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 

  $row = $result->fetch_assoc();

  if ($row['user_id']) {
    $fName = $row['fName'];
    $arr = array();
    $arr['fName'] = $fName;

    //Set SESSION variables
    $_SESSION['fName'] = $row['fName'];
    $_SESSION['lName'] = $row['lName'];
    $_SESSION['user_id'] = $row['user_id'];
    $_SESSION['email'] = $row['email'];
    $_SESSION['phoneNumber'] = $row['phoneNumber'];
    $_SESSION['userType'] = $row['userType'];

    echo json_encode($arr);
  } 
}

function getAccountInfo() {
  if (!isset($_SESSION['user_id'])) {
    //Set SESSION variables
    $_SESSION['fName'] = $account['fName'];
    $_SESSION['lName'] = $account['lName'];
    $_SESSION['user_id'] = $account['user_id'];
    $_SESSION['email'] = $account['email'];
    $_SESSION['phoneNumber'] = $account['phoneNumber'];
    $_SESSION['userType'] = $account['userType'];
    echo json_encode($account);
  } else {
    echo json_encode("Failed");
  }
}

function getActiveIngredients() {
  $mysqli = getConnection();

  $query  = "SELECT name, isAvailable FROM Bases WHERE available = 1;";
  $query .= "SELECT name, isAvailable FROM Breads WHERE available = 1;";
  $query .= "SELECT name, isAvailable FROM Cheeses WHERE available = 1;";
  $query .= "SELECT name, isAvailable FROM Toppings WHERE available = 1;";
  $query .= "SELECT name, isAvailable FROM Fries WHERE available = 1";

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

function getAvailability() {
  $mysqli = getConnection();

  $query  = "SELECT id, name, available FROM Bases;";
  $query .= "SELECT id, name, available FROM Breads;";
  $query .= "SELECT id, name, available FROM Cheeses;";
  $query .= "SELECT id, name, available FROM Toppings;";
  $query .= "SELECT id, name, available FROM Fries";

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
    $counter = 0;

    while ($mysqli->more_results()) {
      // Store first result set
      $mysqli->next_result();
      $menuIndex++;
      $counter = 0;
      if ($result = $mysqli->store_result()) {
        while ($row = $result->fetch_assoc()) {
          $menuData[$menuTypes[$menuIndex]][$counter]['id'] = $row['id'];
          $menuData[$menuTypes[$menuIndex]][$counter]['name'] = $row['name'];
          $menuData[$menuTypes[$menuIndex]][$counter]['available'] = $row['available'];
          $counter++;
        }
        $result->free();
      }
    }
  }
  echo json_encode($menuData);

  // Close mysqli connection
  $mysqli->close();
}

function updateAccount($password, $fName, $lName, $email, $phoneNumber) {

    $mysqli = getConnection();
    $app = \Slim\Slim::getInstance();
    $request = $app->request()->getBody();

    $password = $mysqli->escape_string($password);
    $password = hash("sha512", $password);

    $fName = $mysqli->escape_string($fName);
    $lName = $mysqli->escape_string($lName);
    $email = $mysqli->escape_string($email);
    $phoneNumber = $mysqli->escape_string($phoneNumber);

    //Check if the password is correct
    $query = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
    $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 

    $row = $result->fetch_assoc();

    //Correct email and pass provided
    if ($row['user_id']) {

        $query = "UPDATE Users SET fName='$fName', lName='$lName', phoneNumber='$phoneNumber' WHERE user_id='".$row['user_id']."' ";
        $mysqli->query($query) or trigger_error($mysqli->error."[$query]"); 

    } else {    //Incorrect email and pass

    }

    $mysqli->close();
    echo json_encode($query); 
}

function addIngredient($type, $name) {
    $mysqli = getConnection();

    $query = "INSERT INTO ".$type." (`name`) VALUES ('".$name."')";
    $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 

    $mysqli->close();

    echo json_encode($result);
    }

function logout() {
    session_destroy();
}

function getConnection() {
	$dbhost='localhost';
	$dbuser='root';
	$dbpass='root';
	$dbname='lightwait';
	$db = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
    if($db->connect_errno > 0) {
        die('Unable to connect to database [' . $db->connect_error . ']');
    }
  return $db;
}

function writeToLog($message)
{
  if ($fp = fopen('log/lightwait_development.log', 'at'))
  {
    fwrite($fp, date('c') . ' ' . $message . PHP_EOL);
    fclose($fp);
  }
}

?>