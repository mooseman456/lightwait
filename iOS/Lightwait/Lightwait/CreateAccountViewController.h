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

@interface CreateAccountViewController : UIViewController
{
    NSString *deviceTokenString;
}

@property (weak, nonatomic) IBOutlet UITextField *firstNameTextField;
@property (weak, nonatomic) IBOutlet UITextField *lastNameTextField;
@property (weak, nonatomic) IBOutlet UITextField *emailTextField;
@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;
@property (weak, nonatomic) IBOutlet UITextField *confirmPasswordTextField;
@property (weak, nonatomic) IBOutlet UITextField *phoneNumberTextField;

- (IBAction)pushCreateAccount:(id)sender;
@end
