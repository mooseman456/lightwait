<?php
	$navElements=array("availability"=>"availability.php","account"=>"#","logout"=>"index.php");
	$pageTitle = "Queue";
	include 'include/header.php';
?>
	
	<div class="window"></div>

	<div class="sidebar">
		<h1>Sidebar</h1>
		<div id="quantityList">
			Hamburger=<span id="hNum">0</span><br/>
			Double Hamburger=<span id="dhNum">0</span><br/>
			Chicken=<span id="cNum">0</span><br/>
			Turkey=<span id="tNum">0</span><br/>
			Black Bean=<span id="bNum">0</span><br/>
		</div>
		<button id="recall">Recall</button>
		<div class="navigation">
			<img src="images/prev_arrow.png" alt="Previous Arrow" />
			<div id="page_number">1/3</div>
			<img src="images/next_arrow.png" alt="Next Arrow" />
		</div>
	</div>
</body>

</html>