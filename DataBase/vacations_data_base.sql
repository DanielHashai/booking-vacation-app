-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 26, 2023 at 11:30 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations_data_base`
--

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(2, 127),
(2, 128),
(2, 131),
(2, 134),
(2, 135),
(2, 137),
(2, 140),
(3, 128),
(3, 131),
(3, 133),
(3, 135),
(3, 136),
(3, 137),
(3, 139),
(4, 128),
(4, 131),
(4, 132),
(4, 135),
(4, 136),
(4, 140),
(5, 127),
(5, 128),
(5, 131),
(5, 134),
(6, 127),
(6, 131),
(6, 132),
(6, 133),
(6, 137),
(6, 139);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Daniel', 'Hashai', 'aaronhashai@gmail.com', 'b733e96c0278ac6e2768fab892ed8e626681ba4f89b2107af2dfdf41df94514c4e3f028f14ef72efb3a251d66fc198891645afca0445598c9d79b7d003ed43b2', 'Admin'),
(2, 'Roee', 'Hashai', 'roeehashai@gmail.com', 'b733e96c0278ac6e2768fab892ed8e626681ba4f89b2107af2dfdf41df94514c4e3f028f14ef72efb3a251d66fc198891645afca0445598c9d79b7d003ed43b2', 'User'),
(3, 'Edan', 'Hashai', 'edanhashai@gmail.com', 'b733e96c0278ac6e2768fab892ed8e626681ba4f89b2107af2dfdf41df94514c4e3f028f14ef72efb3a251d66fc198891645afca0445598c9d79b7d003ed43b2', 'User'),
(4, 'Debby', 'Hashai', 'debbyhashai@gmail.com', 'b733e96c0278ac6e2768fab892ed8e626681ba4f89b2107af2dfdf41df94514c4e3f028f14ef72efb3a251d66fc198891645afca0445598c9d79b7d003ed43b2', 'User'),
(5, 'maytal', 'hashai', 'maytalHashai@gmail.com', '3a1af8d46c2afc580c2832a5da34343dc85bdf7a7a30d07b649787c3e5505dde964940adcb6b723f590a1e6161617f57aff6226581d1f000e7d41f68b817d805', 'User'),
(6, 'Yoni', 'Hashai', 'yoniHashai@gmail.com', 'ecaa45bd9d527097f2661f6c27fc551524d89494209e7e4be01b91239a287fd898f132ef82549065e18b6b4811d66b07229cfbab171c4f46d5ba2f3a4dffca7b', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageFile` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageFile`) VALUES
(127, 'America', 'Los Angeles', '2023-05-15', '2023-05-19', '100.00', 'e0e73744-7a93-4882-a398-012514ee5b07.jpeg'),
(128, 'Thailand', 'Beaches fun good vibes and party', '2023-02-08', '2023-03-08', '200.00', '27742077-bbb4-4d75-bd02-8c277467b136.jpeg'),
(131, 'England', 'A vacation in England can offer a diverse range of experiences, from exploring historical landmarks to immersing oneself in the vibrant cultural scene.', '2023-02-10', '2023-03-01', '1000.00', 'cdd8823f-2cce-494a-a800-5222e076f6d8.jpeg'),
(132, 'Netherlands', 'A vacation in Holland can offer a unique cultural experience, from exploring charming cities to cycling through picturesque countryside.', '2023-08-06', '2023-08-19', '800.00', '74c4be9a-b28d-4ddf-b38a-71fd6ef8b146.jpeg'),
(133, 'Israel', 'Israel is also home to natural wonders, such as the Dead Sea, the Sea of Galilee', '2023-04-09', '2023-04-19', '1500.00', 'ae132a67-e780-493f-a073-e679fdc59c69.jpeg'),
(134, 'Australia', ' Australia can offer a wide range of experiences, from exploring stunning natural landscapes to immersing oneself in the vibrant culture of its cities.', '2023-05-28', '2023-06-07', '2000.00', 'b48b70df-de30-468f-96be-22f47f5505a5.jpeg'),
(135, 'Germany', 'A vacation in Germany can offer a rich cultural experience, from exploring historical landmarks to enjoying local cuisine and festivals.', '2023-03-05', '2023-03-11', '1350.00', 'dcbe5cfb-4de6-4a56-b02b-2b1e4091d3b5.jpeg'),
(136, 'Canada', 'Canada can offer a diverse range of experiences, from exploring natural wonders to immersing oneself in the country\'s rich cultural scene. ', '2023-03-26', '2023-03-31', '600.00', 'f7ae4c6c-b910-40ac-aaea-59b6e3a7dad7.jpeg'),
(137, 'France', 'France is known for its rich cultural heritage, with a long history of art, music, literature, fashion, and cuisine.', '2023-04-23', '2023-04-30', '3000.00', 'c298d06b-ef9c-4b5e-a1bf-67904ce2f184.jpeg'),
(139, 'Sri Lanka', 'Sri Lanka has a rich and diverse culture that has been shaped by its long history and unique geography.', '2023-03-26', '2023-04-03', '5000.00', '2a6e68ff-6492-4313-9016-adca54c9c2df.jpeg'),
(140, 'Africa', 'A vacation in Africa can offer a variety of experiences, from exploring natural wonders to immersing oneself in the rich cultural traditions of its many diverse countries.', '2023-06-19', '2023-06-30', '4000.00', 'e7aa9004-fe0d-40b0-97a3-238db75a3177.jpeg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userId`,`vacationId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
