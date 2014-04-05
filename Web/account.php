<?php
   $pageTitle="Account";
   $navElements = Array("home"=>"index.php","queue" => "queue.php");
   include('include/header.php');
?>

	<script src='js/accountjs'></script>

   <h1>Edit your account info here</h1>
   <?php include('include/accountForm.php'); ?>

</body>
</html>