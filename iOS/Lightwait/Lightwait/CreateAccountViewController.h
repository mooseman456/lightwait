//
//  CreateAccountViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 4/16/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DataManager.h"
#import "PushHandler.h"

@interface CreateAccountViewController : UIViewController <UITextFieldDelegate>
{
    NSString *deviceTokenString;
    bool successfulAccountCreation;
}

// View properties
@property (weak, nonatomic) IBOutlet UILabel *lightwaitTextLabel;
@property (weak, nonatomic) IBOutlet UITextField *firstNameTextField;
@property (weak, nonatomic) IBOutlet UITextField *lastNameTextField;
@property (weak, nonatomic) IBOutlet UITextField *emailTextField;
@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;
@property (weak, nonatomic) IBOutlet UITextField *confirmPasswordTextField;
@property (weak, nonatomic) IBOutlet UIButton *createAccountButton;

// Actions
- (IBAction)pushCreateAccount:(id)sender;

// Customizes the appearance of the view
- (void)customizeAppearance;

// UITextFieldDelegate
- (BOOL)textFieldShouldReturn:(UITextField *)textField;

// Account creation methods
- (void)attemptAccountCreation;
- (void)createAccount:(NSString *)firstNameString lastName:(NSString *)lastNameString email:(NSString *)emailString password:(NSString*)passwordString;
- (BOOL)checkIfCompleteInformation:(NSString *)firstNameString lastName:(NSString *)lastNameString email:(NSString *)emailString password:(NSString*)passwordString;
- (BOOL)checkIfPasswordsMatch:(NSString *)password1 password2:(NSString*)password2;
- (BOOL)checkIfPasswordLengthCorrect:(NSString *)password;
- (BOOL)checkIfNameContainsCorrectCharacters:(NSString *)nameString;
- (BOOL)checkIfEmailAddress:(NSString *)emailString;

// Alerts
- (void)showAlert:(NSString *)title message:(NSString *)messageString;
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex;

@end
