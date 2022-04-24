DROP TABLE IF EXISTS bodyparameter;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS electronicmedicalfile;
DROP TABLE IF EXISTS patients;
DROP TABLE IF EXISTS owner;
DROP TABLE IF EXISTS vet;
--
-- Table structure for table `bodyparameter`
--

CREATE TABLE `bodyparameter` (
  `animal` VARCHAR(25) NOT NULL,
  `bloodGlucoseBottom` FLOAT NOT NULL,
  `bloodGlucoseTop` FLOAT NOT NULL,
  `heartRateBottom` INT(3) NOT NULL,
  `heartRateTop` INT(3) NOT NULL,
  `bodyTempBottom` FLOAT NOT NULL,
  `bodyTempTop` FLOAT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bodyparameter`
--

INSERT INTO `bodyparameter` (`animal`, `bloodGlucoseBottom`, `bloodGlucoseTop`, `heartRateBottom`, `heartRateTop`, `bodyTempBottom`, `bodyTempTop`) VALUES
('dog', 60, 111, 70, 120, 38, 39.5),
('cat', 80, 120, 120, 140, 37.8, 38.9),
('horse', 70, 135, 28, 40, 37.5, 38.5),
('rabBIT', 21.6, 541.8, 180, 350, 38.5, 40);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingID` INT(11) NOT NULL,
  `vetID` INT(11) NOT NULL,
  `patientID` INT(11) DEFAULT NULL,
  `bookingDate` DATETIME DEFAULT NULL,
  `reason` VARCHAR(200) DEFAULT NULL,
  `blocked` BIT(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `electronicmedicalfile`
--

CREATE TABLE `electronicmedicalfile` (
  `EMRID` INT(11) NOT NULL,
  `patientID` INT(11) NOT NULL,
  `illness` VARCHAR(25) DEFAULT NULL,
  `medication` VARCHAR(25) NOT NULL,
  `date` DATE NOT NULL,
  `notes` VARCHAR(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `owner`
--

CREATE TABLE `owner` (
  `ownerID` INT(11) NOT NULL,
  `owner_Username` VARCHAR(25) NOT NULL,
  `owner_Password` VARCHAR(80) NOT NULL,
  `owner_Fname` VARCHAR(25) NOT NULL,
  `owner_Sname` VARCHAR(25) NOT NULL,
  `owner_Mobile` VARCHAR(13) NOT NULL,
  `owner_Email` VARCHAR(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patientID` INT(11) NOT NULL,
  `ownerID` INT(11) NOT NULL,
  `patientName` VARCHAR(25) DEFAULT NULL,
  `DOB` DATE DEFAULT NULL,
  `sex` VARCHAR(6) DEFAULT NULL,
  `breed` VARCHAR(25) DEFAULT NULL,
  `species` VARCHAR(25) DEFAULT NULL,
  `neutered` VARCHAR(3) DEFAULT NULL,
  `microchip` INT(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vet`
--

CREATE TABLE `vet` (
  `vetID` INT(11) NOT NULL,
  `vet_Username` VARCHAR(45) NOT NULL,
  `vet_Password` VARCHAR(45) NOT NULL,
  `vet_FName` VARCHAR(45) NOT NULL,
  `vet_SName` VARCHAR(45) NOT NULL,
  `vet_Mobile` VARCHAR(45) NOT NULL,
  `vet_EMail` VARCHAR(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  MODIFY `bookingID` INT(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `electronicmedicalfile`
--
ALTER TABLE `electronicmedicalfile`
  MODIFY `EMRID` INT(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientID` INT(11) NOT NULL AUTO_INCREMENT;

--
-- ConstraINTs for dumped tables
--

--
-- ConstraINTs for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patients` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- ConstraINTs for table `electronicmedicalfile`
--
ALTER TABLE `electronicmedicalfile`
  ADD CONSTRAINT `electronicmedicalfile_ibfk_1` FOREIGN KEY (`patientID`) REFERENCES `patients` (`patientID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- ConstraINTs for table `patients`
--
ALTER TABLE `patients`
  ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`ownerID`) REFERENCES `owner` (`ownerID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
