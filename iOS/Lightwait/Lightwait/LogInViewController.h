//
//  LogInViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 4/4/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "DataManager.h"

@interface LogInViewController : UIViewController
{
    bool successfulLogIn;
}

@property (weak, nonatomic) IBOutlet UITextField *usernameTextField;
@property (weak, nonatomic) IBOutlet UITextField *passwordTextField;

- (IBAction)pushLogInButton:(id)sender;

@end
