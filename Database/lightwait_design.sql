# Create the lighwait database
DROP DATABASE IF EXISTS lightwait;

CREATE DATABASE lightwait;
use lightwait;

CREATE TABLE Users (
	user_id INT(30) NOT NULL AUTO_INCREMENT,
	userType INT(1) NOT NULL DEFAULT 1,
	fName VARCHAR(255),
	lName VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	phoneNumber VARCHAR(255),
	Primary Key (user_id)
) ENGINE=InnoDB;

CREATE TABLE Fries (
	id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key(id)
) ENGINE=InnoDB;

CREATE TABLE Breads (
	id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key(id)
) Engine=InnoDB;

CREATE TABLE Bases (
	id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (id)
) Engine=InnoDB;

CREATE TABLE Cheeses (
	id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (id)
) Engine=InnoDB;

CREATE TABLE Toppings (
	id INT(30) NOT NULL AUTO_INCREMENT,
	name VARCHAR(30),
	available BOOLEAN DEFAULT 1,
	Primary Key (id)
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
	Foreign Key (bread_id) REFERENCES Breads(id),
	Foreign Key (base_id) REFERENCES Bases(id),
	Foreign Key (cheese_id) REFERENCES Cheeses(id),
	Foreign Key (fry_id) REFERENCES Fries(id)
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

INSERT INTO `Users` (`fName`, `lName`, `email`, `password`, `phoneNumber`, `accountType`) VALUES
('John', 'Pinkerton', 'jpink@poop.com', '8f2e4ecc49d6e42e24850ab59fea8e09b4c0bcbf3e77815a0999e0843e1365485ab2cc5cf23bb3e9646420156d08009fbc494ed50875adb863f675ecc3dc4d0a', '8795468253', 1), #dingaling
('Jimmy', 'Devlin', 'jdevlin@ding.com', 'affc85bf91ab449ebb5f42a4cba7d9309bbbbf218f78d8cda8748a4ed7981b0f320122b3d15686366368468a3c4dc3d183c6a327c09f3c58f23013924f64252d', '8796531523', 1),	#pooperdoop
('Ryan', 'Sligh', 'rsligh@sneaky.com', 'fe60d0fa303deaf2f2963fa006e6832cfdf412a1fd91310e6d8153ded0cfad64abdff779599523be199754b389d41ec5f52465f995b98e7512da8629118ca712', '2564532156', 1),	#burglery
('Patrick', 'Leopard', 'pleopard@spots.com', 'b47e14dbc224feb27c45b9fe9bdce8372cd87a03efc44227a2e2dbe5f192f4a25f755b8cd2c7dae33552035aaa2a832d895891c42a1a961f864235ea69b36aa3', '8256431589', 1),	#imabeargrr
('Joe', 'TheSaint', 'jsaint@holy.com', 'a6ccab3fbb15fe44c74585a4e2ef99f8ec9c21191c9389151532cb242a8bec4e4da662d3e7036e9cbf17bbf8c6d0b46b92b9e49d55bbf35ddb94f518e0ce82b4', '3958203958', 1),	#damnangel
('Kyle', 'Shunka', 'skunkalunka@kyle.com', '495c2f42ed8ff8c2b0bb40aa4bc0ddd8cd386e1ef63f034ba294942e33b155705b1f9acc63057c2e5670f24be13dc4770feda615aa79224756fd7ee3c93248ab', '8965742156', 2),	#shunkalunka
('Sir', 'Elington', 'selington@fancy.com', '813305dff3bf943f12b27e9506a06bfc39c7a5e54f9daad099c135fc341dd3381a9ee2c9521ba0283c2464a6be03f5d52bd5ea8f23035c57992584567329a7df', '7956824534', 3); #goodgracious

INSERT INTO Orders (user_id, bread_id, base_id, cheese_id, fry_id, timePlaced) 
				VALUES	(1, 1, 1, 1, 1, '2014-03-30 12:04:03'),
						(2, 1, 2, 2, 2, '2014-03-30 12:04:04'),
						(3, 2, 3, 2, 2, '2014-03-30 12:04:05'),
						(4, 3, 4, 3, 2, '2014-03-30 12:04:06'),
						(5, 3, 4, 2, 3, '2014-03-30 12:04:07');