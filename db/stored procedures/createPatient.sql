CREATE PROCEDURE `createPatient`(IN `patientName` VARCHAR(25), IN `DOB` DATE, IN `sex` VARCHAR(6), IN `breed` VARCHAR(25), IN `species` VARCHAR(25)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER 
BEGIN 
    INSERT INTO patients (ownerID, patientName, DOB, sex, breed, species) 
    VALUES (1212, patientName, DOB, sex, breed, species); 
    COMMIT; 
END