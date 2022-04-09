<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		include_once '../Database.php';
		include_once '../models/Booking.php';

		$database = new Database();
        $db = $database->connect();

        $booking = new Booking($db);
        $result = $booking->readAll();

        $rows = $result->rowCount();

        if ($rows > 0) {
            $array = array();
            $array['data'] = array();

            while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                
                $item = array(
                    'bookingID' => $bookingID,
                    'vetID' => $vetID,
                    'patientID' => $patientID,
                    'bookingDate' => $bookingDate,
                    'reason' => $reason,
                    'blocked' => $blocked
                );

                array_push($array['data'], $item);
            }
            echo json_encode($array, JSON_PRETTY_PRINT);
        } else {
            echo json_encode(array('message' => 'No bookings found.'));
        }
    } else {
        echo json_encode(array('message' => 'Wrong HTTP request method. Use GET instead.'));
    }
?>