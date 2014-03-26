//
//  REST_API.h
//  REST_API
//
//  Created by Patrick Leopard II on 3/25/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JSONConverter.h"

@interface REST_API : NSObject

+ (NSDictionary*) getPath:(NSString*)resource;
+ (NSDictionary*) postPath:(NSString*)resource;
+ (NSDictionary*) putPath:(NSString*)resource;
+ (NSDictionary*) deletePath:(NSString*)resource;

@end
