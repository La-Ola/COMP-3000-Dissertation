<?php

    class Emf {
        private $connection;
        private $table = 'electronicmedicalfile';

        public $EMRID;
        public $patientID;
        public $illness;
        public $medication;
        public $date;
        public $notes;

        public function __construct($db) {
			$this->connection = $db;
		}

        public function create() {
			$query = 'CALL createEMF(:patientID, :illness, :medication, :date, :notes)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':patientID', $this->patientID);
			$command->bindParam(':illness', $this->illness);
			$command->bindParam(':medication', $this->medication);
			$command->bindParam(':date', $this->date);
			$command->bindParam(':notes', $this->notes);
			$command->execute();
		}

        public function delete() {
            $query = 'CALL deleteEMF(:id)';
            $command = $this->connection->prepare($query);
            $command->bindParam(':id', $this->EMRID);
            $command->execute();
        }

        public function read() {
            $query = 'SELECT * FROM ' . $this->table;
            $command = $this->connection->prepare($query);
            $command->execute();

            return $command;
        }
    }