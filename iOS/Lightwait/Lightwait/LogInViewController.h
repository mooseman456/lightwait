//
//  LogInViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 4/4/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DataManager.h"

@interface LogInViewController : UIViewController <UITextFieldDelegate>
{
    bool successfulLogIn;
}

// View properties
@property (weak, nonatomic) IBOutlet UILabel *lightwaitTextLabel;
@property (weak, nonatomic) IBOutlet UITextField *usernameTextField;
@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;
@property (weak, nonatomic) IBOutlet UIButton *logInButton;

// Actions
- (IBAction)pushLogInButton:(id)sender;

// Customizes the appearance of the view
- (void)customizeAppearance;

// UITextFieldDelegate
- (BOOL)textFieldShouldReturn:(UITextField *)textField;

// Database methods
- (void)attemptLogIn;

// Alerts
- (void)showAlert:(NSString *)title message:(NSString *)messageString;
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex;

@end
