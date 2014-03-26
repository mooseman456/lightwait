//
//  JSONConverter.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/15/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "JSONConverter.h"

@implementation JSONConverter

+ (NSString*)convertNSMutableDictionaryToJSON:(NSMutableDictionary *)dictionary
{
    // Initialize an error
    NSError *error;
    
    // Convert the dictionary to JSON
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dictionary options:NSJSONWritingPrettyPrinted error:&error];
    
    // If JSON data, return it - else return an error
    if (jsonData) {
        return [[NSString alloc] initWithBytes:[jsonData bytes] length:[jsonData length] encoding:NSUTF8StringEncoding];
    }
    else {
        NSString *errorString = [@"JSON error: " stringByAppendingString:[error localizedDescription]];
        NSLog(@"%@", errorString);
        return errorString;
    }
}

+ (NSDictionary*)convertJSONToNSDictionary:(NSString *)jsonString
{
    NSData *jsonData = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    NSError *error = nil;
    
    NSDictionary *menuDictionary = [NSJSONSerialization JSONObjectWithData:jsonData options:NSJSONReadingMutableContainers error:&error];
    
     // If NSDictionary, return it - else return an error
    if(menuDictionary) {
        return menuDictionary;
    }
    else {
        NSLog(@"%@",error);
        return NULL;
    }
}

@end
