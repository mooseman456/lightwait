//
//  SavedOrdersManager.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/26/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface SavedOrdersManager : NSObject

+ (void)saveOrder:(NSString *)nameString order:(NSMutableDictionary *)dictionary;
+ (NSDictionary *)loadOrder:(NSString *)nameString;
+ (NSArray *)getOrderNames;
+ (BOOL)checkIfNameExists:(NSString*)nameString;

@end
