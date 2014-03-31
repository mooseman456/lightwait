//
//  OrderManager.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/30/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "JSONConverter.h"
#import "DataManager.h"

@interface OrderManager : NSObject

+ (void)uploadOrder:(NSMutableDictionary *)data;

@end
