//
//  ViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "ViewController.h"
#import "DataManager.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    // Defaults to yes - FOR TESTING PURPOSES ONLY
    isOnCampus = YES;
    //[self initializeLocationManager];
    [DataManager logIn:@"" password:@""];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (bool)testMenuConnection
{
    // Attempt to connect to the website
    bool isConnected = [REST_API testConnection:@"http://lightwait.alecsiems.com"];
    if (isConnected)
        return true;
    else
        return false;
}

// Location testing is commented out for testing
- (IBAction)pushCustomOrder:(id)sender
{
    // First check to see if the menu can be loaded, then check if the user is on campus
    if ([self testMenuConnection]) {
        //if (isOnCampus == true) {
            [self performSegueWithIdentifier:@"customOrderSegue" sender:self];
        //}
        //else {
        //    [self showAlert:@"Alert" message:@"You must be on campus to order from Mac's Place"];
        //}
    }
    else {
        [self showAlert:@"Connection Failure" message:@"Failed to load the menu"];
    }
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title
                                                        message:messageString
                                                       delegate:self
                                              cancelButtonTitle:@"Dismiss"
                                              otherButtonTitles:nil, nil];
    [alertView show];
}

@end
