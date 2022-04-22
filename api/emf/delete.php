<?php
    header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../Database.php';
		include_once '../models/Emf.php';

        $expected = ['EMRID'];
        $missing = [];

        $database = new Database();
        $db = $database->connect();

        $emf = new Emf($db);

        $input = json_decode(file_get_contents('php://input'), true);
        $emf->EMRID = !empty($input['EMRID']) ? $input['EMRID'] : array_push($missing, 'EMRID');

        if (empty($missing)) {
            $emf->delete();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }
    }
?>