<!Doctype html>
<html>
<head>
   <meta charset="utf-8">
   <title><?php echo $pageTitle ?></title>
   <link rel="stylesheet" type="text/css" href="css/style.css">
   <link href='http://fonts.googleapis.com/css?family=Ubuntu:400,500' rel='stylesheet' type='text/css'>

   <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
   <script src="javascript/main.js"></script>
   <script src="javascript/api.js"></script>
</head>

<body>
   <nav>
      <h1>lightwait</h1>
      <ul>
         <?php
            foreach($navElements as $key => $value) {
               echo '<li><a href='.$value.'>'.$key.'</a></li>';
         } ?>
      </ul>
   </nav>