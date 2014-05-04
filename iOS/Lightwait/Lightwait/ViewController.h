//
//  ViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <CoreLocation/CoreLocation.h>

#import "REST_API.h"
#import "Strings.h"

@interface ViewController : UIViewController <CLLocationManagerDelegate>
{
    bool isOnCampus;
    bool hasConnection;
}

@property (strong, nonatomic) CLLocationManager *locationManager;
@property (weak, nonatomic) IBOutlet UIButton *savedOrdersButton;
@property (weak, nonatomic) IBOutlet UILabel *lightwaitTextLabel;
@property (weak, nonatomic) IBOutlet UIButton *customOrderButton;
@property (weak, nonatomic) IBOutlet UIButton *logInButton;
@property (weak, nonatomic) IBOutlet UIButton *createAccountButton;
@property (weak, nonatomic) IBOutlet UIButton *signOutButton;
@property (weak, nonatomic) IBOutlet UITextView *textField;
@property (weak, nonatomic) IBOutlet UIView *bottomView;
@property (weak, nonatomic) IBOutlet UIImageView *bottomBorderImage;
@property (weak, nonatomic) IBOutlet UIImageView *middleBorderImage;

- (IBAction)pushCustomOrder:(id)sender;
- (IBAction)pushSignOut:(id)sender;

@end
