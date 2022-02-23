CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteBooking` (IN `id` INT)  NO SQL
BEGIN
	DELETE FROM booking
    WHERE bookingID = id;
	COMMIT;
END