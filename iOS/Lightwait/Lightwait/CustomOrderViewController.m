//
//  CustomOrderViewController.m
//  Lightwait
//
//  Created by Patrick Leopard II on 3/9/14.
//  Copyright (c) 2014 Patrick Leopard II. All rights reserved.
//

#import "CustomOrderViewController.h"

@interface CustomOrderViewController ()

@end

@implementation CustomOrderViewController

#pragma mark - View Lifecycle

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
    
    [self initializeMenuArrays];
    [self initializeOrderDictionary];
    [self createPagingScrollView];
    
    // Set the properties of the page indicator
    self.pageIndicator.numberOfPages=[headerArray count];
    self.pageIndicator.currentPage=0;
    self.pageIndicator.enabled=NO;
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma mark - UIScrollView Delegate

- (void)createPagingScrollView
{
    //Creates a new frame that will contain the table
    CGRect frame;
    
    // Sets the size of each page to be the size of the scroll view
    frame.size.width = self.scrollView.frame.size.width;
    
    // if 3.5 inch screen size
    if (self.view.frame.size.height == 480) {
        frame.size.height = self.scrollView.frame.size.height;
    }
    else {
        // Get the size of the screen and subtract 195 - the height of all other elements
        // on the screen
        frame.size.height = self.view.frame.size.height-195;
    }
    
    // Creates a table page for each menu category
    for (int i = 0; i < [headerArray count]; i++)
    {
        // Sets the origin location of each page by multiplying the width by the number of frames
        frame.origin.x = self.scrollView.frame.size.width * i;
        
        // Creates a new tableView and sets the delegate and data souce to self
        UITableView *tableView = [[UITableView alloc] initWithFrame:frame style:UITableViewStylePlain];
        tableView.delegate = self;
        tableView.dataSource = self;
        tableView.tag=i;
        
        // If the table is the toppings table, allow multiple selections
        if (i == [headerArray indexOfObject:@"Toppings"]) {
            tableView.allowsMultipleSelection=TRUE;
        }
        
        // Sets the view of each page and background color
        [self.scrollView addSubview:tableView];
        
        // Reload the table data
        [tableView reloadData];
    }
    
    // Enables horizontal scrolling
    self.scrollView.pagingEnabled = YES;
    
    // Makes the contentSize as wide as the number of pages * the width of the screen, with height of the view
    self.scrollView.contentSize =  CGSizeMake(self.scrollView.frame.size.width * [headerArray count], self.scrollView.frame.size.height);
    
    // Hides the horizontal scroll bar
    self.scrollView.showsHorizontalScrollIndicator = FALSE;
}

- (void)scrollViewDidEndDecelerating:(UIScrollView *)scrollView
{
    // Calculate the page number the user scrolled to
    CGFloat pageWidth = scrollView.frame.size.width;
    CGFloat contentOffset = self.scrollView.contentOffset.x;
    int currentPageNumber = floor((contentOffset - pageWidth / 2) / pageWidth) + 1;
    
    // Set the indicator
    self.pageIndicator.currentPage=currentPageNumber;
    
    [self updateRightButton];
}

- (void)scrollToNextPage
{
    CGFloat contentOffset = self.scrollView.contentOffset.x;
    
    // Calculate the location of the next page
    int nextPage = (int)(contentOffset/self.scrollView.frame.size.width) + 1;
    
    // Scroll the page to the right
    [self.scrollView scrollRectToVisible:CGRectMake(nextPage*self.scrollView.frame.size.width, 0, self.scrollView.frame.size.width, self.scrollView.frame.size.height) animated:YES];
    
    // Increment the indicator
    self.pageIndicator.currentPage +=1;
}

- (void)scrollToPreviousPage
{
    CGFloat contentOffset = self.scrollView.contentOffset.x;
    
    // Calculate the location of the previous page
    int prevPage = (int)(contentOffset/self.scrollView.frame.size.width) - 1;
    
    // Scroll the page to the left
    [self.scrollView scrollRectToVisible:CGRectMake(prevPage*self.scrollView.frame.size.width, 0, self.scrollView.frame.size.width, self.scrollView.frame.size.height) animated:YES];
    
    // Decrement the indicator
    self.pageIndicator.currentPage -=1;
}

- (void)scrollToPage:(NSInteger)pageNumber
{
    // Scroll to the page number
    [self.scrollView scrollRectToVisible:CGRectMake(pageNumber*self.scrollView.frame.size.width, 0, self.scrollView.frame.size.width, self.scrollView.frame.size.height) animated:YES];
    
    // Set the indicator
    self.pageIndicator.currentPage = pageNumber;
}

