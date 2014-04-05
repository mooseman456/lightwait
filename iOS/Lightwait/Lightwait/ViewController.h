//
//  ViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>

#import "REST_API.h"

@interface ViewController : UIViewController <CLLocationManagerDelegate>
{
    bool isOnCampus;
}

- (IBAction)pushCustomOrder:(id)sender;

@end
