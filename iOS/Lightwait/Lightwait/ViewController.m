//
//  ViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    [self customizeAppearance];
    
    // Defaults to yes - FOR TESTING PURPOSES ONLY
    isOnCampus = YES;
    hasConnection = false;
    [self testMenuConnection];
    [self initializeLocationManager];
}

- (void)viewWillAppear:(BOOL)animated
{
    [self checkUserSignIn];
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
    [self.customOrderButton.titleLabel setFont:[UIFont fontWithName: @"Lato-Bold" size:16]];
    [self.savedOrdersButton.titleLabel setFont:[UIFont fontWithName: @"Lato-Bold" size:16]];
    [self.logInButton.titleLabel setFont:[UIFont fontWithName: @"Lato-Bold" size:16]];
    [self.signOutButton.titleLabel setFont:[UIFont fontWithName: @"Lato-Bold" size:16]];
    [self.createAccountButton.titleLabel setFont:[UIFont fontWithName: @"Lato-Bold" size:16]];
    [self.textField setFont:[UIFont fontWithName: @"Lato-Light" size:16]];
}

- (void)testMenuConnection
{
    // Attempt to connect to the website
    hasConnection = [REST_API testConnection:kConnetionTestLink];
}

// Location testing is commented out for testing
- (IBAction)pushCustomOrder:(id)sender
{
    // Check to see if the menu can be loaded,
    if (hasConnection) {
        // If the user is on campus
        if (isOnCampus == true) {
            // If the user is signed in
            if ([[NSUserDefaults standardUserDefaults] stringForKey:@"userID"]) {
                [self performSegueWithIdentifier:@"customOrderSegue" sender:self];
            } else {
                [self showAlert:@"Account" message:@"Please sign in or create an account"];
            }
        } else {
            // Alert the user that they must be on campus
            [self showAlert:@"Alert" message:@"You must be on campus to order from Mac's Place"];
        }
    } else {
        // Alert the user that
        [self showAlert:@"Connection Failure" message:@"Failed to load the menu"];
    }
}

- (IBAction)pushSignOut:(id)sender
{
    [self showAlert:@"Account" message:@"You have logged out"];
    [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"userID"];
    [self checkUserSignIn];
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

- (void)checkUserSignIn
{
    // If the user is signed in
    if ([[NSUserDefaults standardUserDefaults] stringForKey:@"userID"]) {
        self.logInButton.hidden = TRUE;
        self.createAccountButton.hidden = TRUE;
        self.signOutButton.hidden = FALSE;
    }
    else {
        self.logInButton.hidden = FALSE;
        self.createAccountButton.hidden = FALSE;
        self.signOutButton.hidden = TRUE;
    }
}

- (void)initializeLocationManager
{
    _locationManager = [[CLLocationManager alloc] init];
    _locationManager.delegate = self;
    NSLog(@"Initializing");
    [_locationManager startUpdatingLocation];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
    NSLog(@"Starting");
    CLLocation *currentLocation = [locations lastObject];
    
    // Break down the user's location into latitude and longitude
    CLLocationDegrees latitude = currentLocation.coordinate.latitude;
    CLLocationDegrees longitude = currentLocation.coordinate.longitude;
    
    // Convert latitude and longitude into floats
    float lat = latitude;
    float longi = longitude;
    
    // Check if the user's coordinates are inside the bounds of SMU
    if ((lat >= 32.836652095689644) && (lat <= 32.8474283738256))
    {
        if ((longi >= -96.7871743440628) && (longi <= -96.77916526794434)) {
            isOnCampus = TRUE;
        }
        else {
            isOnCampus = FALSE;
        }
    }
    // If the user's latitude is outside of SMU, then stop checking
    else {
        isOnCampus = FALSE;
    }
    
    // Stop checking the user's location
    [self stopCheckingLocation:manager];
}

- (void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error
{
    NSLog(@"didFailWithError: %@", error);
}

- (void)stopCheckingLocation:(CLLocationManager *)manager
{
    // Stop checking the user's location
    [manager stopUpdatingLocation];
    manager = nil;
}

@end
