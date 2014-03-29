//
//  GrabViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/10/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "GrabViewController.h"

@interface GrabViewController ()

@end

@implementation GrabViewController
@synthesize menuTable = _menuTable;

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
    sectionsArray = [[NSArray alloc] initWithObjects:@"Pizza", @"Wraps", @"Sides", @"Desserts", nil];
    pizzaArray = [[NSArray alloc] initWithObjects:@"Cheese", @"Pepperoni", @"Sausage", nil];
    wrapsArray = [[NSArray alloc] initWithObjects:@"Barbecue Chicken", @"Buffalo Chicken", @"Turkey Wrap", nil];
    sidesArray = [[NSArray alloc] initWithObjects:@"Blueberry Yogurt", @"Strawberry Yogurt", @"Fruit Cup", @"Chips", nil];
    dessertsArray = [[NSArray alloc] initWithObjects:@"Carnival Cookies", @"Brownies", nil];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UITableView Datasource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 4;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    //return the number of rows in each section.
    switch (section) {
        case 0:
            return [pizzaArray count];
            break;
        case 1:
            return [wrapsArray count];
            break;
        case 2:
            return [sidesArray count];
            break;
        case 3:
            return [dessertsArray count];
            break;
        default:
            return 0;
            break;
    }
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
    //configure the cell
    switch (indexPath.section)
    {
        case 0:
            cell.textLabel.text = [pizzaArray objectAtIndex:[indexPath row]];
            break;
        case 1:
            cell.textLabel.text = [wrapsArray objectAtIndex:[indexPath row]];
            break;
        case 2:
            cell.textLabel.text = [sidesArray objectAtIndex:[indexPath row]];
            break;
        case 3:
            cell.textLabel.text = [dessertsArray objectAtIndex:[indexPath row]];
            break;
        default:
            break;
    }
    
    return cell;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    switch (section)
    {
        case 0:
            return [sectionsArray objectAtIndex:section];
            break;
        case 1:
            return [sectionsArray objectAtIndex:section];
            break;
        case 2:
            return [sectionsArray objectAtIndex:section];
            break;
        case 3:
            return [sectionsArray objectAtIndex:section];
            break;
        default:
            return @"";
            break;
    }
}

#pragma mark UITableView Delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    [tableView deselectRowAtIndexPath:indexPath animated:YES];
    [self showAlert:@"Item Information" message:@"Here is some information about the item tapped."];
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString
{
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:messageString delegate:self cancelButtonTitle:@"Dismiss" otherButtonTitles:nil, nil];
    [alertView show];
}

@end
