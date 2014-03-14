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
    
    sampleMenuChoices = [[NSArray alloc] initWithObjects:@"Hot and Spicy", @"Island", @"Favorite", nil];
    
    headerArray = [[NSArray alloc] initWithObjects:@"Meat", @"Bread", @"Cheese", @"Toppings", @"Sauce", @"Fries", nil];
    
    self.pageIndicator.numberOfPages=[headerArray count];
    self.pageIndicator.currentPage=0;
    
    [self createPagingScrollView];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)createPagingScrollView
{
    // Creates a table page for each menu category
    for (int i = 0; i < [headerArray count]; i++)
    {
        // Updates the header to the next string in the array
        headerString = [headerArray objectAtIndex:i];
        
        //Creates a new frame that will contain the table
        CGRect frame;
        
        // Sets the origin location of each page by multiplying the width by the number of frames
        frame.origin.x = self.scrollView.frame.size.width * i;
        
        // Sets the size of each page to be the size of the scroll view
        frame.size = self.scrollView.frame.size;
        
        // Creates a new tableView and sets the delegate and data souce to self
        UITableView *tableView = [[UITableView alloc] initWithFrame:frame style:UITableViewStylePlain];
        tableView.delegate = self;
        tableView.dataSource = self;
        
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

#pragma mark - UITableView Datasource

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [sampleMenuChoices count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    static NSString *cellIdentifier = @"Cell";
    
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:cellIdentifier];
    
    if (cell == nil)
    {
        cell = [[UITableViewCell alloc]initWithStyle:UITableViewCellStyleDefault reuseIdentifier:cellIdentifier];
    }
    
    cell.textLabel.text = [sampleMenuChoices objectAtIndex:[indexPath row]];
    
    return cell;
}

- (NSString *)tableView:(UITableView *)tableView titleForHeaderInSection:(NSInteger)section
{
    NSLog(@"%@", headerString);
    return headerString;
}

#pragma mark UITableView Delegate

- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
    
}

#pragma mark - Actions

- (IBAction)pushNextPage:(id)sender
{
    [self scrollToNextPage];
}

- (IBAction)pushPreviousPage:(id)sender
{
    [self scrollToPreviousPage];
}

- (void)scrollToNextPage
{
    CGFloat contentOffset = self.scrollView.contentOffset.x;
    
    // Calculate the location of the next page
    int nextPage = (int)(contentOffset/self.scrollView.frame.size.width) + 1 ;
    
    [self.scrollView scrollRectToVisible:CGRectMake(nextPage*self.scrollView.frame.size.width, 0, self.scrollView.frame.size.width, self.scrollView.frame.size.height) animated:YES];
    
    [self updatePageIndicator:nextPage];
}

- (void)scrollToPreviousPage
{
    CGFloat contentOffset = self.scrollView.contentOffset.x;
    
    // Calculate the location of the previous page
    int prevPage = (int)(contentOffset/self.scrollView.frame.size.width) - 1;
    
    [self.scrollView scrollRectToVisible:CGRectMake(prevPage*self.scrollView.frame.size.width, 0, self.scrollView.frame.size.width, self.scrollView.frame.size.height) animated:YES];
    
    [self updatePageIndicator:prevPage];
}

- (void)updatePageIndicator:(int)pageNumber
{
    self.pageIndicator.currentPage=pageNumber;
}

@end