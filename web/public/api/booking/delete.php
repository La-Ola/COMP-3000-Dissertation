<?php
    header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
		include_once '../Database.php';
		include_once '../models/Booking.php';

        $expected = ['bookingID'];
        $missing = [];

        $database = new Database();
        $db = $database->connect();

        $booking = new Booking($db);

        $input = json_decode(file_get_contents('php://input'), true);
        $booking->bookingID = !empty($input['bookingID']) ? $input['bookingID'] : array_push($missing, 'bookingID');

        if (empty($missing)) {
            $booking->delete();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }
    }
?>