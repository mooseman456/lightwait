# Create the lighwait database

DROP DATABASE IF EXISTS lightwait;

CREATE DATABASE lightwait;
use lightwait;

CREATE TABLE Users (
	user_id INT(30) NOT NULL AUTO_INCREMENT,
	fName VARCHAR(255),
	lName VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	phoneNumber VARCHAR(255),
	Primary Key (user_id)
) ENGINE=InnoDB;

CREATE TABLE Employees (
	emp_id INT(30) NOT NULL AUTO_INCREMENT,
	fName VARCHAR(255),
	lName VARCHAR(255),
	Primary Key (emp_id)
) ENGINE=InnoDB;

CREATE TABLE Breads (
	bread_id INT(30) NOT NULL,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key(bread_id)
) Engine=InnoDB;

CREATE TABLE Bases (
	base_id INT(30) NOT NULL,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (base_id)
) Engine=InnoDB;

CREATE TABLE Cheeses (
	cheese_id INT(30) NOT NULL,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (cheese_id)
) Engine=InnoDB;

CREATE TABLE Toppings (
	topping_id INT(30) NOT NULL,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (topping_id)
) Engine=InnoDB;

CREATE TABLE OrderToppings (
	order_id INT(30),
	topping_id INT(30),
	Primary Key (order_id, topping_id)
) Engine=InnoDB;

CREATE TABLE Orders (
	order_id INT(30) NOT NULL AUTO_INCREMENT,
	user_id INT(30) NOT NULL,
	bread_id INT(30) NOT NULL,
	base_id INT(30) NOT NULL,
	cheese_id INT(30) DEFAULT 0,
	hasFries BOOLEAN DEFAULT 0,
	timePlaced TIMESTAMP NOT NULL DEFAULT 0,
	timeFinished TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	isActive BOOLEAN DEFAULT 1,
	Primary Key (order_id),
	Foreign Key (user_id) REFERENCES Users(user_id),
	Foreign Key (bread_id) REFERENCES Breads(bread_id),
	Foreign Key (base_id) REFERENCES Bases(base_id),
	Foreign Key (cheese_id) REFERENCES Cheeses(cheese_id)
) Engine=InnoDB;

# INSERT some ingredients and Users
INSERT INTO Breads VALUES (1, "White", 1);
INSERT INTO Breads VALUES (2, "Wheat", 1);
INSERT INTO Breads VALUES (3, "Texas Toast", 1);

INSERT INTO Bases VALUES (1, "Hamburger", 1);
INSERT INTO Bases VALUES (2, "Turkey", 1);
INSERT INTO Bases VALUES (3, "Chicken", 1);
INSERT INTO Bases VALUES (4, "Veggie", 1);
INSERT INTO Bases VALUES (5, "Black Bean", 1);
INSERT INTO Bases VALUES (6, "Double Beef Burger", 1);

INSERT INTO Cheeses VALUES (1, "American", 1);
INSERT INTO Cheeses VALUES (2, "Pepper Jack", 1);
INSERT INTO Cheeses VALUES (3, "Swiss", 1);

INSERT INTO Toppings VALUES (1, "Lettuce", 1);
INSERT INTO Toppings VALUES (2, "Jalapeno", 1);
INSERT INTO Toppings VALUES (3, "Tomato", 1);
INSERT INTO Toppings VALUES (4, "Bacon", 1);
INSERT INTO Toppings VALUES (5, "Pico de Gallo", 1);
INSERT INTO Toppings VALUES (6, "Pineapple", 1);
INSERT INTO Toppings VALUES (7, "Pickle", 1);
INSERT INTO Toppings VALUES (8, "Onion", 1);
INSERT INTO Toppings VALUES (9, "Avocado Mayo", 1);
INSERT INTO Toppings VALUES (10, "Bistro Sauce", 1);
INSERT INTO Toppings VALUES (11, "Chipotle Ranch", 1);
