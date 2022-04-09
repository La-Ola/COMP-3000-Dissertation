<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../Database.php';
		include_once '../models/Profile.php';

        $expected = ['patientName',	'DOB', 'sex', 'breed', 'species', 'neutered', 'microchip'];
        $missing = [];

		$database = new Database();
        $db = $database->connect();

        if (empty($_POST)) {
            $json = file_get_contents('php://input');
            $_POST = json_decode($json, true);
        }

        $profile = new Profile($db);
        $profile->patientName = isset($_POST['patientName']) ? $_POST['patientName'] : array_push($missing, 'patientName');
        $profile->DOB = isset($_POST['DOB']) ? $_POST['DOB'] : array_push($missing, 'DOB');
        $profile->sex = isset($_POST['sex']) ? $_POST['sex'] : array_push($missing, 'sex');
        $profile->breed = isset($_POST['breed']) ? $_POST['breed'] : array_push($missing, 'breed');
        $profile->species = isset($_POST['species']) ? $_POST['species'] : array_push($missing, 'species');
        $profile->neutered = isset($_POST['neutered']) ? $_POST['neutered'] : array_push($missing, 'neutered');
        $profile->microchip = isset($_POST['microchip']) ? $_POST['microchip'] : array_push($missing, 'microchip');

        if (empty($missing)) {
            $profile->create();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }

	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>