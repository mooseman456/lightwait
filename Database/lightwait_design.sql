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
	fry_id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key(fry_id)
) ENGINE=InnoDB;

CREATE TABLE Breads (
	bread_id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key(bread_id)
) Engine=InnoDB;

CREATE TABLE Bases (
	base_id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (base_id)
) Engine=InnoDB;

CREATE TABLE Cheeses (
	cheese_id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (cheese_id)
) Engine=InnoDB;

CREATE TABLE Toppings (
	topping_id INT(30) NOT NULL AUTO_INCREMENT,
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

# Procedures
DELIMITER $$

CREATE PROCEDURE recallOrder()
BEGIN

UPDATE Orders SET isActive = 1 
WHERE timeFinished = (SELECT timeFinished FROM (SELECT timeFinished FROM Orders WHERE isActive=0 ORDER BY timeFinished DESC LIMIT 1) AS TimeFinished) LIMIT 1;

END $$

DELIMITER ;

# INSERT some ingredients and Users
INSERT INTO `Breads` (`name`) VALUES
('White'),
('Wheat'),
('Texas Toast');

INSERT INTO `Bases` (`name`) VALUES
('Grilled Cheese'),
('Hamburger'),
('Turkey'),
('Chicken'),
('Veggie'),
('Black Bean');

INSERT INTO `Cheeses` (`name`) VALUES
('American'),
('Pepper Jack'),
('Swiss'),
('No Cheese');

INSERT INTO `Fries` (`name`) VALUES
('Regular'),
('Sweet Potato'),
('No Fries');

INSERT INTO `Toppings` (`name`) VALUES
('Lettuce'),
('Jalapeno'),
('Tomato'),
('Bacon'),
('Pico de Gallo'),
('Pineapple'),
('Pickle'),
('Onion'),
('Avocado Mayo'),
('Bistro Sauce'),
('Chipotle Ranch');

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



