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

CREATE TABLE Fries (
	fry_id INT(30) NOT NULL,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key(fry_id)
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
	fry_id INT(30) DEFAULT 0,
	timePlaced TIMESTAMP NOT NULL DEFAULT 0,
	timeFinished TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	isActive BOOLEAN DEFAULT 1,
	Primary Key (order_id),
	Foreign Key (user_id) REFERENCES Users(user_id),
	Foreign Key (bread_id) REFERENCES Breads(bread_id),
	Foreign Key (base_id) REFERENCES Bases(base_id),
	Foreign Key (cheese_id) REFERENCES Cheeses(cheese_id),
	Foreign Key (fry_id) REFERENCES Fries(fry_id)
) Engine=InnoDB;

# INSERT some ingredients and Users
INSERT INTO `Breads` (`bread_id`, `name`, `available`) VALUES
(1, 'White', 1),
(2, 'Wheat', 1),
(3, 'Texas Toast', 1);

INSERT INTO `Bases` (`base_id`, `name`, `available`) VALUES
(1, 'Grilled Cheese', 1),
(2, 'Hamburger', 1),
(3, 'Turkey', 1),
(4, 'Chicken', 1),
(5, 'Veggie', 1),
(6, 'Black Bean', 1);

INSERT INTO `Cheeses` (`cheese_id`, `name`, `available`) VALUES
(1, 'American', 1),
(2, 'Pepper Jack', 1),
(3, 'Swiss', 1),
(4, 'No Cheese', 1);

INSERT INTO `Fries` (`fry_id`, `name`, `available`) VALUES
(1, 'Regular', 1),
(2, 'Sweet Potato', 1),
(3, 'No Fries', 1);

INSERT INTO `Toppings` (`topping_id`, `name`, `available`) VALUES
(1, 'Lettuce', 1),
(2, 'Jalapeno', 1),
(3, 'Tomato', 1),
(4, 'Bacon', 1),
(5, 'Pico de Gallo', 1),
(6, 'Pineapple', 1),
(7, 'Pickle', 1),
(8, 'Onion', 1),
(9, 'Avocado Mayo', 1),
(10, 'Bistro Sauce', 1),
(11, 'Chipotle Ranch', 1);

INSERT INTO `Users` (`fName`, `lName`, `email`, `password`, `phoneNumber`) VALUES
('John', 'Pinkerton', 'jpink@poop.com', 'ding', '8795468253'),
('Jimmy', 'Devlin', 'jdevlin@ding.com', 'poop', '8796531523'),
('Ryan', 'Sligh', 'rsligh@sneaky.com', 'burgler', '2564532156'),
('Patrick', 'Leopard', 'pleopard@spots.com', 'grrr', '8256431589'),
('Joe', 'TheSaint', 'jsaint@holy.com', 'angel', '3958203958');

INSERT INTO Orders (user_id, bread_id, base_id, cheese_id, fry_id, timePlaced) 
				VALUES	(1, 1, 1, 1, 1, '2014-03-30 12:04:03'),
						(2, 1, 2, 2, 2, '2014-03-30 12:04:04'),
						(3, 2, 3, 2, 2, '2014-03-30 12:04:05'),
						(4, 3, 4, 3, 2, '2014-03-30 12:04:06'),
						(5, 3, 4, 2, 3, '2014-03-30 12:04:07');