#pragma mark - UITableView Datasource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    // Each table has one section
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    // Retrieve the table tag and then set the number of rows
    // to the count of items in the array
    return [[menuDataArray objectAtIndex:tableView.tag] count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    // Initialize each cell
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
    // Use the table's tag to retrieve the index of the array within menuDataArray, then set the
    // cell's title to be the object at the index of the table's row
    cell.textLabel.text = [[menuDataArray objectAtIndex:tableView.tag] objectAtIndex:[indexPath row]];
    
    return cell;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    return [headerArray objectAtIndex:tableView.tag];
}

#pragma mark UITableView Delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // If not selecting from the toppings page, only one selection allowed
    if (tableView.allowsMultipleSelection == FALSE) {
        // Add the selected item as the object and the type of item for the key
        [orderDictionary setObject:[[menuDataArray objectAtIndex:tableView.tag] objectAtIndex:[indexPath row]] forKey:[headerArray objectAtIndex:tableView.tag]];
        [self scrollToNextPage];
    }
    // If selecting from toppings page, extra code is required to handle selecting and deselecting
    else {
        // If the user selects none, deselect the other cells
        // Else, deselect none
        if ([[toppingsArray objectAtIndex:[indexPath row]] isEqual:@"None"])
        {
            // Cycle through all other cells
            for (NSUInteger i = 0; i < [indexPath row]; i++)
            {
                // Deselect all other cells
                [tableView deselectRowAtIndexPath:[NSIndexPath indexPathForRow:i inSection:0] animated:YES];
                
                // Remove all other items from the toppings array
                [selectedToppings removeObject:[[menuDataArray objectAtIndex:tableView.tag] objectAtIndex:i]];

                // Re-add the updated array to the dictionary
                [orderDictionary setObject:selectedToppings forKey:[headerArray objectAtIndex:tableView.tag]];
            }
        }
        // The user did not select none
        else {
            // If toppings array contains none, remove it
            if ([selectedToppings containsObject:@"None"])
            {
                [selectedToppings removeObject:@"None"];
                
                // Re-add the updated array to the dictionary
                [orderDictionary setObject:selectedToppings forKey:[headerArray objectAtIndex:tableView.tag]];
            }

            // Deselect all other cells
            [tableView deselectRowAtIndexPath:[NSIndexPath indexPathForRow:[toppingsArray indexOfObject:@"None"] inSection:0] animated:YES];
        }
        // Add the toppings to an array and add it to the order dictionary
        [selectedToppings addObject:[[menuDataArray objectAtIndex:tableView.tag] objectAtIndex:[indexPath row]]];
        [orderDictionary setObject:selectedToppings forKey:[headerArray objectAtIndex:tableView.tag]];
    }
    
    [self updateRightButton];
}

