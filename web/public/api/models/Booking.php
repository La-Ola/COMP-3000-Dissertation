<?php

    class Booking {
        private $connection;
        private $table = 'booking';

        public $bookingID;
        public $vetID;
        public $patientID;
        public $bookingDate;
        public $reason;
        public $blocked;

        public function __construct($db) {
			$this->connection = $db;
		}

        public function block() {
            $query = 'CALL blockTime(:vetID, :bookingDate)';
            $command = $this->connection->prepare($query);
            $command->bindParam(':vetID', $this->vetID);
            $command->bindParam(':bookingDate', $this->bookingDate);
            $command->execute();
        }

        public function create() {
			$query = 'CALL createBooking(:vetID, :patientID, :bookingDate, :reason)';
			$command = $this->connection->prepare($query);
			$command->bindParam(':vetID', $this->vetID);
			$command->bindParam(':patientID', $this->patientID);
			$command->bindParam(':bookingDate', $this->bookingDate);
			$command->bindParam(':reason', $this->reason);
			$command->execute();
		}

        public function readAll() {
            $query = 'SELECT * FROM ' . $this->table;
            $command = $this->connection->prepare($query);
            $command->execute();

            return $command;
        }
    }

?>