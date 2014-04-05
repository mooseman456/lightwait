//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

const rootURL = "api/index.php"

$(document).ready(function() {
  createAccount('Alec', 'Siems', 'asiems@smu.edu', 'faggot123', '1234567890');
});

function createAccount(fName, lName, email, password, phoneNumber) {
  $.ajax({
     type: 'PUT',
     url: rootURL + '/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
     dataType: "json", // data type of response
     success: function(data, textStatus, jqXHR){
        console.log("Order recalled");
        console.log(data, textStatus, jqXHR);
     }
  });
}
