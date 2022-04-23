<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../Database.php';
		include_once '../models/Parameters.php';

		$database = new Database();
        $db = $database->connect();

        $parameter = new Parameters($db);
        $result = $parameter->read();

        $rows = $result->rowCount();

        if ($rows > 0) {
            $array = array();
            $array['data'] = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                
                $item = array(
                    'animal' => $animal,
                    'bloodGlucoseBottom' => $bloodGlucoseBottom,
                    'bloodGlucoseTop' => $bloodGlucoseTop,
                    'heartRateBottom' => $heartRateBottom,
                    'heartRateTop' => $heartRateTop,
                    'bodyTempBottom' => $bodyTempBottom,
                    'bodyTempTop' => $bodyTempTop
                );

                array_push($array['data'], $item);
            }
            echo json_encode($array, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(array('message' => 'No parameters found.'));
        }
    } else {
        echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
    }
?>