<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../Database.php';
		include_once '../models/Emf.php';

        $expected = ['patientID', 'illness', 'medication', 'date', 'notes'];
        $missing = [];

		$database = new Database();
        $db = $database->connect();

        if (empty($_POST)) {
            $json = file_get_contents('php://input');
            $_POST = json_decode($json, true);
        }

        $emf = new Emf($db);
        $emf->patientID = isset($_POST['patientID']) ? $_POST['patientID'] : array_push($missing, 'patientID');
        $emf->illness = isset($_POST['illness']) ? $_POST['illness'] : array_push($missing, 'illness');
        $emf->medication = isset($_POST['medication']) ? $_POST['medication'] : array_push($missing, 'medication');
        $emf->date = isset($_POST['date']) ? $_POST['date'] : array_push($missing, 'date');
        $emf->notes = isset($_POST['notes']) ? $_POST['notes'] : array_push($missing, 'notes');

        if (empty($missing)) {
            $emf->create();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }

	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>