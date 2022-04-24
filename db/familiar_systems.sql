
--this is an export of the database containing all tables and stored prcedures
-- inludes pre-made owner and vet, and fills bodyparameter table sample



-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 23, 2022 at 12:43 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `familiar_systems`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `blockTime` (IN `vetID` INT, IN `bookingDate` DATETIME)  NO SQL
BEGIN
	INSERT INTO booking (vetID, patientID, bookingDate, reason, blocked) VALUES (vetID, NULL, bookingDate, NULL, 1);
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createBooking` (IN `vetID` INT, IN `patientID` INT, IN `bookingDate` DATETIME, IN `reason` VARCHAR(200))  BEGIN
	INSERT INTO booking (vetID, patientID, bookingDate, reason, blocked) VALUES (vetID, patientID, bookingDate, reason, 0);
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createEMF` (IN `patientID` INT, IN `illness` VARCHAR(25), IN `medication` VARCHAR(25), IN `date` DATE, IN `notes` VARCHAR(200))  NO SQL
BEGIN
	INSERT INTO electronicmedicalfile (patientID, illness, medication, date, notes) VALUES (patientID, illness, medication, date, notes);
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `createPatient` (IN `patientName` VARCHAR(25), IN `DOB` DATE, IN `sex` VARCHAR(6), IN `breed` VARCHAR(25), IN `species` VARCHAR(25), IN `neutered` VARCHAR(3), IN `microchip` INT(11))  NO SQL
BEGIN
	INSERT INTO patients (ownerID, patientName, DOB, sex, breed, species, neutered, microchip) VALUES (1212, patientName, DOB, sex, breed, species, neutered, microchip);
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteBooking` (IN `id` INT)  NO SQL
BEGIN
	DELETE FROM booking
    WHERE bookingID = id;
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteEMF` (IN `id` INT)  NO SQL
BEGIN
	DELETE FROM electronicmedicalfile
    WHERE EMRID = id;
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `deletePatient` (IN `id` INT)  NO SQL
BEGIN
	DELETE FROM patients
    WHERE patientID = id;
	COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `readEMF` (IN `id` INT)  NO SQL
BEGIN
	SELECT * FROM electronicmedicalfile
    WHERE patientID = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updateBooking` (IN `id` INT, IN `newPatientID` INT, IN `newReason` VARCHAR(200))  NO SQL
BEGIN
	UPDATE booking SET patientID = newPatientID WHERE bookingID = id;
    UPDATE booking SET reason = newReason WHERE bookingID = id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `updatePatient` (IN `id` INT, IN `newPatientName` VARCHAR(25), IN `newDOB` DATE, IN `newSex` VARCHAR(6), IN `newBreed` VARCHAR(25), IN `newSpecies` VARCHAR(25), IN `newNeutered` VARCHAR(3), IN `newChip` INT(11))  NO SQL
BEGIN
	UPDATE patients SET patientName = newPatientName 	WHERE patientID = id;
    UPDATE patients SET DOB = newDOB WHERE patientID = id;
    UPDATE patients SET sex = newSex WHERE patientID = id;
    UPDATE patients SET breed = newBreed WHERE patientID = id;
    UPDATE patients SET species = newSpecies WHERE patientID = id;
    UPDATE patients SET neutered = newNeutered WHERE patientID = id;
    UPDATE patients SET microchip = newChip WHERE patientID = id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `bodyparameter`
--

CREATE TABLE `bodyparameter` (
  `animal` varchar(25) NOT NULL,
  `bloodGlucoseBottom` float NOT NULL,
  `bloodGlucoseTop` float NOT NULL,
  `heartRateBottom` int(3) NOT NULL,
  `heartRateTop` int(3) NOT NULL,
  `bodyTempBottom` float NOT NULL,
  `bodyTempTop` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bodyparameter`
--

