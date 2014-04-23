//
//  ViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "REST_API.h"
#import "Strings.h"

@interface ViewController : UIViewController
{
    bool isOnCampus;
}
@property (weak, nonatomic) IBOutlet UIButton *logInButton;
@property (weak, nonatomic) IBOutlet UIButton *createAccountButton;
@property (weak, nonatomic) IBOutlet UIButton *signOutButton;

- (IBAction)pushCustomOrder:(id)sender;
- (IBAction)pushSignOut:(id)sender;

@end
