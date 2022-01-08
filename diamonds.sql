-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2022 at 02:50 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `diamonds`
--
CREATE DATABASE IF NOT EXISTS `diamonds` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `diamonds`;

-- --------------------------------------------------------

--
-- Table structure for table `diamonds`
--

CREATE TABLE `diamonds` (
  `carat` int(5) NOT NULL,
  `weight` int(5) NOT NULL,
  `cut` int(5) NOT NULL,
  `color` int(5) NOT NULL,
  `clarity` int(5) NOT NULL,
  `Id` int(5) NOT NULL,
  `price` int(5) NOT NULL,
  `categoryId` int(1) NOT NULL,
  `image` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `diamonds`
--

INSERT INTO `diamonds` (`carat`, `weight`, `cut`, `color`, `clarity`, `Id`, `price`, `categoryId`, `image`) VALUES
(1, 1, 1, 1, 1, 1, 1000, 1, 'd.jpg'),
(2, 2, 2, 2, 2, 2, 32000, 2, 'di.jpg'),
(3, 3, 3, 2, 2, 3, 108000, 4, 'dia.jpg'),
(2, 2, 2, 1, 1, 4, 8000, 1, 'diam.jpg'),
(2, 2, 2, 2, 1, 5, 16000, 1, 'diamo.jpg'),
(3, 3, 3, 2, 3, 6, 162000, 4, '1.jfif'),
(1, 3, 3, 3, 3, 7, 81000, 4, '2.jpg'),
(3, 3, 3, 3, 3, 8, 243000, 4, '3.jpg'),
(3, 1, 2, 1, 2, 9, 12000, 1, '4.jpg'),
(3, 2, 3, 1, 2, 10, 36000, 2, '5.jpg'),
(3, 3, 2, 2, 2, 11, 72000, 3, '6.jpg'),
(3, 3, 3, 2, 1, 12, 54000, 3, '7.jpg'),
(2, 3, 3, 3, 1, 13, 54000, 3, '8.jpg'),
(3, 2, 2, 2, 3, 14, 72000, 3, '9.jpg'),
(1, 3, 2, 3, 2, 15, 36000, 2, '10.jpg'),
(3, 3, 2, 2, 1, 16, 36000, 2, '11.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `userId` int(11) NOT NULL,
  `role` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `userId`, `role`) VALUES
('avicohen', 'avi123', 1, ''),
('Itamar', 'itamar123', 2, 'admin'),
('omri', 'omri123', 3, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diamonds`
--
ALTER TABLE `diamonds`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diamonds`
--
ALTER TABLE `diamonds`
  MODIFY `Id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
