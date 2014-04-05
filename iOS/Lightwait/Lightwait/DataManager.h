//
//  DataManager.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/30/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "REST_API.h"
#import "Strings.h"

@interface DataManager : NSObject

+ (NSDictionary*)getMenu;
+ (NSString *)uploadOrder:(NSString*)data;
+ (NSDictionary *)logIn:(NSString *)username password:(NSString *)passwordString;

@end
