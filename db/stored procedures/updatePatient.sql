CREATE PROCEDURE `updatePatient`(IN `id` INT, IN `newPatientName` VARCHAR(25), IN `newDOB` DATE, IN `newSex` VARCHAR(6), IN `newBreed` VARCHAR(25), IN `newSpecies` VARCHAR(25), IN `newNeutered` VARCHAR(3), IN `newChip` INT(11)) NOT DETERMINISTIC NO SQL SQL SECURITY DEFINER 
BEGIN 
    UPDATE patients SET patientName = newPatientName 
    WHERE patientID = id; 
    UPDATE patients SET DOB = newDOB 
    WHERE patientID = id; 
    UPDATE patients SET sex = newSex 
    WHERE patientID = id; 
    UPDATE patients SET breed = newBreed 
    WHERE patientID = id; 
    UPDATE patients SET species = newSpecies 
    WHERE patientID = id; 
    UPDATE patients SET neutered = newNeutered 
    WHERE patientID = id; 
    UPDATE patients SET microchip = newChip 
    WHERE patientID = id; 
END