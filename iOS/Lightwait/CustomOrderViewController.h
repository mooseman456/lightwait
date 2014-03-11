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
    NSArray *sampleMenuChoices;
    NSArray *headerArray;
    NSString *headerString;
}

@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;

@end
