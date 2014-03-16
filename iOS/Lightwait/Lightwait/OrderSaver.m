//
//  OrderSaver.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/16/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "OrderSaver.h"

@implementation OrderSaver

+ (void)saveOrder:(NSString *)nameString order:(NSMutableDictionary *)dictionary
{
    // String that will hold the file name for the saved order
    NSString *dictionaryFileString = [nameString stringByAppendingString:@".txt"];
    
    // Get path to documents directory
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    
    // Check if file exists
    NSString *testPath = [[paths objectAtIndex:0] stringByAppendingPathComponent:@"orderNames.txt"];
    
    // If the file does not exist, create an empty one
    if (![[NSFileManager defaultManager] fileExistsAtPath:testPath]) {
        NSMutableArray *emptyArray = [[NSMutableArray alloc] init];
        [emptyArray writeToFile:[[paths objectAtIndex:0] stringByAppendingPathComponent:@"orderNames.txt"] atomically:YES];
    }
    
    if ([paths count] > 0)
    {
        // Path to save array data
        NSString *arrayPath = [[paths objectAtIndex:0] stringByAppendingPathComponent:@"orderNames.txt"];
        
        // Path to save dictionary
        NSString *dictPath = [[paths objectAtIndex:0] stringByAppendingPathComponent:dictionaryFileString];
        
        // Read file into NSMutableArray
        NSMutableArray *arrayFromFile = [NSMutableArray arrayWithContentsOfFile:arrayPath];
        
        // Add the new order name to the end of the array
        [arrayFromFile addObject:nameString];
        
        // Rewrite array to file
        [arrayFromFile writeToFile:arrayPath atomically:YES];
        
        // Write dictionary to file
        [dictionary writeToFile:dictPath atomically:YES];
    }
}

+ (NSDictionary *)loadOrder:(NSString *)nameString
{
    // If this method is called, the file must exist, so checking for file existence is not needed
    
    // String that will hold the file name for the saved order
    NSString *dictionaryFileString = [nameString stringByAppendingString:@".txt"];

    // Get path to documents directory
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);

    // Path to load dictionary
    NSString *dictPath = [[paths objectAtIndex:0] stringByAppendingPathComponent:dictionaryFileString];
    
    // Load the dictionary from file
    NSDictionary *dictionaryFromFile = [NSDictionary dictionaryWithContentsOfFile:dictPath];
    
    return dictionaryFromFile;
}

+ (NSArray *)getOrderNames
{
    // Initialize array
    NSArray *orderNames = [[NSArray alloc] init];
    
    // Get path to documents directory
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    
    // Check if file exists
    NSString *testPath = [[paths objectAtIndex:0] stringByAppendingPathComponent:@"orderNames.txt"];
    
    // If the file does not exist, return an empty array
    if (![[NSFileManager defaultManager] fileExistsAtPath:testPath]) {
        return orderNames;
    }
    
    if ([paths count] > 0)
    {
        // Path to save array data
        NSString *arrayPath = [[paths objectAtIndex:0] stringByAppendingPathComponent:@"orderNames.txt"];
        
        // Read file into orderNames array
        orderNames = [NSArray arrayWithContentsOfFile:arrayPath];
    }
    
    return orderNames;
}

@end
