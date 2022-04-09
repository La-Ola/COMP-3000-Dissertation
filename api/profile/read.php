<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../Database.php';
		include_once '../models/Profile.php';

		$database = new Database();
        $db = $database->connect();

        $profile = new Profile($db);
        $result = $profile->read();

        $rows = $result->rowCount();

        if ($rows > 0) {
            $array = array();
            $array['data'] = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                
                $item = array(
                    'patientID' => $patientID,
                    'patientName' => $patientName,
                    'DOB' => $DOB,
                    'sex' => $sex,
                    'breed' => $breed,
                    'species' => $species,
                    'neutered' => $neutered, 
                    'microchip' => $microchip
                );

                array_push($array['data'], $item);
            }
            echo json_encode($array, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(array('message' => 'No questions found.'));
        }
    } else {
        echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
    }
?>