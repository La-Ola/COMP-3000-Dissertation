<?php

class Parameters {
    private $connection;
    private $table = 'bodyparameter';

    public $animal;
    public $bloodGlucoseBottom;
    public $bloodGlucoseTop;
    public $heartRateBottom;
    public $heartRateTop;
    public $bodyTempBottom;
    public $bodyTempTop;

    public function __construct($db) {
        $this->connection = $db;
    }

    public function read() {
        $query = 'SELECT * FROM ' . $this->table;
        $command = $this->connection->prepare($query);
        $command->execute();

        return $command;
    }
}

?>