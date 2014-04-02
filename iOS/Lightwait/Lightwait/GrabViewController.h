//
//  GrabViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/10/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface GrabViewController : UIViewController <UITableViewDataSource, UITableViewDelegate>
{
    NSArray *sectionsArray;
    NSArray *pizzaArray;
    NSArray *wrapsArray;
    NSArray *sidesArray;
    NSArray *dessertsArray;
    NSArray *menuArray;
}

@property (weak, nonatomic) IBOutlet UITableView *menuTable;

@end
