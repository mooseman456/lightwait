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

+ (NSDictionary *)logIn:(NSString *)username password:(NSString *)passwordString
{
    NSString *logInString = [@"/account/" stringByAppendingString:username];
    logInString = [logInString stringByAppendingString:@"/"];
    logInString = [logInString stringByAppendingString:passwordString];
    
    return [REST_API getPath:[kRootURL stringByAppendingString:logInString]];
}

+ (NSString *)createAccount:(NSMutableDictionary *)accountInformation
{
    return [REST_API postPath:[kRootURL stringByAppendingString:kAccount] data:[JSONConverter convertNSMutableDictionaryToJSON:accountInformation]];
}


@end