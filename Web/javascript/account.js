//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

const rootURL = "api/index.php"

$(document).ready(function() {

  $('#loginForm input[type="submit"]').click(function(e) {
    e.preventDefault();
    var email = $('#loginForm input')[0].value;
    var password = $('#loginForm input')[1].value;
    logIn(email, password);
  });
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

function logIn(email, password) {
  $.ajax({
     type: 'GET',
     url: rootURL + '/' + 'account' + '/' + email + '/' + password,
     dataType: "json", // data type of response
     success: function(data){
        console.log(data);
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Account creation failed");
        console.log(jqXHR, textStatus, errorThrown);
     }
  });
}
