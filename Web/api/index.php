<?php

    session_cache_limiter(false);
    session_start();

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/activeorders', 'getActiveOrders');
$app->get('/activeingredients', 'getActiveIngredients');
$app->get('/recall', 'recallOrder');
$app->get('/ingredients', 'getAvailability');
$app->get('/account/:email/:password', 'logIn');
$app->get('/accountinfo', 'getAccountInfo');
$app->post('/order', 'addMobileOrder');
$app->post('/webOrder', 'addWebOrder');
$app->post('/account/:usertype/:fName/:lName/:email/:password', 'createAccount');
$app->post('/account', 'createMobileAccount');
$app->put('/account/devicetoken', 'updateDeviceToken');
$app->put('/:orderid/:userid', 'updateOrder');
$app->put('/updateAvailability/:type/:available/:id', 'updateAvailability');
$app->put('/updateemail/:currentEmail/:newEmail', 'updateEmail');
$app->put('/updatepassword/:currentPassword/:newPassword', 'updatePassword');
$app->post('/ingredient/:type/:name', 'addIngredient');
$app->post('/logout', 'logout');
$app->post('/dquery', 'dynamicQuery');
$app->get('/squery/:type', 'simpleQuery');
$app->get('/fillDB', 'fillDB');
$app->put('/removeingredient/:type/:id', 'removeIngredient');
$app->get('/allingredients', 'getAllIngredients');

$app->run();

