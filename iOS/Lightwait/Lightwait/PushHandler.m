//
//  PushHandler.m
//  Lightwait
//
//  Created by Patrick Leopard II on 4/22/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "PushHandler.h"

@implementation PushHandler

+ (void)registerForNotifications
{
    [[UIApplication sharedApplication] registerForRemoteNotificationTypes:
     (UIRemoteNotificationTypeBadge | UIRemoteNotificationTypeSound | UIRemoteNotificationTypeAlert)];
}

+ (void)updateUserDeviceTokenInDatabase:(NSString*)userID deviceToken:(NSString*)deviceTokenString
{
    NSMutableDictionary* informationDictionary = [[NSMutableDictionary alloc] init];
    
    [informationDictionary setValue:deviceTokenString forKey:@"device_token"];
    [informationDictionary setValue:userID forKey:@"userID"];
    
    [DataManager updateDeviceToken:informationDictionary];
}

@end
