//
//  OrderManager.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/30/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "OrderManager.h"

// Hidden methods interface
@interface OrderManager(hidden)

+ (NSString *)orderBuilder:(NSMutableDictionary *)dictionary;

@end

// Hidden methods implementation
@implementation OrderManager(hidden)

+ (NSString *)orderBuilder:(NSMutableDictionary *)dictionary
{
#warning This is a temporary solution
    
    NSMutableDictionary *uploadDictionary = [[NSMutableDictionary alloc] init];
    
    [uploadDictionary setObject:[[NSUserDefaults standardUserDefaults] stringForKey:@"userID"] forKey:@"user_id"];
    [uploadDictionary setObject:[dictionary objectForKey:@"Base"] forKey:@"base"];
    [uploadDictionary setObject:[dictionary objectForKey:@"Bread"] forKey:@"bread"];
    [uploadDictionary setObject:[dictionary objectForKey:@"Cheese"] forKey:@"cheese"];
    [uploadDictionary setObject:[dictionary objectForKey:@"Toppings"] forKey:@"toppings"];
    [uploadDictionary setObject:[dictionary objectForKey:@"Fries"] forKey:@"fries"];

    return [JSONConverter convertNSMutableDictionaryToJSON:uploadDictionary];
}

@end

// Public implementation
@implementation OrderManager

+ (void)uploadOrder:(NSMutableDictionary *)data
{
    [DataManager uploadOrder:[self orderBuilder:data]];
}

@end
