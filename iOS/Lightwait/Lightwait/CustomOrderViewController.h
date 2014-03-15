//
//  CustomOrderViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CustomOrderViewController : UIViewController <UITableViewDataSource, UITableViewDelegate, UIScrollViewDelegate>
{
    NSArray *headerArray;
    NSArray *meatArray;
    NSArray *breadArray;
    NSArray *cheeseArray;
    NSArray *toppingsArray;
    NSArray *sauceArray;
    NSArray *friesArray;
    NSArray *totalArray;
}

@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UIPageControl *pageIndicator;

- (IBAction)pushNextPage:(id)sender;
- (IBAction)pushPreviousPage:(id)sender;

@end
