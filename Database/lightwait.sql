-- phpMyAdmin SQL Dump
-- version 4.0.6deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Mar 30, 2014 at 07:04 PM
-- Server version: 5.5.35-0ubuntu0.13.10.2
-- PHP Version: 5.5.3-1ubuntu2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lightwait`
--

-- --------------------------------------------------------

--
-- Table structure for table `Bases`
--

CREATE TABLE IF NOT EXISTS `Bases` (
  `base_id` int(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`base_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Bases`
--

INSERT INTO `Bases` (`base_id`, `name`, `available`) VALUES
(1, 'Chicken Strips', 1),
(2, 'Grilled Cheese', 1),
(3, 'Hamburger', 1),
(4, 'Turkey', 1),
(5, 'Chicken', 1),
(6, 'Veggie', 1),
(7, 'Black Bean', 1),
(8, 'Chicken For Salad', 1),
(9, 'Double Meat', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Breads`
--

CREATE TABLE IF NOT EXISTS `Breads` (
  `bread_id` int(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`bread_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Breads`
--

INSERT INTO `Breads` (`bread_id`, `name`, `available`) VALUES
(1, 'White', 1),
(2, 'Wheat', 1),
(3, 'Texas Toast', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Cheeses`
--

CREATE TABLE IF NOT EXISTS `Cheeses` (
  `cheese_id` int(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`cheese_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Cheeses`
--

INSERT INTO `Cheeses` (`cheese_id`, `name`, `available`) VALUES
(1, 'American', 1),
(2, 'Pepper Jack', 1),
(3, 'Swiss', 1),
(4, 'Extra Cheese', 1),
(5, 'No Cheese', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Employees`
--

CREATE TABLE IF NOT EXISTS `Employees` (
  `emp_id` int(30) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) DEFAULT NULL,
  `lName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE IF NOT EXISTS `Orders` (
  `order_id` int(30) NOT NULL AUTO_INCREMENT,
  `user_id` int(30) NOT NULL,
  `bread_id` int(30) NOT NULL,
  `base_id` int(30) NOT NULL,
  `cheese_id` int(30) DEFAULT '5',
  `hasFries` tinyint(1) DEFAULT '0',
  `timePlaced` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `timeFinished` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `bread_id` (`bread_id`),
  KEY `base_id` (`base_id`),
  KEY `cheese_id` (`cheese_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`order_id`, `user_id`, `bread_id`, `base_id`, `cheese_id`, `hasFries`, `timePlaced`, `timeFinished`, `isActive`) VALUES
(10, 789, 1, 3, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `OrderToppings`
--

CREATE TABLE IF NOT EXISTS `OrderToppings` (
  `order_id` int(30) NOT NULL DEFAULT '0',
  `topping_id` int(30) NOT NULL DEFAULT '0',
  PRIMARY KEY (`order_id`,`topping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `OrderToppings`
--

INSERT INTO `OrderToppings` (`order_id`, `topping_id`) VALUES
(8, 1),
(8, 4),
(8, 8),
(25, 2),
(25, 8),
(25, 9),
(86, 2),
(86, 4),
(86, 5),
(86, 7),
(789, 6),
(789, 8),
(835, 2),
(835, 3),
(835, 4),
(835, 5),
(976, 2),
(976, 7);

-- --------------------------------------------------------

--
-- Table structure for table `Toppings`
--

CREATE TABLE IF NOT EXISTS `Toppings` (
  `topping_id` int(30) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`topping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Toppings`
--

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

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` int(30) NOT NULL AUTO_INCREMENT,
  `fName` varchar(255) DEFAULT NULL,
  `lName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=977 ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`user_id`, `fName`, `lName`, `email`, `password`, `phoneNumber`) VALUES
(25, 'John', 'Pinkerton', 'jpink@poop.com', 'ding', '8795468253'),
(86, 'Jimmy', 'Devlin', 'jdevlin@ding.com', 'poop', '8796531523'),
(789, 'Ryan', 'Sligh', 'rsligh@sneaky.com', 'burgler', '2564532156'),
(835, 'Patrick', 'Leopard', 'pleopard@spots.com', 'grrr', '8256431589'),
(976, 'Joe', 'TheSaint', 'jsaint@holy.com', 'angel', '3958203958');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`),
  ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`bread_id`) REFERENCES `Breads` (`bread_id`),
  ADD CONSTRAINT `Orders_ibfk_3` FOREIGN KEY (`base_id`) REFERENCES `Bases` (`base_id`),
  ADD CONSTRAINT `Orders_ibfk_4` FOREIGN KEY (`cheese_id`) REFERENCES `Cheeses` (`cheese_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
