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
    
    [self customizeAppearance];
    
    deviceTokenString = @"";
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)customizeAppearance
{
    
    [self.view setBackgroundColor:[UIColor colorWithRed:234.0/255.0f green:238.0/255.0f blue:250.0/255.0f alpha:1.0f]];
    [self.lightwaitTextLabel setFont:[UIFont fontWithName: @"Ubuntu-Bold" size:42]];
    [self.lightwaitTextLabel setTextColor:[UIColor colorWithRed:157.0/255.0f green:157.0/255.0f blue:157.0/255.0f alpha:1.0f]];
    [self.firstNameTextField setFont:[UIFont fontWithName:@"Lato-Light" size:16]];
    [self.lastNameTextField setFont:[UIFont fontWithName:@"Lato-Light" size:16]];
    [self.emailTextField setFont:[UIFont fontWithName:@"Lato-Light" size:16]];
    [self.passwordTextField setFont:[UIFont fontWithName:@"Lato-Light" size:16]];
    [self.confirmPasswordTextField setFont:[UIFont fontWithName:@"Lato-Light" size:16]];
    [self.createAccountButton.titleLabel setFont:[UIFont fontWithName:@"Lato-Bold" size:16]];

    self.firstNameTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    self.lastNameTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    self.emailTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    self.passwordTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    self.confirmPasswordTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    self.firstNameTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    
    self.firstNameTextField.layer.borderWidth = 1;
    self.lastNameTextField.layer.borderWidth = 1;
    self.emailTextField.layer.borderWidth = 1;
    self.passwordTextField.layer.borderWidth = 1;
    self.confirmPasswordTextField.layer.borderWidth = 1;
    
    self.firstNameTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    self.lastNameTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    self.emailTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    self.passwordTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    self.confirmPasswordTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    
    UIView *spacerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.firstNameTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.firstNameTextField setLeftView:spacerView];
    
    UIView *spacerView1 = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.lastNameTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.lastNameTextField setLeftView:spacerView1];

    UIView *spacerView2 = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.emailTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.emailTextField setLeftView:spacerView2];

    UIView *spacerView3 = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.passwordTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.passwordTextField setLeftView:spacerView3];

    UIView *spacerView4 = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.confirmPasswordTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.confirmPasswordTextField setLeftView:spacerView4];
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    if (textField == self.firstNameTextField) {
        [self.lastNameTextField becomeFirstResponder];
    }
    else if (textField == self.lastNameTextField) {
        [self.emailTextField becomeFirstResponder];
    }
    else if (textField == self.emailTextField) {
        [self.passwordTextField becomeFirstResponder];
    }
    else if (textField == self.passwordTextField) {
        [self.confirmPasswordTextField becomeFirstResponder];
    }
    else if (textField == self.confirmPasswordTextField) {
        [self attemptAccountCreation];
    }
    return YES;
}

- (IBAction)pushCreateAccount:(id)sender
{
    [self attemptAccountCreation];
}

- (void)attemptAccountCreation
{
    NSString *firstNameString = [self.firstNameTextField text];
    NSString *lastNameString = [self.lastNameTextField text];
    NSString *emailString = [self.emailTextField text];
    NSString *passwordString = [self.passwordTextField text];
    NSString *confirmPasswordString = [self.confirmPasswordTextField text];
    
    if ([self checkIfCompleteInformation:firstNameString lastName:lastNameString email:emailString password:passwordString]) {
        if ([self checkIfPasswordsMatch:passwordString password2:confirmPasswordString] && [self checkIfPasswordLengthCorrect:passwordString]) {
            successfulAccountCreation = true;
            [self showAlert:@"Account Created" message:@"You are now logged in"];
            
            [self createAccount:firstNameString lastName:lastNameString email:emailString password:passwordString];
        }
        else {
            successfulAccountCreation = false;
        }
    }
}

- (void)createAccount:(NSString *)firstNameString lastName:(NSString *)lastNameString email:(NSString *)emailString password:(NSString*)passwordString
{
    NSMutableDictionary *accountInformation = [[NSMutableDictionary alloc] init];
    
    [accountInformation setObject:firstNameString forKey:@"fName"];
    [accountInformation setObject:lastNameString forKey:@"lName"];
    [accountInformation setObject:emailString forKey:@"email"];
    [accountInformation setObject:passwordString forKey:@"password"];
    
    NSDictionary* accountIDDictionary = [DataManager createAccount:accountInformation];
    [[NSUserDefaults standardUserDefaults] setObject:[accountIDDictionary objectForKey:@"userID"] forKey:@"userID"];
    [PushHandler registerForNotifications];
}

- (BOOL)checkIfCompleteInformation:(NSString *)firstNameString lastName:(NSString *)lastNameString email:(NSString *)emailString password:(NSString*)passwordString
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
    else if ([passwordString isEqualToString:@""]) {
        [self showAlert:@"Incomplete" message:@"Please enter a password"];
        return false;
    }
    else if ([self checkIfNameContainsCorrectCharacters:firstNameString] && [self checkIfNameContainsCorrectCharacters:lastNameString] && [self checkIfEmailAddress:emailString]) {
        return true;
    }
    else {
        return false;
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

- (BOOL)checkIfPasswordLengthCorrect:(NSString *)password
{
    if (password.length > 8 && password.length < 20) {
        return true;
    }
    else {
        [self showAlert:@"Password" message:@"Password must be between 8 and 20 characters in length"];
        return false;
    }
}

- (BOOL)checkIfNameContainsCorrectCharacters:(NSString *)nameString
{
    NSCharacterSet * set = [[NSCharacterSet characterSetWithCharactersInString:@"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLKMNOPQRSTUVWXYZ.-, "] invertedSet];
    
    if ([nameString rangeOfCharacterFromSet:set].location != NSNotFound) {
        [self showAlert:@"Name" message:@"Names may only contain letters A-Z, \".\", \"-\""];
        return false;
    }
    
    return true;
}

- (BOOL)checkIfEmailAddress:(NSString *)emailString
{
    if ([emailString rangeOfString:@"@"].location == NSNotFound) {
        [self showAlert:@"Email" message:@"Invalid email address given"];
        return false;
    } else {
        return true;
    }
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:messageString delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alertView show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 0 && successfulAccountCreation) {
        // Successful account creation
        [self.navigationController popToRootViewControllerAnimated:TRUE];
    }
}

@end
