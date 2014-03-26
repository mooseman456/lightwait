//
//  REST_API.m
//  REST_API
//
//  Created by Patrick Leopard II on 3/25/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "REST_API.h"

// Hidden methods interface
@interface REST_API (hidden)

+ (NSString*)sendRequest:(NSMutableURLRequest*)request;

@end

// Hidden methods implementation
@implementation REST_API (hidden)

+ (NSDictionary*)sendRequest:(NSMutableURLRequest*)request
{
    NSHTTPURLResponse* urlResponse = nil;
    NSError *error = [[NSError alloc] init];
    NSData *responseData = [NSURLConnection sendSynchronousRequest:request returningResponse:&urlResponse error:&error];

    if ([urlResponse statusCode] >= 200 && [urlResponse statusCode] < 300) {
        // Convert data to JSON string
        return [JSONConverter convertNSDataToNSDictionary:responseData];
    }
    else {
        // Error in request - return nil and log the error
        NSLog(@"Response Code: %ld", (long)[urlResponse statusCode]);
        NSLog(@"%@", [error localizedDescription]);
        return  nil;
    }
}

@end


@implementation REST_API

+ (NSDictionary*)getPath:(NSString*)resource
{
    // Create the link that will be used for the request
    NSURL *nsurl = [NSURL URLWithString:[[NSString stringWithFormat:@"%@", resource] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    // Create the request
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:nsurl];
    
    // Set the request type to GET
    [request setHTTPMethod:@"GET"];
    
    // Return the results of the request
    return [self sendRequest:request];
}

+ (bool)testConnection:(NSString*)resource
{
    // Create the link that will be used for the request
    NSURL *nsurl = [NSURL URLWithString:[[NSString stringWithFormat:@"%@", resource] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding]];
    
    // Create the request
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:nsurl];
    
    // Set the request type to GET
    [request setHTTPMethod:@"GET"];
    
    NSHTTPURLResponse* urlResponse = nil;
    NSError *error = [[NSError alloc] init];
    [NSURLConnection sendSynchronousRequest:request returningResponse:&urlResponse error:&error];
    
    if ([urlResponse statusCode] >= 200 && [urlResponse statusCode] < 300) {
        return true;
    }
    else {
        // Error in request - return nil and log the error
        NSLog(@"Response Code: %ld", (long)[urlResponse statusCode]);
        NSLog(@"%@", [error localizedDescription]);
        return  false;
    }
}

@end
