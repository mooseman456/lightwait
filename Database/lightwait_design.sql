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
	cheese_id INT(30) NOT NULL,
	hasFries BOOLEAN DEFAULT 0,
	timePlaced TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	timeFinished TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	isActive BOOLEAN DEFAULT 1,
	Primary Key (order_id),
	Foreign Key(user_id) REFERENCES Users.user_id,
	Foreign Key(bread_id) REFERENCES Breads.bread_id,
	Foreign Key(base_id) REFERENCES Bases.base_id,
	Foreign Key(cheese_id) REFERENCES Cheeses.cheese_id
) Engine=InnoDB;

