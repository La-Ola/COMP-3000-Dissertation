CREATE DEFINER=`root`@`localhost` PROCEDURE `createPatient`(IN `patientName` VARCHAR(25), IN `DOB` DATE, IN `sex` VARCHAR(6), IN `breed` VARCHAR(25), IN `species` VARCHAR(25), IN `neutered` VARCHAR(3), IN `microchip` INT(11)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER 
BEGIN 
    INSERT INTO patients (ownerID, patientName, DOB, sex, breed, species, neutered, microchip)
    VALUES (1212, patientName, DOB, sex, breed, species, neutered, microchip); 
    COMMIT; 
END