INSERT INTO `bodyparameter` (`animal`, `bloodGlucoseBottom`, `bloodGlucoseTop`, `heartRateBottom`, `heartRateTop`, `bodyTempBottom`, `bodyTempTop`) VALUES
('dog', 60, 111, 70, 120, 38, 39.5),
('cat', 80, 120, 120, 140, 37.8, 38.9),
('horse', 70, 135, 28, 40, 37.5, 38.5),
('rabbit', 21.6, 541.8, 180, 350, 38.5, 40);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingID` int(11) NOT NULL,
  `vetID` int(11) NOT NULL,
  `patientID` int(11) DEFAULT NULL,
  `bookingDate` datetime DEFAULT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `blocked` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `electronicmedicalfile`
--

CREATE TABLE `electronicmedicalfile` (
  `EMRID` int(11) NOT NULL,
  `patientID` int(11) NOT NULL,
  `illness` varchar(25) DEFAULT NULL,
  `medication` varchar(25) NOT NULL,
  `date` date NOT NULL,
  `notes` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `ownerID` int(11) NOT NULL,
  `owner_Username` varchar(25) NOT NULL,
  `owner_Password` varchar(80) NOT NULL,
  `owner_Fname` varchar(25) NOT NULL,
  `owner_Sname` varchar(25) NOT NULL,
  `owner_Mobile` varchar(13) NOT NULL,
  `owner_Email` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `owner`
--

INSERT INTO `owner` (`ownerID`, `owner_Username`, `owner_Password`, `owner_Fname`, `owner_Sname`, `owner_Mobile`, `owner_Email`) VALUES
(1212, 'anOwner', 'iAmAnOwner9090', 'samuel', 'azur', '01212101101', 'anOwner@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patientID` int(11) NOT NULL,
  `ownerID` int(11) NOT NULL,
  `patientName` varchar(25) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `sex` varchar(6) DEFAULT NULL,
  `breed` varchar(25) DEFAULT NULL,
  `species` varchar(25) DEFAULT NULL,
  `neutered` varchar(3) DEFAULT NULL,
  `microchip` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vet`
--

CREATE TABLE `vet` (
  `vetID` int(11) NOT NULL,
  `vet_Username` varchar(45) NOT NULL,
  `vet_Password` varchar(45) NOT NULL,
  `vet_FName` varchar(45) NOT NULL,
  `vet_SName` varchar(45) NOT NULL,
  `vet_Mobile` varchar(45) NOT NULL,
  `vet_EMail` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vet`
--

INSERT INTO `vet` (`vetID`, `vet_Username`, `vet_Password`, `vet_FName`, `vet_SName`, `vet_Mobile`, `vet_EMail`) VALUES
(1111, 'bestVet', 'bvet1111', 'Roselyn', 'Skinner', '07868464685', 'bestVet@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingID`),
  ADD UNIQUE KEY `bookingID` (`bookingID`),
  ADD KEY `vetID` (`vetID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `electronicmedicalfile`
--
ALTER TABLE `electronicmedicalfile`
  ADD PRIMARY KEY (`EMRID`),
  ADD UNIQUE KEY `EMRID` (`EMRID`),
  ADD KEY `patientID` (`patientID`);

--
-- Indexes for table `owner`
--
ALTER TABLE `owner`
  ADD PRIMARY KEY (`ownerID`),
  ADD UNIQUE KEY `ownerID` (`ownerID`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patientID`),
  ADD UNIQUE KEY `patientID` (`patientID`),
  ADD KEY `patients_ibfk_1` (`ownerID`);

--
-- Indexes for table `vet`
--
ALTER TABLE `vet`
  ADD PRIMARY KEY (`vetID`),
  ADD UNIQUE KEY `vetID` (`vetID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `electronicmedicalfile`
--
ALTER TABLE `electronicmedicalfile`
  MODIFY `EMRID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patients` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `electronicmedicalfile`
--
ALTER TABLE `electronicmedicalfile`
  ADD CONSTRAINT `electronicmedicalfile_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patients` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `owner` (`ownerID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
