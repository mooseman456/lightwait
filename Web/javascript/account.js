//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

//  Contains JS for index.php logging in and creating account
//  as well as editting account on account.php

const rootURL = "api/index.php"

$(document).ready(function() {

    $('#loginForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var email = $('#loginForm input[name="email"]').val();
        var password = $('#loginForm input[name="password"]').val();

        var passPat = /.{8,20}/;
        password +="";
        if (passPat.test(password)) {
            console.log("It works!");
            logIn(email, password);
        }
        else
            console.log("It fails!");
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

    $('#editAccountForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var fName = $('#editAccountForm input[name="fName"]').val();
        var lName = $('#editAccountForm input[name="lName"]').val();
        var email = $('#editAccountForm input[name="email"]').val();
        var password = $('#editAccountForm input[name="password"]').val();
        var phone = $('#editAccountForm input[name="phone"]').val();
        console.log(fName+" "+lName+" "+email+" "+password+" "+phone);
        editAccount(fName, lName, email, password, phone);
    });
});

function createAccount(fName, lName, email, password, phoneNumber) {
  $.ajax({
     type: 'POST',
     url: rootURL + '/' + 'account' + '/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account created");
        document.location.href="order.php"
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
            document.location.href="order.php"
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Account creation failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function editAccount(fName, lName, email, password, phoneNumber) {
    $.ajax({
        type: 'PUT',
        url: rootURL + '/createAccount/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
        dataType: "json",
        success: function(){
            console.log("Account created");
            //document.location.href="order.php"
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Account creation failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}




