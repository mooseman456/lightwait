//  Users Javascript
//  Lightwait Project
//  Created 4/12/14

//  Contains JS for users.php to create admin and chef accounts

const rootURL = "api/index.php"
$(document).ready(function() {
    $('#createChefAccountForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var form = $('#createChefAccountForm');
        createAccountJS(form, 2);
    });

    $('#createAdminAccountForm input[type="submit"]').click(function(e) {
        e.preventDefault();
        var form = $('#createAdminAccountForm');
        createAccountJS(form, 3);
    });
});

function createAccountJS(form, type) {
    var fName = form.children('input[name="fName"]:first').val();
    var lName = form.children('input[name="lName"]:first').val();
    var email = form.children('input[name="email"]:first').val();
    var password = form.children('input[name="password"]:first').val();
    var phone = form.children('input[name="phone"]:first').val();
    adminCreateAccountAJAX(type,fName,lName,email,password,phone);
}


function adminCreateAccountAJAX(type, fName, lName, email, password, phoneNumber) {
    $.ajax({
        type: 'POST',
        url: rootURL + '/account/' + type + '/' + fName + '/' + lName + '/' + email + '/' + password + '/' + phoneNumber,
        dataType: "json", // data type of response
        success: function(){
            console.log("Account created");
            document.location.href="users.php";
        },
            error: function(jqXHR, textStatus, errorThrown){
            console.log("Account creation failed");
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}