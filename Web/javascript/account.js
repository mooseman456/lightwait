//  Account Javascript
//	Lightwait Project
//	Created 4/4/14

//  Contains JS for index.php logging in and creating account
//  as well as editting account on account.php

const rootURL = "api/index.php"

$(document).ready(function() {
    if($('title').html().toLowerCase()=='account')
        getAccountInfo();


    /*   LoginForm   */
    // Declards regex patters for different portions of the account creation/login
    var passPat = /.{8,20}/;
    var namePat = /^[a-zA-Z ,.'-]+$/i;
    $('#loginForm input[type~="submit"]').click(function(e) {
        var email = $('#loginForm input[name="email"]').val();
        var password = $('#loginForm input[name="password"]').val();
        
        console.log(email+ " "+password);
        if (email == "" || email == null)
            console.log("Empty email. Please input your email");
        
        else if (passPat.test(password)) {
            e.preventDefault();
            logIn(email, password);
        }
        //else
        //    alert("Invalid password! Must be 8 - 20 characters long!");
    });


    $('#createAccountForm input[type="submit"]').click(function(e) {
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

        if (createValid === true) {
            e.preventDefault();
            createAccount(fName, lName, email, password);
        }

        //else
        //    createAccount(fName, lName, email, password);
    });

    $('#editEmailForm input[type="submit"]').click(function(e) {
        var errorString = "";
        var createValid = true;
       
        var currentEmail = $('#editEmailForm input[name="currentEmail"]').val();
        var newEmail = $('#editEmailForm input[name="newEmail"]').val();
        var confirmEmail = $('#editEmailForm input[name="confirmEmail"]').val();

        if (currentEmail === "" || newEmail === "" || confirmEmail === "") {
            createValid = false;
        }
        else if (confirmEmail !== newEmail) {
            createValid = false;
            alert("Emails do not match!");
        }
        if (createValid === true) {
            e.preventDefault();
            updateEmail(currentEmail, newEmail);
        }

    });

    $('#editPasswordForm input[type="submit"]').click(function(e) {
        var errorString = "";
        var createValid = true;
       
        var currentPassword = $('#editPasswordForm input[name="currentPassword"]').val();
        var newPassword = $('#editPasswordForm input[name="newPassword"]').val();
        var confirmPassword = $('#editPasswordForm input[name="confirmPassword"]').val();


        if (currentPassword === "" || currentPassword == null || newPassword === "" || confirmPassword === "") {
            createValid = false;
        }
        else if (confirmPassword !== newPassword) {
            createValid = false;
            alert("Passwords do not match!");
        }
        if (createValid === true) {
            e.preventDefault();
            updatePassword(currentPassword, newPassword);
        }



    });

});

/************/
/*   AJAX   */
/************/
function createAccount(fName, lName, email, password) {
  $.ajax({
     type: 'POST',
     url: rootURL + '/account/1/' + fName + '/' + lName + '/' + email + '/' + password,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account created");
        document.location.href="index.php"
     },
     error: function(jqXHR, errorThrown){
        console.log("Account creation failed");
        console.log(jqXHR, errorThrown);
        alert('Account creation failed, sorry.');
     }
  });
}


function updateEmail(currentEmail, newEmail) {
  $.ajax({
     type: 'PUT',
     url: rootURL + '/updateemail/' + currentEmail + '/' + newEmail,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account updated");
        alert("Email successfully updated!");
        document.location.href="account.php";
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Account update failed");
        console.log(jqXHR, textStatus, errorThrown);
        alert(jqXHR.responseText);
     }
  });
}

function updatePassword(currentPassword, newPassword) {
  $.ajax({
     type: 'PUT',
     url: rootURL + '/updatepassword/' + currentPassword + '/' + newPassword,
     dataType: "json", // data type of response
     success: function(){
        console.log("Account updated");
        alert("Password successfully updated!");
        document.location.href="account.php";
     },
     error: function(jqXHR, textStatus, errorThrown){
        console.log("Account update failed");
        console.log(jqXHR, textStatus, errorThrown);
        alert(jqXHR.responseText);
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
            document.location.href="index.php";
        },
        error: function(jqXHR, errorThrown){
            alert("Login failed. Make sure your password and email are correct.");
            console.log("Login failed");
            console.log(jqXHR, errorThrown);
        }
    });
}

function getAccountInfo() {
    $.ajax({
        type: 'GET',
        url: rootURL + '/accountinfo',
        dataType: "json", // data type of response
        success: function(data){
            console.log('Login success');
            console.log(JSON.stringify(data));
            fillWithUserData($("editAccountForm"), data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Login failed. Make sure your password and email are correct.");
            console.log("Login failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

/****************/
/*   Inflater   */
/****************/

function fillWithUserData(form, data) {

    //form.children('input[name="fName"]').value = fName;
    $('#editAccountForm input[name="fName"]').val(data["fName"]);
    $('#editAccountForm input[name="lName"]').val(data["lName"]);
    $('#editAccountForm input[name="email"]').val(data["email"]);
    $('#editAccountForm input[name="password"]').val(data["password"]);
}
