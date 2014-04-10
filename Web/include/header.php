<!Doctype html>
<html>
<head>
   <meta charset="utf-8">
   <title><?php echo $pageTitle ?></title>
   <link rel="stylesheet" type="text/css" href="css/style.css">
   <link href='http://fonts.googleapis.com/css?family=Ubuntu:400,500' rel='stylesheet' type='text/css'>

   <script src="http://code.jquery.com/jquery-2.1.0.js"></script>
   <script src=<?php echo $javascript ?>></script>
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