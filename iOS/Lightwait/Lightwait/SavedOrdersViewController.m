//
//  SavedOrdersViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "SavedOrdersViewController.h"

@interface SavedOrdersViewController ()

@end

@implementation SavedOrdersViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view.
    
    [self customizeAppearance];
    
    savedOrdersArray = [SavedOrdersManager getOrderNames];
}

- (void)viewDidAppear:(BOOL)animated
{
    [self checkForEmptyArray];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)customizeAppearance
{
    [self.view setBackgroundColor:[UIColor colorWithRed:234.0/255.0f green:238.0/255.0f blue:250.0/255.0f alpha:1.0f]];
    [self.lightwaitTextLabel setFont:[UIFont fontWithName: @"Ubuntu-Bold" size:42]];
    [self.lightwaitTextLabel setTextColor:[UIColor colorWithRed:157.0/255.0f green:157.0/255.0f blue:157.0/255.0f alpha:1.0f]];
    
    self.tableView.contentInset = UIEdgeInsetsMake(-64, 0, 0, 0);
}

#pragma mark - UITableView Datasource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [savedOrdersArray count];
}

- (UIView *)tableView:(UITableView *)tableView viewForHeaderInSection:(NSInteger)section {
    
    UILabel *label = [[UILabel alloc] init];
    label.frame = CGRectMake(10, 2, 320, 20);
    label.font = [UIFont fontWithName: @"Ubuntu-Bold" size:16];
    label.text = [self tableView:tableView titleForHeaderInSection:section];
    
    UIView *headerView = [[UIView alloc] init];
    headerView.backgroundColor = [UIColor groupTableViewBackgroundColor];
    [headerView addSubview:label];
    
    return headerView;
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
    cell.textLabel.font = [UIFont fontWithName: @"Ubuntu-Light" size:16];
    cell.textLabel.text = [savedOrdersArray objectAtIndex:[indexPath row]];
    
    return cell;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return @"Saved Orders";
}

#pragma mark UITableView Delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [OrderManager uploadOrder:[[NSMutableDictionary alloc] initWithDictionary:[SavedOrdersManager loadOrder:[savedOrdersArray objectAtIndex:[indexPath row]]]]];

    [self showAlert:@"Order Placed" message:@"Thank you for order. It will be ready shortly."];
}

- (void)checkForEmptyArray
{
    // If the array returned is empty, alert the user
    if ([savedOrdersArray count] == 0) {
        [self showAlert:@"Alert" message:@"You have not saved any orders yet"];
    }
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:messageString delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
    [alertView show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    if (buttonIndex == 0) {
        // Successful account creation
        [self.navigationController popToRootViewControllerAnimated:TRUE];
    }
}

@end