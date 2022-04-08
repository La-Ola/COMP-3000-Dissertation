CREATE PROCEDURE `createEMF`(IN `patientID` INT, IN `illness` VARCHAR(25), IN `medication` VARCHAR(25), IN `date` DATE, IN `notes` VARCHAR(200)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER
BEGIN 
    INSERT INTO electronicmedicalfile (patientID, illness, medication, date, notes)
    VALUES (patientID, illness, medication, date, notes); 
    COMMIT;
END