function addWebOrder() {
  $mysqli = getConnection();
  date_default_timezone_set('America/Chicago');
  $query = "INSERT INTO Orders (user_id, timePlaced, isActive, bread_id, base_id, cheese_id, fry_id) 
            VALUES (".$_SESSION['user_id'].", "."\"" . date('Y/m/d H:i:s') ."\", 1, (SELECT id FROM Breads WHERE name = \"".$_POST['breadType'] ."\"), 
            (SELECT id FROM Bases WHERE name = \"". $_POST['baseType'] ."\"), (SELECT id FROM Cheeses WHERE name = \"".$_POST['cheeseType']."\"),
            (SELECT id FROM Fries WHERE name = \"".$_POST['friesType']."\"))";
  //echo $query;
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]");


	$orderID = $mysqli->insert_id;

	if (!empty($_POST['toppingType']))
	{
		foreach($_POST['toppingType'] as $topping) {
			$query = "INSERT INTO OrderToppings(order_id, topping_id)
					VALUES(".$orderID.", "."(SELECT id FROM Toppings WHERE name = \"". $topping."\"))";
					$mysqli->query($query);
		}

	}
  else {
    $query = "INSERT INTO OrderToppings(order_id, topping_id) VALUES(".$orderID.", 12);";
    $mysqli->query($query);
  }

  //foreach($_POST['toppingType'] as $key=>$val){
  //  $query = "INSERT INTO OrderToppings (order_id, topping_id) VALUES ('".$orderID."', '".$val."')";
  //  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");
  //}

  //echo "<h2>Thank you for your order!</h2>";
  //echo "<h3>It has been received and is underway!</h3>";
  //echo "<a href=../../order.php>New Order</a>";
  //$result->free();
  $mysqli->close();
  //include('/Web/order.php');
}

function addMobileOrder() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $order = json_decode($request, true);

  date_default_timezone_set('America/Chicago');

  $query = "INSERT INTO Orders (user_id, timePlaced, bread_id, base_id, cheese_id, fry_id)
            VALUES (" . $order['user_id'] . ", '" . date('Y/m/d H:i:s') . "', " . $order['Bread'] . ", " . $order['Base'] . ", " . $order['Cheese'] . ", " . $order['Fries'].")";

  $mysqli->query($query);

  $orderID = $mysqli->insert_id;

  foreach($order['Toppings'] as $key=>$val) {
    $query = "INSERT INTO OrderToppings (order_id, topping_id) VALUES ('".$orderID."', '".$val."')";
    $mysqli->query($query); 
  }

  echo json_encode("Success");

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

  $result->free();
  $mysqli->close();
}

function updateAvailability($type, $available, $id) {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();

  $query = "UPDATE $type SET available=$available WHERE id=$id";
  $mysqli->query($query);

  //$result->free();

  echo json_encode($query); 
  $mysqli->close();
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
  
  $query = "SET SESSION group_concat_max_len = 10000";
  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

  $query = "SET @sql = NULL";
  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

  $query = "SELECT GROUP_CONCAT(DISTINCT CONCAT('MAX(CASE WHEN OrderToppings.topping_id = ''', Toppings.id, ''' THEN Toppings.name END) AS \'',Toppings.name, '\'') ) INTO @sql FROM Toppings";
  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

  $query = "SET @sql = CONCAT('SELECT Orders.order_id, Orders.user_id, Users.fName, Users.lName, Breads.name as bread_name, Bases.name as base_name, Cheeses.name as cheese_name, Fries.name as fry_type, Orders.timePlaced,', @sql, 'FROM Orders JOIN Users ON Orders.user_id=Users.user_id JOIN Breads ON Orders.bread_id=Breads.id JOIN Bases ON Orders.base_id=Bases.id JOIN Cheeses ON Orders.cheese_id=Cheeses.id JOIN Fries ON Fries.id=Orders.fry_id JOIN OrderToppings ON Orders.order_id = OrderToppings.order_id JOIN Toppings ON OrderToppings.topping_id = Toppings.id WHERE Orders.isActive=1 GROUP BY Orders.order_id ORDER BY Orders.order_id')";
  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

  $query = "PREPARE stmt FROM @sql";
  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

  $query = "EXECUTE stmt";
  $result = $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

  $query = "DEALLOCATE PREPARE stmt";

  $mysqli->query($query)  or trigger_error($mysqli->error."[$query]");

  $array = array();
  
  while ($row = $result->fetch_assoc()) {
    //$array[] = $row;

    foreach ($row as $key => $value) {
      if ($value == $key) {
        $row['toppings'][] = $key;
        unset($row[$key]);
      }
    }

    // foreach ($row['toppings'] as $key => $value) {
    //   if ($row[$value] == 'NULL') {
    //     unset($row['topppings'][$key]);
    //   }
    // }

    foreach ($row as $key => $value) {
      if ($value == NULL) {
        unset($row[$key]);
      }
    }
    
    if (array_key_exists("No Toppings", $row)) {
      unset($row["No Toppings"]);
      $row['toppings'] = "No Toppings";
    }

    $array[] = $row;
  }
  $result->free();

  echo json_encode($array);

  $mysqli->close();
}

function createMobileAccount() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $accountInfo = json_decode($request, true);

  //Salt and Hash the password
  $password = hash("sha512", $accountInfo['password']);

  $query = "INSERT INTO Users (userType, fName, lName, email, password) VALUES (1, '" . $accountInfo['fName'] . "', '" . $accountInfo['lName'] . "', '" . $accountInfo['email'] . "', '" . $password . "')";

  $mysqli->query($query);

  $userID = $mysqli->insert_id;
  $returnArray['userID'] = $userID;

  echo json_encode($returnArray);

  $mysqli->close();
}

function updateDeviceToken() {
  $mysqli = getConnection();
  $app = \Slim\Slim::getInstance();
  $request = $app->request()->getBody();
  $accountInfo = json_decode($request, true);
 
  $query = "UPDATE Users SET device_token='".$accountInfo['device_token']."' WHERE user_id='".$accountInfo['userID']."' ";
 
  $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 
 
  echo json_encode($query);
  
  $mysqli->close();
}

function createAccount($usertype, $fName, $lName, $email, $password) {
  $mysqli = getConnection();

  $fName = $mysqli->escape_string($fName);
  $lName = $mysqli->escape_string($lName);
  $email = $mysqli->escape_string($email);
  $password = $mysqli->escape_string($password);

  //Salt and Hash the password
  $password = hash("sha512", $password);

  //Check if email is already used
  $query = "SELECT COUNT(*) as count FROM Users WHERE email='$email'";
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 
  $row = $result->fetch_assoc();

  try {
    if ($row['count'] == 0) {

        $query = "INSERT INTO Users (userType, fName, lName, email, password) VALUES ('$usertype', '$fName', '$lName', '$email', '$password')";
        $result = $mysqli->query($query);

        if (!$result) {
         throw new Exception("Could not create account");
        }

        $user_id = $mysqli->insert_id;
        //Set SESSION variables
        if (!isset($_SESSION['userType'])) {
          $_SESSION['fName'] = $fName;
          $_SESSION['lName'] = $lName;
          $_SESSION['user_id'] = $user_id;
          $_SESSION['email'] = $email;
          $_SESSION['userType'] = $usertype;
        }

    } else {
      throw new Exception("Email already in use");
    }

    echo json_encode($query);

    $mysqli->close();
}
  catch(Exception $e){
    echo $e->getMessage();
  }
  
}

function logIn($email, $password) {
  $mysqli = getConnection();

  $email = $mysqli->escape_string($email);
  $password = $mysqli->escape_string($password);

  $password = hash("sha512", $password);

  $query = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
  $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 

  $row = $result->fetch_assoc();

  try {
    if ($row['user_id']) {
      $fName = $row['fName'];
      $arr = array();
      $arr['fName'] = $fName;
      $arr['userID'] = $row['user_id'];

      //Set SESSION variables
      $_SESSION['fName'] = $row['fName'];
      $_SESSION['lName'] = $row['lName'];
      $_SESSION['user_id'] = $row['user_id'];
      $_SESSION['email'] = $row['email'];
      $_SESSION['userType'] = $row['userType'];

      echo json_encode($arr);
    }
    else
      throw new Exception('Bad login.');
  } catch(Exception $e) {
    echo $e->getMessage(), "\n";
  }

  $result->free();
  $mysqli->close();

}

function getAccountInfo() {
  try{
    if (isset($_SESSION['user_id'])) {
      //Set SESSION variables
      $account['fName'] = $_SESSION['fName'];
      $account['lName'] = $_SESSION['lName'];
      $account['user_id'] = $_SESSION['user_id'];
      $account['email'] = $_SESSION['email'];
      $account['userType'] = $_SESSION['userType'];
      echo json_encode($account);
    } else {
      throw new Exception('Why is this here?');
    }
  } catch(Exception $e) {
    echo 'Caught exception: ', $e->getMessage();
  }
}

function getActiveIngredients() {
  $mysqli = getConnection();

  $query  = "SELECT name, isAvailable FROM Bases WHERE available = 1 AND isActive = 1;";
  $query .= "SELECT name, isAvailable FROM Breads WHERE available = 1 AND isActive = 1;";
  $query .= "SELECT name, isAvailable FROM Cheeses WHERE available = 1 AND isActive = 1;";
  $query .= "SELECT name, isAvailable FROM Toppings WHERE available = 1 AND id != 12 AND isActive = 1;";
  $query .= "SELECT name, isAvailable FROM Fries WHERE available = 1 AND isActive = 1";

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

  $result->free();
  $mysqli->close();
}

function dynamicQuery() {
    $mysqli = getConnection();
    $app = \Slim\Slim::getInstance();
    $request = $app->request()->getBody();
    $jsonQuery = json_decode($request, true);

    $dQuery = "SELECT ";

    if($jsonQuery['count'] == true) {
    $dQuery .= "COUNT(*) AS count ";
    } else {
    $dQuery .= "* ";
    }

    // FROM Orders WHERE
    $dQuery .= "FROM Orders WHERE ";

    // If a start time is given
    if ($jsonQuery['startTime']) {
    $dQuery .= "(timePlaced >= '" . $jsonQuery['startTime'] . "' ";
    }

    // If both a start time and end time is given
    if ($jsonQuery['startTime'] && $jsonQuery['endTime']) {
    $dQuery .= "AND ";
    }

    // If a start time is given, but not an end time
    if($jsonQuery['startTime'] && !$jsonQuery['endTime']) {
    $dQuery .= ") AND ";
    }

    // If an end time is given
    if ($jsonQuery['endTime']) {
      $dQuery .= "timePlaced <= '" . $jsonQuery['endTime']  . "'";
    }

        // If both a start time and end time is given
    if ($jsonQuery['startTime'] && $jsonQuery['endTime']) {
      $dQuery .= ") ";
    }

        // If both an end time ingredients are given
    if ($jsonQuery['endTime'] && $jsonQuery['queryArray']) {
      $dQuery .= "AND ";
    }

    if ($jsonQuery['queryArray']) {
      $dQuery .= "(";
        foreach ($jsonQuery['queryArray'] as $key=>$val) {
          foreach ($jsonQuery['queryArray'][$key] as $innerKey => $value) {
            //$key is the base_id, bread_id, etc
            $tableName = getTableName($key);
            $dQuery .= $key . "=" . "(SELECT id FROM " . $tableName . " WHERE name = '" . $jsonQuery['queryArray'][$key][$innerKey] . "') " . $jsonQuery['withConjunction'] . " ";
          }
        }

        // Remove the last AND/OR
        $dQuery = substr($dQuery, 0, -(strlen($jsonQuery['withConjunction'])+1));
        $dQuery .= ") ";
    }

    if ($jsonQuery['notQueryArray']) {
      $dQuery .= "AND (";
        foreach ($jsonQuery['notQueryArray'] as $key=>$val) {
          foreach ($jsonQuery['notQueryArray'][$key] as $innerKey => $value) {
            //$key is the base_id, bread_id, etc
            $tableName = getTableName($key);
            $dQuery .= $key . "!=" . "(SELECT id FROM " . $tableName . " WHERE name = '" . $jsonQuery['notQueryArray'][$key][$innerKey] . "') " . $jsonQuery['withoutConjunction'] . " ";
          }
        }

            // Remove the last AND/OR
        $dQuery = substr($dQuery, 0, -(strlen($jsonQuery['withoutConjunction'])+1));
        $dQuery .= ")";
    }

    writeToLog(json_encode($jsonQuery));

    $result = $mysqli->query($dQuery) or trigger_error($mysqli->error."[$dQuery]"); 

    $finalResults = array();
    while ($row = $result->fetch_assoc()) {
      array_push($finalResults, $row);
    }

    $result->free();

    echo json_encode($dQuery);

    $mysqli->close();
}

function getTableName($name) {
    writeToLog($name);
    if ($name == "base_id") {
    return "Bases";
  } else if ($name == "bread_id") {
    return "Breads";
  } else if ($name == "cheese_id") {
    return "Cheeses";
  } else if ($name == "fry_id") {
    return "Fries";
  }
}

// Used for analytics. It returns sumple data from the DB about each ingredient.
// Just the COUNT of each ingredient
function simpleQuery($type) {
  $mysqli = getConnection();

  if ($type == "Bases") {
    $selector = "base_id";
  } else if ($type == "Breads") {
    $selector = "bread_id";
  } else if ($type == "Cheeses") {
    $selector = "cheese_id";
  } else if ($type == "Fries") {
    $selector = "fry_id";
  }

  $dQuery = "SELECT $type.name " . ", COUNT(*) AS count FROM Orders JOIN $type ON Orders.". $selector ."= $type.id GROUP BY " . $selector;

  $result = $mysqli->query($dQuery) or trigger_error($mysqli->error."[$dQuery]"); 

  $finalResults = array();
  $resultRow = array();
  while ($row = $result->fetch_assoc()) {
        $resultRow[0]=$row['name'];
        $resultRow[1]=(int)$row['count'];
        array_push($finalResults, $resultRow);
  }

  $result->free();

  echo json_encode($finalResults);

  $mysqli->close();
}

// Gets the availabilty of every ingredient offered
function getAvailability() {
  $mysqli = getConnection();

  $query  = "SELECT id, name, available FROM Bases WHERE isActive = 1;";
  $query .= "SELECT id, name, available FROM Breads WHERE isActive = 1;";
  $query .= "SELECT id, name, available FROM Cheeses WHERE isActive = 1;";
  $query .= "SELECT id, name, available FROM Toppings WHERE ID != 12 AND isActive = 1;";
  $query .= "SELECT id, name, available FROM Fries WHERE isActive = 1";

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
function updateEmail($currentEmail, $newEmail) {

    $mysqli = getConnection();
    $app = \Slim\Slim::getInstance();
    $request = $app->request()->getBody();
    try {
      if ($currentEmail != $_SESSION['email'])
        throw new Exception("Email incorrect");

      $newEmail = $mysqli->escape_string($newEmail);
      $query = "SELECT COUNT(*) as count FROM Users WHERE email='$newEmail'";
      $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 
      $row = $result->fetch_assoc();
      //Email is currently available
      if ($row['count'] === 0) {

          $query = "UPDATE Users SET email='$newEmail' WHERE user_id='".$_SESSION['user_id']."' ";
          $mysqli->query($query) or trigger_error($mysqli->error."[$query]"); 
          $_SESSION['email'] = $newEmail;

      } else {    //Email in use
        throw new Exception("Email already in use");
      }
      $result->free();
      $mysqli->close();
      echo json_encode($query);
    }
    catch (Exception $e) {
      echo $e->getMessage();
    }
     
}

function updatePassword($currentPassword, $newPassword){
    $mysqli = getConnection();
    $app = \Slim\Slim::getInstance();
    $request = $app->request()->getBody();

    $newPassword = $mysqli->escape_string($newPassword);
    $newPassword = hash("sha512", $newPassword);

    $currentPassword = $mysqli->escape_string($currentPassword);
    $currentPassword = hash("sha512", $currentPassword);

    //Check if the password is correct
    $query = "SELECT password FROM Users WHERE user_id='".$_SESSION['user_id']."' ";
    $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 
    try {
      $row = $result->fetch_assoc();
      if ($currentPassword != $row['password'])
        throw new Exception("Password incorrect");

      $query = "UPDATE Users SET password='$newPassword' WHERE user_id='".$_SESSION['user_id']."' ";
      $mysqli->query($query) or trigger_error($mysqli->error."[$query]"); 

      $mysqli->close();
      echo json_encode($query); 
    }
    catch (Exception $e) {
      echo $e->getMessage();
    }
}

/*function updateAccount($password, $fName, $lName, $email) {

    $mysqli = getConnection();
    $app = \Slim\Slim::getInstance();
    $request = $app->request()->getBody();

    $password = $mysqli->escape_string($password);
    $password = hash("sha512", $password);

    $fName = $mysqli->escape_string($fName);
    $lName = $mysqli->escape_string($lName);
    $email = $mysqli->escape_string($email);

    // Check if the password and email match
    $query = "SELECT * FROM Users WHERE email='$email' AND password='$password'";
    $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 

    $row = $result->fetch_assoc();

    // if Correct email and password provided
    if ($row['user_id']) {

        $query = "UPDATE Users SET fName='$fName', lName='$lName', WHERE user_id='".$row['user_id']."' ";
        $mysqli->query($query) or trigger_error($mysqli->error."[$query]"); 

    } else {    //Incorrect email and pass

    }

    $result->free();
    echo json_encode($query); 
    $mysqli->close();
}*/

// Adds a new ingredient to the specified type
// Example: addIngredient(Topping, Guacamole) would create a new Topping called 
// Guacamole and set it to active and available for Users to order
function addIngredient($type, $name) {
    $mysqli = getConnection();

    $query = "INSERT INTO ".$type." (`name`) VALUES ('".$name."')";
    $result = $mysqli->query($query)  or trigger_error($mysqli->error."[$query]"); 

    $mysqli->close();

    echo json_encode($result);
    $result->free();
    $mysqli->close();
}


// A function that allows debugging php easily
// Writes to lightwait_development.log in the log folder
function writeToLog($message)
{
  if ($fp = fopen('log/lightwait_development.log', 'at'))
  {
    fwrite($fp, date('c') . ' ' . $message . PHP_EOL);
    fclose($fp);
  }
}

// Fills the database with a slew of random orders and random toppings
// Used for troubleshooting, stress testing, and analytics
function fillDB() {
  $mysqli = getConnection();
  //Change this loop time to add more orders to the DB
  for ($i = 0; $i < 30; $i++) {
    $randBread = rand(1, 3);
    $randBase = rand(1, 6);
    $randCheese = rand(1,4);
    $randFry = rand(1, 3);
    date_default_timezone_set('America/Chicago');
    $query = "INSERT INTO Orders (user_id, timePlaced, isActive, bread_id, base_id, cheese_id, fry_id) 
            VALUES (1, "."\"" . date('Y/m/d H:i:s') ."\", 1, ".$randBread .", ". $randBase .", ".$randCheese.",
            ".$randFry.")";
    $mysqli->query($query) or trigger_error($mysqli->error."[$query]");

    $orderID = $mysqli->insert_id;
    echo "$orderID\n";
    //sleep(2);
    $randNumTops = rand(0, 10);
    for ($j = 1; $j < $randNumTops; $j++) {
      $query = "INSERT INTO OrderToppings(order_id, topping_id) VALUES(".$orderID.", ". $j .")";
      $mysqli->query($query) or trigger_error($mysqli->error."[$query]");
    }
  }
  echo "Database fill complete";
  $mysqli->close();
}

// Removes an item from the database (Sets 'isActive'= False for the specified ingredient)
// Note: type is the type of ingredient (base, bread, cheese, fry (or fries), and toppings)
function removeIngredient($type, $id) {
  $mysqli = getConnection();

  if (strtolower($type) == "base") {
    $type = "Bases";
  } else if (strtolower($type) == "bread") {
    $type = "Breads";
  } else if (strtolower($type) == "cheese") {
    $type = "Cheeses";
  } else if (strtolower($type) == "fry" || strtolower($type) == "fries" ) {
    $type = "Fries";
  } else if (strtolower($type) == "topping") {
    $type = "Toppings";
  }

  $query = "UPDATE $type SET isActive=0 WHERE id=$id";

  $mysqli->query($query) or trigger_error($mysqli->error."[$query]");
  
  $mysqli->close();

  echo json_encode("Removed");
}

// Returns a JSON array of all the ingredients whether they are 
// active or removed
function getAllIngredients() {
  $mysqli = getConnection();

  $query  = "SELECT name, isAvailable FROM Bases;";
  $query .= "SELECT name, isAvailable FROM Breads;";
  $query .= "SELECT name, isAvailable FROM Cheeses;";
  $query .= "SELECT name, isAvailable FROM Toppings;";
  $query .= "SELECT name, isAvailable FROM Fries";

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

  $result->free();
  $mysqli->close();
}

//when the user logs out, the session is destroyed 
function logout() {
    session_destroy();
}

//creates a mysqli connection to the DB with these credentials
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


?>