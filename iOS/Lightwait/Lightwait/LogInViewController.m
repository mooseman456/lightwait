//
//  LogInViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 4/4/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "LogInViewController.h"

@interface LogInViewController ()

@end

@implementation LogInViewController

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
    [self.usernameTextField setFont:[UIFont fontWithName: @"Lato-Light" size:16]];
    [self.passwordTextField setFont:[UIFont fontWithName: @"Lato-Light" size:16]];
    [self.logInButton.titleLabel setFont:[UIFont fontWithName: @"Lato-Bold" size:16]];
    
    
    self.usernameTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    self.passwordTextField.layer.borderColor = [[UIColor colorWithRed:201.0/255.0f green:201.0/255.0f blue:203.0/255.0f alpha:1.0f] CGColor];
    
    self.usernameTextField.layer.borderWidth = 1;
    self.passwordTextField.layer.borderWidth = 1;
    
    self.usernameTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    self.passwordTextField.layer.backgroundColor = [[UIColor whiteColor] CGColor];
    
    UIView *spacerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.usernameTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.usernameTextField setLeftView:spacerView];
    
    UIView *spacerView1 = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 10, 10)];
    [self.passwordTextField setLeftViewMode:UITextFieldViewModeAlways];
    [self.passwordTextField setLeftView:spacerView1];
}

- (BOOL)textFieldShouldReturn:(UITextField *)textField {
    if (textField == self.usernameTextField) {
        [self.passwordTextField becomeFirstResponder];
    }
    else if (textField == self.passwordTextField) {
        [self.passwordTextField resignFirstResponder];
        [self attemptLogIn];
    }
    return YES;
}

- (IBAction)pushLogInButton:(id)sender
{
    [self attemptLogIn];
}

- (void)attemptLogIn
{
    NSDictionary* accountInformation = [DataManager logIn:self.usernameTextField.text password:self.passwordTextField.text];
    
    if (accountInformation) {
        [[NSUserDefaults standardUserDefaults] setObject:[accountInformation objectForKey:@"userID"] forKey:@"userID"];
        [self showAlert:[@"Hello " stringByAppendingString:[accountInformation objectForKey:@"fName"]] message:@"You have logged in"];
        successfulLogIn = TRUE;
    }
    else {
        successfulLogIn = FALSE;
        [self showAlert:@"Log In Failed" message:@"Email and password did not match"];
    }
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:messageString delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alertView show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 0 && successfulLogIn) {
        // Successful sign in
        [self.navigationController popToRootViewControllerAnimated:TRUE];
    }
}

@end
