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
    [dictionary setObject:[[NSUserDefaults standardUserDefaults] stringForKey:@"userID"] forKey:@"user_id"];
    return [JSONConverter convertNSDictionaryToJSON:dictionary];
}

@end

// Public implementation
@implementation OrderManager

+ (void)uploadOrder:(NSMutableDictionary *)data
{
    [DataManager uploadOrder:[self orderBuilder:data]];
}

@end
