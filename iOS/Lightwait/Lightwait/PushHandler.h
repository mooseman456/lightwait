//
//  PushHandler.h
//  Lightwait
//
//  Created by Patrick Leopard II on 4/22/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DataManager.h"

@interface PushHandler : NSObject

+ (void)registerForNotifications;
+ (void)updateUserDeviceTokenInDatabase:(NSString*)userID deviceToken:(NSString*)deviceTokenString;

@end
