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
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `electronicmedicalfile`
--
ALTER TABLE `electronicmedicalfile`
  MODIFY `EMRID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patientID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

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
