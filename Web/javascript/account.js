//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

const rootURL = "api/index.php"

$(document).ready(function() {

  //createAccount('Alec', 'Siems', 'asiems@smu.edu', 'l', '1234567890');

  $('#loginForm input[type="submit"]').click(function(e) {
    e.preventDefault();
    var email = $('#loginForm input[name="email"]').val();
    var password = $('#loginForm input[name="password"]').val();
    logIn(email, password);
  });

  $('#createAccountForm input[type="submit"]').click(function(e) {
    e.preventDefault();
    var fName = $('#createAccountForm input[name="fName"]').val();
    var lName = $('#createAccountForm input[name="lName"]').val();
    var email = $('#createAccountForm input[name="email"]').val();
    var password = $('#createAccountForm input[name="password"]').val();
    var phone = $('#createAccountForm input[name="phone"]').val();
    console.log(fName+" "+lName+" "+email+" "+password+" "+phone);
    createAccount(fName, lName, email, password, phone);
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
     url: rootURL + '/account/' + email + '/' + password,
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
