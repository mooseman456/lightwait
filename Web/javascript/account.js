//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

//  Contains JS for index.php logging in and creating account
//  as well as editting account on account.php

const rootURL = "api/index.php"

$(document).ready(function() {


    /*   LoginForm   */
    // Declards regex patters for different portions of the account creation/login
    var passPat = /.{8,20}/;
    var namePat = /^[a-z ,.'-]+$/i;
    $('#loginForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var email = $('#loginForm input[name="email"]').val();
        var password = $('#loginForm input[name="password"]').val();

        if (passPat.test(password))
            logIn(email, password);

        else
            alert("Invalid password! Must be 8 - 20 characters long!");
    });

    $('#createAccountForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var createValid = true;
        var errorString = "";

        
        var email = $('#createAccountForm input[name="email"]').val();
        if (email === "") {
            errorString += "Email empty!\n";
            createValid = false;
        }
        
        var password = $('#createAccountForm input[name="password"]').val();
        if (!passPat.test(password)) {
            errorString += "Invalid password! Must be 8 - 20 characters long!\n";
            createValid = false;
        }
        
        var fName = $('#createAccountForm input[name="fName"]').val();
        if (!namePat.test(fName)) {
            errorString += "Invalid first name! Only letters, apostrophes, commas, and periods allowed!\n";
            createValid = false;
        }
       
        var lName = $('#createAccountForm input[name="lName"]').val();
        if (!namePat.test(lName)) {
            errorString += "Invalid last name! Only letters, apostrophes, commas, and periods allowed!\n";
            createValid = false;
        }
        
        var phone = $('#createAccountForm input[name="phone"]').val();
        if (phone === "") {
            errorString += "Phone number empty!\n";
            createValid = false;
        }

        if (createValid === false)
            alert(errorString);

        else
            createAccount(fName, lName, email, password, phone);
    });

    $('#editAccountForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var errorString = "";
        var createValid = true;
       
        var fName = $('#editAccountForm input[name="fName"]').val();
        if (!namePat.test(fName)) {
            errorString += "Invalid first name! Only letters, apostrophes, commas, and periods allowed!\n";
            createValid = false;
        }
        
        var lName = $('#editAccountForm input[name="lName"]').val();
        if (!namePat.test(lName)) {
            errorString += "Invalid last name! Only letters, apostrophes, commas, and periods allowed!\n";
            createValid = false;
        }
        
        var email = $('#editAccountForm input[name="email"]').val();
        if (email === "") {
            errorString += "Email empty!\n";
            createValid = false;
        }
        
        var password = $('#editAccountForm input[name="password"]').val();
        if (!passPat.test(password)) {
            errorString += "Invalid password! Must be 8 - 20 characters long!\n";
            createValid = false;
        }
        
        var phone = $('#editAccountForm input[name="phone"]').val();
        if (phone === "") {
            errorString += "Phone number empty!\n";
            createValid = false;
        }

        if (createValid === true)
            updateAccount(password, fName, lName, email, phone);
        else
            alert(errorString);
    });
});

function createAccount(fName, lName, email, password, phoneNumber) {
  $.ajax({
     type: 'POST',
     url: rootURL + '/account/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
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

function updateAccount(password, fName, lName, email, phoneNumber) {
  $.ajax({
     type: 'PUT',
     url: rootURL + '/updateaccount/' + password + '/' + fName + '/' + lName + '/' + email + '/' + phoneNumber,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account updated");
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Account update failed");
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
            console.log('Login success');
            document.location.href="order.php"
        },
        error: function(jqXHR, textStatus, errorThrown){
            console.log("Login failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}
