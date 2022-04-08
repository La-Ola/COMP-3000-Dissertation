<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		include_once '../Database.php';
		include_once '../models/Booking.php';

        $expected = ['bookingID', 'patientID', 'reason'];
        $missing = [];

		$database = new Database();
        $db = $database->connect();

        $input = json_decode(file_get_contents('php://input'), true);

        $booking = new Booking($db);
        $booking->bookingID = isset($input['bookingID']) ? $input['bookingID'] : array_push($missing, 'bookingID');
        $booking->patientID = isset($input['patientID']) ? $input['patientID'] : array_push($missing, 'patientID');
        $booking->reason = isset($input['reason']) ? $input['reason'] : array_push($missing, 'reason');

        if (empty($missing)) {
            $booking->update();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }

	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>