<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../Database.php';
		include_once '../models/Emf.php';

		$database = new Database();
        $db = $database->connect();

        $emf = new Emf($db);
        $result = $emf->read();

        $rows = $result->rowCount();

        if ($rows > 0) {
            $array = array();
            $array['data'] = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                
                $item = array(
                    'EMRID' => $EMRID,
                    'patientID' => $patientID,
                    'illness' => $illness,
                    'medication' => $medication,
                    'date' => $date,
                    'notes' => $notes
                );

                array_push($array['data'], $item);
            }
            echo json_encode($array, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(array('message' => 'No emr found.'));
        }
    } else {
        echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
    }
?>