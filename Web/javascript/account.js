//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

const rootURL = "api/index.php"

$(document).ready(function() {
  createAccount('Alec', 'Siems', 'asiems@smu.edu', 'testpassword123', '1234567890');
});

function createAccount(fName, lName, email, password, phoneNumber) {
  $.ajax({
     type: 'POST',
     url: rootURL + '/' + 'account' + '/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account created");
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Account creation failed");
        console.log(jqXHR, textStatus, errorThrown);
     }
  });
}
