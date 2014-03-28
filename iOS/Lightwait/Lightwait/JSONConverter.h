//
//  JSONConverter.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/15/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface JSONConverter : NSObject

+ (NSString *)convertNSMutableDictionaryToJSON:(NSMutableDictionary *)dictionary;
+ (NSDictionary*)convertNSDataToNSDictionary:(NSData *)data;
+ (NSMutableDictionary *)convertJSONToNSDictionary:(NSString *)json;

@end
