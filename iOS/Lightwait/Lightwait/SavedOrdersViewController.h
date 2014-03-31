//
//  SavedOrdersViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JSONConverter.h"
#import "SavedOrdersManager.h"
#import "OrderManager.h"

@interface SavedOrdersViewController : UIViewController
{
    NSArray *savedOrdersArray;
}

@end
