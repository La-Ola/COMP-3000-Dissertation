<?php

    class Profile {
        private $connection;
        private $table = 'patients';

        public $patientID;
        public $ownerID;
        public $patientName;
        public $DOB;
        public $sex;
        public $breed;
        public $species;
        public $neutered;
        public $microchip;

        public function __construct($db) {
			$this->connection = $db;
		}

        public function create() {
			$query = 'CALL createPatient(:patientName, :DOB, :sex, :breed, :species, :neutered, :microchip)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':patientName', $this->patientName);
			$command->bindParam(':DOB', $this->DOB);
			$command->bindParam(':sex', $this->sex);
			$command->bindParam(':breed', $this->breed);
			$command->bindParam(':species', $this->species);
			$command->bindParam(':neutered', $this->neutered);
			$command->bindParam(':microchip', $this->microchip);
			$command->execute();
		}

        public function delete() {
            $query = 'CALL deleteBooking(:id)';
            $command = $this->connection->prepare($query);
            $command->bindParam(':id', $this->patientID);
            $command->execute();
        }

        public function read() {
            $query = 'SELECT * FROM ' . $this->table ;
            $command = $this->connection->prepare($query);
            $command->execute();

            return $command;
        }

        public function update() {
            $query = 'CALL updatePatient(:newPatientName, :newDOB, :newSex, :newBreed, :newSpecies, :newNeutered, :newChip)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':newPatientName', $this->patientName);
			$command->bindParam(':newDOB', $this->DOB);
			$command->bindParam(':newSex', $this->sex);
			$command->bindParam(':newBreed', $this->breed);
			$command->bindParam(':newSpecies', $this->species);
			$command->bindParam(':newNeutered', $this->neutered);
			$command->bindParam(':newChip', $this->microchip);
			$command->execute();
        }
    }

?>