//
//  OrderSaver.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/16/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface OrderSaver : NSObject

+ (void)saveOrder:(NSString *)nameString order:(NSMutableDictionary *)dictionary;
+ (NSDictionary *)loadOrder:(NSString *)nameString;
+ (NSArray *)getOrderNames;

@end
