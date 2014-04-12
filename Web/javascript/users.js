//  Users Javascript
//  Lightwait Project
//  Created 4/12/14

//  Contains JS for users.php to create admin and chef accounts

const rootURL = "api/index.php"
$(document).ready(function() {
    
});


function adminCreateAccount(type, fName, lName, email, password, phoneNumber) {
    $.ajax({
        type: 'POST',
        url: rootURL + '/account/' + type + '/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
        dataType: "json", // data type of response
        success: function(){
            console.log("Account created");
            document.location.href="order.php";
        },
            error: function(jqXHR, textStatus, errorThrown){
            console.log("Account creation failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}