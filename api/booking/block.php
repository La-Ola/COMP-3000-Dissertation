<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		include_once '../Database.php';
		include_once '../models/Booking.php';

        $expected = ['vetID', 'bookingDate'];
        $missing = [];

		$database = new Database();
        $db = $database->connect();

        if (empty($_POST)) {
            $json = file_get_contents('php://input');
            $_POST = json_decode($json, true);
        }

        $booking = new Booking($db);
        $booking->vetID = isset($_POST['vetID']) ? $_POST['vetID'] : array_push($missing, 'vetID');
        $booking->bookingDate = isset($_POST['bookingDate']) ? $_POST['bookingDate'] : array_push($missing, 'bookingDate');

        if (empty($missing)) {
            $booking->block();
        } else {
            die(json_encode(array('expected' => $expected, 'missing' => $missing), JSON_PRETTY_PRINT));
        }

	} else {
		echo json_encode(array('message' => 'Wrong HTTP request method. Use POST instead.'));
	}
?>