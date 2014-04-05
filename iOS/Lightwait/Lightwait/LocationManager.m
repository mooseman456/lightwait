//
//  LocationManager.m
//  Lightwait
//
//  Created by Patrick Leopard II on 4/4/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "LocationManager.h"

@implementation LocationManager

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
 

@end