- (void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath
{
    // If deselecting from the toppings page
    if (tableView.allowsMultipleSelection == TRUE) {
        // Remove the deselected item from the toppings array
        [selectedToppings removeObject:[[menuDataArray objectAtIndex:tableView.tag] objectAtIndex:[indexPath row]]];
        
        // Re-add the updated array to the dictionary
        [orderDictionary setObject:selectedToppings forKey:[headerArray objectAtIndex:tableView.tag]];
    }
}

#pragma mark - Buttons

- (IBAction)pushLeftButton:(id)sender
{
    // Scroll to the previous page and then set the right button label
    [self scrollToPreviousPage];
    [self updateRightButton];
}

- (IBAction)pushRightButton:(id)sender
{
    // If the user is on the last page and selected all required items
    if (self.pageIndicator.currentPage == 4 && [self checkForCompleteOrder]) {
        [self askUserToSaveOrder];
    }
    else {
        // Scroll to the previous page and then set the right button label
        [self scrollToNextPage];
        [self updateRightButton];
    }
}

- (void)updateRightButton
{
    // Check to see if the user is on the last page - TRUE when selecting fries
    // Update the next button to equal done if true or next if false
    if (self.pageIndicator.currentPage == 4) {
        self.rightButton.title = @"Done";
    }
    else {
        self.rightButton.title = @"Next";
    }
}

#pragma mark - Miscellaneous

- (void)initializeMenuArrays
{
#warning Change this link for release
    NSDictionary *menuDictionary = [REST_API getPath:@"http://localhost:8888/lightwait/Web/api/index.php/menu"];
    
    if (menuDictionary) {
        // Menu data arrays
        headerArray = [[NSArray alloc] initWithObjects:@"Base", @"Bread", @"Cheese", @"Toppings", @"Fries", nil];
        baseArray = [menuDictionary objectForKey:@"Bases"];
        breadArray = [menuDictionary objectForKey:@"Breads"];
        cheeseArray = [menuDictionary objectForKey:@"Cheeses"];
        toppingsArray = [menuDictionary objectForKey:@"Toppings"];
        friesArray = [[NSArray alloc] initWithObjects:@"Fries", @"No Fries", nil];
        menuDataArray = [[NSArray alloc] initWithObjects:baseArray, breadArray, cheeseArray, toppingsArray, friesArray, nil];
        selectedToppings = [[NSMutableArray alloc] init];
    }
    else {
        return;
    }
}

- (void)initializeOrderDictionary
{
    // Initialize order dictionary
    orderDictionary = [[NSMutableDictionary alloc] initWithDictionary:[REST_API getPath:@"http://localhost:8888/lightwait/Web/api/index.php/menu"]];
    
    // Set values that can be none to none so that the user does not have to
    // should they not want a particular item
    // Set base and bread to null so that they can later be checked if they
    // were selected or not
    [orderDictionary setObject:[NSNull null] forKey:@"Base"];
    [orderDictionary setObject:[NSNull null] forKey:@"Bread"];
    [orderDictionary setObject:@"None" forKey:@"Cheese"];
    [orderDictionary setObject:@"None" forKey:@"Toppings"];
    [orderDictionary setObject:@"No Fries" forKey:@"Fries"];
}

- (BOOL)checkForCompleteOrder
{
    // Check if either base or bread are null
    // If either are true, alert the user and then scroll to that page
    // Otherwise, the order is complete
    if ([[orderDictionary objectForKey:@"Base"] isEqual: [NSNull null]]) {
        [self showAlert:@"Alert" message:@"Please select a base" tagNumber:0];
        [self scrollToPage:[headerArray indexOfObject:@"Base"]];
        return FALSE;
    }
    else if ([[orderDictionary objectForKey:@"Bread"] isEqual: [NSNull null]]) {
        [self showAlert:@"Alert" message:@"Please select a type of bread" tagNumber:0];
        [self scrollToPage:[headerArray indexOfObject:@"Bread"]];
        return FALSE;
    }
    else {
        return TRUE;
    }
}

- (BOOL)checkOrderName:(NSString*)nameString
{
    // If the name already exists, return false
    if (![nameString isEqual:@""] && ![SavedOrdersManager checkIfNameExists:nameString]) {
        return true;
    }
    else {
        return false;
    }
}

#pragma mark - Alerts

- (void)askUserToSaveOrder
{
    UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Save This Order"
                                                    message:@"Would you like to save this order?"
                                                   delegate:self
                                          cancelButtonTitle:@"No thanks"
                                          otherButtonTitles:@"Save", nil];
    alert.alertViewStyle = UIAlertViewStylePlainTextInput;
    alert.tag = 1;
    [alert show];
}

- (void)alertView:(UIAlertView *)alertView clickedButtonAtIndex:(NSInteger)buttonIndex
{
    switch (alertView.tag) {
        // askUserToSaveOrder alert
        case 1:
            // If the user clicked save
            if (buttonIndex == 1) {
                NSString *orderName = @"";
                orderName = [alertView textFieldAtIndex:0].text;
                // Check to see if the order name is valid
                if ([self checkOrderName:orderName]) {
                    // Save the order and alert the user
                    [SavedOrdersManager saveOrder:orderName order:orderDictionary];
                    [self showAlert:@"Order Placed" message:@"Thank you for order. It will be ready shortly." tagNumber:2];
                }
                else {
                    // Alert the user that the given name was invalid and then re-prompt
                    [self showAlert:@"Invalid Name" message:@"Please enter a new name." tagNumber:3];
                }
            }
            else {
                // Successful order, alert the user
                [self showAlert:@"Order Placed" message:@"Thank you for order. It will be ready shortly." tagNumber:2];
            }
            break;
        // Successful order table
        case 2:
            // Successful order alert, send the user back to the home page
            [self.navigationController popToRootViewControllerAnimated:TRUE];
            break;
        // Invalid name table
        case 3:
            [self askUserToSaveOrder];
        default:
            break;
    }
}

- (void)showAlert:(NSString *)title message:(NSString *)messageString tagNumber:(int)tag
{
    // Show an alert on the screen
    UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:title message:messageString delegate:self cancelButtonTitle:@"Dismiss" otherButtonTitles:nil, nil];
    alertView.tag = tag;
    [alertView show];
}

@end