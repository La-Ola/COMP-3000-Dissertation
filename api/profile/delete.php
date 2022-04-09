<?php
    header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../Database.php';
		include_once '../models/Profile.php';

        $expected = ['patientID'];
        $missing = [];

        $database = new Database();
        $db = $database->connect();

        $profile = new Profile($db);

        $input = json_decode(file_get_contents('php://input'), true);
        $profile->patientID = !empty($input['patientID']) ? $input['patientID'] : array_push($missing, 'patientID');

        if (empty($missing)) {
            $profile->delete();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }
    }
?>