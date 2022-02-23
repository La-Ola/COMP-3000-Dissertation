CREATE DEFINER=`root`@`localhost` PROCEDURE `updateBooking` (IN `id` INT, IN `newPatientID` INT, IN `newReason` VARCHAR(200))  NO SQL
BEGIN
	UPDATE booking SET patientID = newPatientID WHERE bookingID = id;
    UPDATE booking SET reason = newReason WHERE bookingID = id;
END