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
CLLocationManager *_locationManager;

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    
    // Defaults to yes - FOR TESTING PURPOSES ONLY
    isOnCampus = YES;
    //[self initializeLocationManager];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}
/*
- (void)initializeLocationManager
{
    // Check to ensure location services are enabled
    if(![CLLocationManager locationServicesEnabled]) {
        [self showAlert:@"Alert" message:@"Location services must be enabled for this app"];
        return;
    }
    
    _locationManager = [[CLLocationManager alloc] init];
    _locationManager.delegate = self;
    [_locationManager startUpdatingLocation];
}

- (void)locationManager:(CLLocationManager *)manager didUpdateLocations:(NSArray *)locations
{
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
            [self foundLocation:YES];
        }
        else {
            [self foundLocation:NO];
        }
    }
    // If the user's latitude is outside of SMU, then stop checking
    else {
        [self foundLocation:NO];
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

- (void)foundLocation:(BOOL)isInRegion
{
    if (isInRegion == YES)
        isOnCampus = TRUE;
    else
        isOnCampus = FALSE;
}
*/

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
