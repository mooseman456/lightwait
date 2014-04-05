//
//  DataManager.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/30/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "DataManager.h"

@implementation DataManager

+ (NSDictionary *)getMenu
{
    return [REST_API getPath:[kRootURL stringByAppendingString:kMenu]];
}

+ (NSString *)uploadOrder:(NSString*)data
{
    return [REST_API postPath:[kRootURL stringByAppendingString:kOrder] data:data];
}

+ (BOOL)logIn:(NSString *)username password:(NSString *)passwordString
{
    NSString* testLogIn = @"/account/alecsiems@smu.edu/testpassword123";
    NSLog(@"%@", [REST_API getPath:[kRootURL stringByAppendingString:testLogIn]]);
    return false;
}

@end