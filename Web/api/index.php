<?php

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

$app->get('/orders', 'getOrders');
$app->get('/menu', 'getMenuData');
$app->post('/order', 'addOrder');

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

// function addOrder() {
//   // $db = getConnection();
//   // $request = Slim::getInstance()->request();
//   // $order = json_decode($request->getBody());

//   //logConsole("Request: ", "hello");
  
//   // $query = "INSERT INTO Orders (user_id, hasFries, timePlaced, isActive, bread_id, base_id, cheese_id)
//   //       VALUES (:user_id, :hasFries, :timePlaced, :isActive, (SELECT bread_id FROM Breads WHERE name = :breadname), (SELECT base_id FROM Bases WHERE name = :basename), 
//   //       (SELECT cheese_id FROM Cheeses WHERE name = :cheesename))";

// }

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

function logConsole($name, $data = NULL, $jsEval = FALSE)
     {
          if (! $name) return false;
 
          $isevaled = false;
          $type = ($data || gettype($data)) ? 'Type: ' . gettype($data) : '';
 
          if ($jsEval && (is_array($data) || is_object($data)))
          {
               $data = 'eval(' . preg_replace('#[\s\r\n\t\0\x0B]+#', '', json_encode($data)) . ')';
               $isevaled = true;
          }
          else
          {
               $data = json_encode($data);
          }
 
          # sanitalize
          $data = $data ? $data : '';
          $search_array = array("#'#", '#""#', "#''#", "#\n#", "#\r\n#");
          $replace_array = array('"', '', '', '\\n', '\\n');
          $data = preg_replace($search_array,  $replace_array, $data);
          $data = ltrim(rtrim($data, '"'), '"');
          $data = $isevaled ? $data : ($data[0] === "'") ? $data : "'" . $data . "'";
 
$js = <<<JSCODE
\n<script>
     // fallback - to deal with IE (or browsers that don't have console)
     if (! window.console) console = {};
     console.log = console.log || function(name, data){};
     // end of fallback
 
     console.log('$name');
     console.log('------------------------------------------');
     console.log('$type');
     console.log($data);
     console.log('\\n');
</script>
JSCODE;
 
          echo $js;
     } # end logConsole

?>