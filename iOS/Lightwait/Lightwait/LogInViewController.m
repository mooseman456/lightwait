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
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#warning Add error checking

- (IBAction)pushLogInButton:(id)sender
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
