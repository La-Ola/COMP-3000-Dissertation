<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../Database.php';
		include_once '../models/Profile.php';

        $expected = ['patientID', 'patientName', 'DOB', 'sex', 'breed', 'species', 'neutered', 'microchip'];
        $missing = [];

		$database = new Database();
        $db = $database->connect();

        $input = json_decode(file_get_contents('php://input'), true);

        $profile = new Profile($db);
        $profile->patientID = isset($input['patientID']) ? $input['patientID'] : array_push($missing, 'patientID');
        $profile->patientName = isset($input['patientName']) ? $input['patientName'] : array_push($missing, 'patientName');
        $profile->DOB = isset($input['DOB']) ? $input['DOB'] : array_push($missing, 'DOB');
        $profile->sex = isset($input['sex']) ? $input['sex'] : array_push($missing, 'sex');
        $profile->breed = isset($input['breed']) ? $input['breed'] : array_push($missing, 'breed');
        $profile->species = isset($input['species']) ? $input['species'] : array_push($missing, 'species');
        $profile->neutered = isset($input['neutered']) ? $input['neutered'] : array_push($missing, 'neutered');
        $profile->microchip = isset($input['microchip']) ? $input['microchip'] : array_push($missing, 'microchip');

        if (empty($missing)) {
            $profile->update();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }

	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use PUT instead.'));
	}
?>