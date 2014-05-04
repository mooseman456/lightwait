//
//  CustomOrderViewController.h
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "JSONConverter.h"
#import "SavedOrdersManager.h"
#import "DataManager.h"
#import "OrderManager.h"

@interface CustomOrderViewController : UIViewController <UITableViewDataSource, UITableViewDelegate, UIScrollViewDelegate>
{
    NSArray *headerArray;
    NSArray *baseArray;
    NSArray *breadArray;
    NSArray *cheeseArray;
    NSArray *toppingsArray;
    NSArray *friesArray;
    NSArray *menuDataArray;
    NSMutableArray *selectedToppings;
    NSMutableDictionary *orderDictionary;
    NSMutableDictionary *uploadDictionary;
}

// View properties
@property (weak, nonatomic) IBOutlet UILabel *lightwaitTextLabel;
@property (weak, nonatomic) IBOutlet UIScrollView *scrollView;
@property (weak, nonatomic) IBOutlet UIToolbar *toolbar;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *leftButton;
@property (weak, nonatomic) IBOutlet UIBarButtonItem *rightButton;
@property (weak, nonatomic) IBOutlet UIPageControl *pageIndicator;

// Actions
- (IBAction)pushLeftButton:(id)sender;
- (IBAction)pushRightButton:(id)sender;

// Customizes the appearance of the view
- (void)customizeAppearance;
- (void)updateRightButton;

//UIScrollView Delegate
- (void)createPagingScrollView;
- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView;
- (void)scrollToNextPage;
- (void)scrollToPreviousPage;
- (void)scrollToPage:(NSInteger)pageNumber;

// UITableView Datasource
- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView;
- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section;
- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath;
- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section;
- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section;

// UITableView Delegate
- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath;
- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath;

// Alerts
- (void)askUserToSaveOrder;
- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex;
- (void)showAlert:(NSString *)title message:(NSString *)messageString tagNumber:(int)tag;

// Miscellaneous
- (void)initializeMenuArrays;
- (void)initializeOrderDictionary;
- (BOOL)checkForCompleteOrder;
- (BOOL)checkOrderName:(NSString*)nameString;


@end
