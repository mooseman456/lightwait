//
//  CreateAccountViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 4/16/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "CreateAccountViewController.h"

@interface CreateAccountViewController ()

@end

@implementation CreateAccountViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)pushCreateAccount:(id)sender
{
    NSString *firstNameString = [self.firstNameTextField text];
    NSString *lastNameString = [self.lastNameTextField text];
    NSString *emailString = [self.emailTextField text];
    NSString *phoneNumberString = [self.phoneNumberTextField text];
    NSString *passwordString = [self.passwordTextField text];
    NSString *confirmPasswordString = [self.confirmPasswordTextField text];

    if ([self checkIfCompleteInformation:firstNameString lastName:lastNameString email:emailString phoneNumber:phoneNumberString password:passwordString]) {
        if ([self checkIfPasswordsMatch:passwordString password2:confirmPasswordString]) {
            [self showAlert:@"Account Created" message:@""];
            
            [self createAccount:firstNameString lastName:lastNameString email:emailString phoneNumber:phoneNumberString password:passwordString];
        }
    }
}

- (void)createAccount:(NSString *)firstNameString lastName:(NSString *)lastNameString email:(NSString *)emailString phoneNumber:(NSString *)phoneNumberString password:(NSString*)passwordString
{
    NSMutableDictionary *accountInformation = [[NSMutableDictionary alloc] init];
    
    [accountInformation setObject:firstNameString forKey:@"fName"];
    [accountInformation setObject:lastNameString forKey:@"lName"];
    [accountInformation setObject:emailString forKey:@"email"];
    [accountInformation setObject:phoneNumberString forKey:@"phoneNumber"];
    [accountInformation setObject:passwordString forKey:@"password"];
    
    [DataManager createAccount:accountInformation];
}

- (BOOL)checkIfCompleteInformation:(NSString *)firstNameString lastName:(NSString *)lastNameString email:(NSString *)emailString phoneNumber:(NSString *)phoneNumberString password:(NSString*)passwordString
{
    if ([firstNameString isEqualToString:@""]) {
        [self showAlert:@"Incomplete" message:@"Please enter your first name"];
        return false;
    }
    else if ([lastNameString isEqualToString:@""]) {
        [self showAlert:@"Incomplete" message:@"Please enter your last name"];
        return false;
    }
    else if ([emailString isEqualToString:@""]) {
        [self showAlert:@"Incomplete" message:@"Please enter your email address"];
        return false;
    }
    else if ([phoneNumberString isEqualToString:@""]) {
        [self showAlert:@"Incomplete" message:@"Please enter your phone number"];
        return false;
    }
    else if ([passwordString isEqualToString:@""]) {
        [self showAlert:@"Incomplete" message:@"Please enter a password"];
        return false;
    }
    else {
        return true;
    }
}

- (BOOL)checkIfPasswordsMatch:(NSString *)password1 password2:(NSString*)password2
{
    if (![password1 isEqualToString:password2])
    {
        [self showAlert:@"Incomplete" message:@"Passwords do not match"];
        return false;
    }
    
    return true;
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:messageString delegate:self cancelButtonTitle:@"Dismiss" otherButtonTitles:nil, nil];
    [alertView show];
}

@end
