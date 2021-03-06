//var rootURL = "http://lightwait.alecsiems.com/Web/api/index.php";
var rootURL = "api/index.php";

$(document).ready(function(){
    //Logout click listener
    $('a:contains("logout")').click( function(e) {
    	e.preventDefault();
    	$.ajax({
    		type: 'POST',
    		url: rootURL + '/logout',
		    dataType: "text", // data type of response
		    success: function(){
		    	console.log("Logged out");
		     	document.location.href="index.php";
		    },
		    error: function(jqXHR, textStatus, errorThrown){
		     	console.log("Logout failed");
		     	console.log(jqXHR, textStatus, errorThrown);
		    }
 		});
    });
});
