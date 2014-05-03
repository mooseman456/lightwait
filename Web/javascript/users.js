//  Users Javascript
//  Lightwait Project
//  Created 4/12/14

//  Contains JS for users.php to create admin and chef accounts

const rootURL = "api/index.php"
$(document).ready(function() {
    var passPat = /.{8,20}/;
    var namePat = /^[a-zA-Z ,.'-]+$/i;
   
    $('#adminCreateAccountForm input[type="submit"]').click(function(e) {
        var createValid = true;
        var errorString = "";

        var email = $('input[name="email"]').val();
        if (email === "") {
            createValid = false;
        }
        var password = $('input[name="password"]').val();
        if (!passPat.test(password)) {
            createValid = false;
        }
        var fName = $('input[name="fName"]').val();
        if (!namePat.test(fName)) {
            createValid = false;
        }
        var lName = $('input[name="lName"]').val();
        if (!namePat.test(lName)) {
            createValid = false;
        }
        
        var type = $('input[name="accountType"]:checked').val();
        console.log(type);
        if (type === "chef")
            val = 2;
        else if (type === "admin")
            val = 3;
        else
            createValid = false;

        if (createValid === true) {
            e.preventDefault();
            adminCreateAccount(fName, lName, email, password, val);
        }
    });
});


function adminCreateAccount(fName, lName, email, password, type) {
    $.ajax({
     type: 'POST',
     url: rootURL + '/account/' + type + '/' + fName + '/' + lName + '/' + email + '/' + password,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account created");
        alert("Account succesfully created!");
        document.location.href="users.php";
     },
     error: function(jqXHR, errorThrown){
        console.log("Account creation failed");
        console.log(jqXHR, errorThrown);
     }
  });
}