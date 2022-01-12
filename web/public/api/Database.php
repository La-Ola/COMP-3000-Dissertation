<?php

    class Database {
        private $host = "localhost";
        private $user = "root";
        private $name = "familiar_systems";
        private $connection;


        public function connect() {

			$this->connection = null;

			try {
				$this->connection = new PDO('mysql:host=' . $this->host . '; dbname=' . $this->name, $this->user);
                echo "connect";
			} catch(PDOException $e) {
				echo 'Connection Error: ' . $e->getMessage();
			}

			return $this->connection;
		}
    }

?>