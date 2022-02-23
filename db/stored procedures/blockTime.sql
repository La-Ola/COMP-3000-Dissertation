CREATE DEFINER=`root`@`localhost` PROCEDURE `blockTime` (IN `vetID` INT, IN `bookingDate` DATETIME)  NO SQL
BEGIN
	INSERT INTO booking (vetID, patientID, bookingDate, reason, blocked) VALUES (vetID, NULL, bookingDate, NULL, 1);
	COMMIT;
END