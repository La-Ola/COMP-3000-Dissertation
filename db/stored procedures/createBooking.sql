CREATE DEFINER=`root`@`localhost` PROCEDURE `createBooking` (IN `vetID` INTEGER, IN `patientID` INTEGER, IN `bookingDate` DATETIME, IN `reason` VARCHAR(200))  BEGIN
	INSERT INTO booking (vetID, patientID, bookingDate, reason, blocked) VALUES (vetID, patientID, bookingDate, reason, 0);
	COMMIT;
END