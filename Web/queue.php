<?php
	$navElements=array("account"=>"account.php","logout"=>"index.php");
	$pageTitle = "Queue";
	include 'include/header.php';
?>
	
	<div class="window"></div>

	<div class="sidebar">
		<div id="quantityList">

		</div>
		<button id="recall">Recall</button>
		<div class="navigation">
			<img src="images/prev_arrow.png" alt="Previous Arrow" />
			<div id="page_number">1/1</div>
			<img src="images/next_arrow.png" alt="Next Arrow" />
		</div>
	</div>
</body>

</html>