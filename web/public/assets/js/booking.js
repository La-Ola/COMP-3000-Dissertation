document.addEventListener('DOMContentLoaded', () => {

    //all global variables
    let datePicker = document.getElementById('date_picker');

    let timeBox = document.getElementsByClassName('timeBox');
    let bookableSlot = document.getElementById('booking slot');

    //on load, the page sets the date to today and makes days before today un-selectable.
    let today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    datePicker.value = today;
    datePicker.min = today;

    let bookedSlots = {};
    let blockedSlots = {};

    /**
     * @desc reads all bookings from table using xmlhttp request. sorts through booked slots and 
     * blocked slots (blocked slots are blocked by the vet). then it makes any time thats not available unselectable.
     * if its blocked it gets the name of blocked
     */
    let checkAvailability = function() {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                try {
                    let json = xhr.responseText.substring(7);
                    let bookings = JSON.parse(json).data;
                    let keys = Object.keys(bookings);

                    keys.map(key => {
                        if (bookings[key].blocked == 0) {
                            bookedSlots[bookings[key].bookingDate] = bookings[key];
                        } else {
                            blockedSlots[bookings[key].bookingDate] = bookings[key];
                        }
                    });

                    let keysOfBooked = Object.keys(bookedSlots);
                    keysOfBooked.map(key => {
                        let bookingDate = bookedSlots[key].bookingDate;

                        bookingDate = bookingDate.split(' ');
                        let bookingBlockDate = bookingDate[0];
                        let bookingBlockTime = bookingDate[1];
                        if (datePicker.value == bookingBlockDate) {
                            bookingBlockTime = bookingBlockTime.substring(0, bookingBlockTime.length - 3);
                            let  slot = document.getElementById(bookingBlockTime);
                            slot.classList.remove('timeBox');
                            slot.classList.add('unselectableTime');
                        }
                    });

                    let keysOfBlocked = Object.keys(blockedSlots);
                    keysOfBlocked.map(key => {
                        let bookingDate = blockedSlots[key].bookingDate;

                        bookingDate = bookingDate.split(' ');
                        let bookingBlockDate = bookingDate[0];
                        let bookingBlockTime = bookingDate[1];
                        if (datePicker.value == bookingBlockDate) {
                            bookingBlockTime = bookingBlockTime.substring(0, bookingBlockTime.length - 3);
                            let  slot = document.getElementById(bookingBlockTime);
                            slot.classList.remove('timeBox');
                            slot.classList.add('unselectableTime');
                            slot.name = 'blocked';
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
        xhr.open('GET', '../../api/booking/readAll.php?', true);
        xhr.send();
    }

    /**
     * @desc runs to check the days availabilty on document load
     */
    checkAvailability()

    /**
     * @desc gets time chosen from clickable time - adds selectable time to header and creates a card to be
     * filled with fillBookableForm.
     */
    let getTime = function(timeBox) {
        return function() {
            let chosenTime = timeBox.id;
            let chosenSlot = document.getElementById(chosenTime);
            chosenSlot.classList.add('active');

            splitDate = datePicker.value.split('-');
            theDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];

            bookableSlot.innerHTML = '';

            let header = document.createElement('div');
            header.classList.add('headerTimeCard');
            header.innerText = theDate + ' ' + chosenTime;

            let bookable = document.createElement('div');
            bookable.classList.add('bookingTimeCard');

            bookableSlot.append(header);
            bookableSlot.append(bookable);

            fillBookableForm(bookable, chosenSlot)

            setTimeout(function() {
                chosenSlot.classList.remove('active');
            }, 1500);
        }
    };

    /**
     * @desc loops through all time buttons and when clicked runs the getTime function
     */
    for (var i = 0, l = timeBox.length; l > i; i++) {
        timeBox[i].onclick = getTime(timeBox[i]);
    }

    /**
     * @desc this function fills the pop-up form depending on if it has been blocked, booked, or if its free.
     * @param {element} bookable 
     * @param {element} slot 
     */
    let fillBookableForm = function(bookable, slot) {
        if (slot.name == 'blocked') {
            //clear all html in the card and fill it with an unblock button to re-free the time
            bookable.innerHTML = '';

            let buttonContainer = document.createElement('div');
            buttonContainer.classList.add('container');

            let freeingButton = document.createElement('button');
            freeingButton.innerText = 'Unblock';
            buttonContainer.append(freeingButton);
            bookable.append(buttonContainer);

            /**
             * @desc when clicked it removes the blocked slot from the bookings table and re-check the page for
             * times available
             */
            freeingButton.addEventListener('click', function() {
                let keysOfBlocked = Object.keys(blockedSlots);
                keysOfBlocked.map(key => {
                    let bookingID = blockedSlots[key].bookingID;
                    let bookingDate = blockedSlots[key].bookingDate;

                    bookingDate = bookingDate.split(' ');
                    let bookingBlockDate = bookingDate[0];
                    let bookingBlockTime = bookingDate[1];
                    bookingBlockTime = bookingBlockTime.substring(0, bookingBlockTime.length - 3);

                    //only removes from table if both conditions are met, the correct date and time
                    if ((datePicker.value == bookingBlockDate) && (slot.id == bookingBlockTime)) {
                        let xhr = new XMLHttpRequest();
                        let body = {
                            bookingID: bookingID
                        };

                        xhr.addEventListener('readystatechange', function() {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                let notifier = new AWN();
                                try {
                                    if (xhr.status == 200) {
                                        notifier.success('Successfully Unblocked Booking');
                                    } else {
                                        notifier.alert('Has Not Unblocked Booking. Check Connection.');
                                    }
                                } catch (error) {
                                    console.log(error);
                                    notifier.alert('Has Not Unblocked Booking. Check Connection.');
                                }
                            }
                        });
                        xhr.open('DELETE', '../../api/booking/delete.php?', true);
                        xhr.send(JSON.stringify(body));
                        
                        slot.classList.remove('unselectableTime');
                        slot.classList.add('timeBox');
                        slot.name = '';
                        bookable.innerHTML = '';
                        fillBookableForm(bookable, slot)
                    }
                });
            });
        } else {
            /**
             * @desc if the time hasnt got the name 'blocked' it fills the card with inputboxes and
             * textareas for patientId and reason for booking
             */
            let patientInputContainer = document.createElement('div');
            let patientIDLabelClassifier = document.createElement('div');
            let patientIDLabel = document.createElement('span');
            let patientIDInput = document.createElement('input');
            patientInputContainer.classList.add('questionContainer');
            patientIDLabelClassifier.classList.add('questionLabel');
            patientIDInput.classList.add('inputBox');
            patientIDInput.id = 'PatientIDInput';
            patientIDInput.placeholder = 'Patient ID';
            patientIDLabel.innerHTML = '* Patient ID:';
            patientIDLabelClassifier.append(patientIDLabel);
            patientInputContainer.append(patientIDLabelClassifier);
            patientInputContainer.append(patientIDInput);

            let reasonInputContainer = document.createElement('div');
            let reasonIDInput = document.createElement('textarea');
            reasonInputContainer.classList.add('container');
            reasonIDInput.classList.add('inputBoxLarge');
            reasonIDInput.id = 'reasonInput';
            reasonIDInput.placeholder = 'Reason';
            reasonInputContainer.append(reasonIDInput);

            let buttonContainer = document.createElement('div');
            buttonContainer.classList.add('container');

            //appends containers holding labels input boxes/textareas, and buttons
            bookable.append(patientInputContainer);
            bookable.append(reasonInputContainer);
            bookable.append(buttonContainer);

            /**
             * @desc if the time is unselectable but not blocked, itll fill the input box and text area with the
             * booking information from the bookings table. it adds an update button and delete button
             */
            if (slot.classList.contains('unselectableTime') && slot.name != 'bookable') {
                for (const key in bookedSlots) {
                    if (bookedSlots.hasOwnProperty(key)) {
                        let bookingDate = key;

                        let date = datePicker.value;
                        let time = slot.id + ':00';
                        let dateTime = date + ' ' + time
                        if (dateTime == bookingDate) {
                            let bookingID = bookedSlots[key].bookingID;
                            let patientID = bookedSlots[key].patientID;
                            let reason = bookedSlots[key].reason;

                            patientIDInput.placeholder = patientID;
                            patientIDInput.value = patientID;
                            reasonIDInput.innerText = reason;

                            let updateButton = document.createElement('button');
                            updateButton.innerText = 'Update';
                            buttonContainer.append(updateButton);

                            let deleteButton = document.createElement('button');
                            deleteButton.innerText = 'Delete';
                            buttonContainer.append(deleteButton);

                            /**
                             * @desc allows vet to update the booking, whether that be the patient id or the reason for 
                             * the booking. updates the booking table
                             */
                            updateButton.addEventListener ('click', () => {
                                let xhr = new XMLHttpRequest();
                                let body = {
                                    bookingID: bookingID,
                                    patientID: patientIDInput.value,
                                    reason: reasonIDInput.value
                                };

                                xhr.addEventListener('readystatechange', function() {
                                    if (xhr.readyState === XMLHttpRequest.DONE) {
                                        let notifier = new AWN();
                                        try {
                                            if (xhr.status == 200) {
                                                notifier.success('Successfully Updated Booking');
                                                bookableSlot.innerHTML = '';
                                                checkAvailability()
                                            } else {
                                                notifier.alert('Has Not Updated Booking. Check Connection');
                                            }
                                        } catch (error) {
                                            console.log(error);
                                            notifier.alert('Has Not Updated Booking. Check Connection.');
                                        }
                                    }
                                });
                                xhr.open('PUT', '../../api/booking/update.php?', true);
                                xhr.send(JSON.stringify(body));
                                
                            });

                            /**
                             * @desc deletes the booking from table and re-checks the availability to update the
                             * time buttons, and then frees the current time button
                             */
                            deleteButton.addEventListener('click', () => {
                                let xhr = new XMLHttpRequest();
                                let body = {
                                    bookingID: bookingID
                                };

                                xhr.addEventListener('readystatechange', function() {
                                    if (xhr.readyState === XMLHttpRequest.DONE) {
                                        let notifier = new AWN();
                                        try {
                                            if (xhr.status == 200) {
                                                notifier.success('Successfully Deleted Booking');
                                                bookableSlot.innerHTML = '';
                                                checkAvailability()
                                            } else {
                                                notifier.alert('Has Not Deleted Booking. Check Connection.');
                                            }
                                        } catch (error) {
                                            console.log(error);
                                            notifier.alert('Has Not Deleted Booking. Check Connection.');
                                        }
                                    }
                                });
                                xhr.open('DELETE', '../../api/booking/delete.php?', true);
                                xhr.send(JSON.stringify(body));

                                freeButton(slot)
                            });
                        }
                    }
                }
            } else {
                /**
                 * @desc if the slot is free, add a submit button and a block button so the vet can block the time out
                 * or submit booking information
                 */
                let submitButton = document.createElement('button');
                submitButton.innerText = 'Submit';
                buttonContainer.append(submitButton);

                let blockingButton = document.createElement('button');
                blockingButton.innerText = 'Block Time';
                buttonContainer.append(blockingButton);

                /**
                 * @desc submits the time to the booking table as blocked, re-checks the availabilty of time buttons,
                 * it makes a freeing button available to revert the blocked time
                 */
                blockingButton.addEventListener('click', function() {
                    slot.classList.remove('timeBox');
                    slot.classList.add('unselectableTime');
                    slot.name = 'blocked';
                    bookable.innerHTML = '';

                    let buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('container');

                    let freeingButton = document.createElement('button');
                    freeingButton.innerText = 'Unblock';
                    buttonContainer.append(freeingButton);
                    bookable.append(buttonContainer);

                    let theSlot = slot.innerText + ':00';
                    let dateSelected = datePicker.value;
                    let formattedDateTime = dateSelected + ' ' + theSlot;

                    let xhr = new XMLHttpRequest();
                    let body = {
                        vetID: 1111,
                        bookingDate: formattedDateTime
                    };

                    xhr.addEventListener('readystatechange', function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            let notifier = new AWN();
                            try {
                                if (xhr.status == 200) {
                                    notifier.success('Successfully Blocked Booking From Patients');
                                } else {
                                    notifier.alert('Has Not Blocked Booking. Check Connection.');
                                }
                            } catch (error) {
                                console.log(error);
                                notifier.alert('Has Not Blocked Booking. Check Connection.');
                            }
                        }
                    });
                    xhr.open('POST', '../../api/booking/block.php?', true);
                    xhr.send(JSON.stringify(body));

                    checkAvailability()

                    /**
                     * @desc removes blocked time from table, makes the time button re-selectable
                     */
                    freeingButton.addEventListener('click', function() {
                        checkAvailability()
                        let keysOfBlocked = Object.keys(blockedSlots);
                        keysOfBlocked.map(key => {
                            let bookingID = blockedSlots[key].bookingID;
                            let bookingDate = blockedSlots[key].bookingDate;

                            bookingDate = bookingDate.split(' ');
                            let bookingBlockDate = bookingDate[0];
                            let bookingBlockTime = bookingDate[1];
                            bookingBlockTime = bookingBlockTime.substring(0, bookingBlockTime.length - 3);

                            //only removes from table if both conditions are met, the correct date and time
                            if ((datePicker.value == bookingBlockDate) && (slot.id == bookingBlockTime)) {
                                let xhr = new XMLHttpRequest();
                                let body = {
                                    bookingID: bookingID
                                };

                                xhr.addEventListener('readystatechange', function() {
                                    if (xhr.readyState === XMLHttpRequest.DONE) {
                                        let notifier = new AWN();
                                        try {
                                            if (xhr.status == 200) {
                                                notifier.success('Successfully Unblocked Booking');
                                            } else {
                                                notifier.alert('Has Not Unblocked Booking. Check Connection.');
                                            }
                                        } catch (error) {
                                            console.log(error);
                                            notifier.alert('Has Not Unblocked Booking. Check Connection.');
                                        }
                                    }
                                });
                                xhr.open('DELETE', '../../api/booking/delete.php?', true);
                                xhr.send(JSON.stringify(body));

                                window.location = window.location
                            }
                        });
                    });
                });

                /**
                 * @desc submit button creates a booking in the data base using patientID, booking time and date and
                 * reason for booking
                 */
                submitButton.addEventListener('click', function() {
                    let theSlot = slot.innerText + ':00';
                    let dateSelected = datePicker.value;
                    let formattedDateTime = dateSelected + ' ' + theSlot;

                    if (patientIDInput.value != '') {
                        slot.classList.remove('timeBox');
                        slot.classList.add('unselectableTime');

                        let xhr = new XMLHttpRequest();
                        let body = {
                            vetID: 1111,
                            patientID: patientIDInput.value,
                            bookingDate: formattedDateTime,
                            reason: reasonIDInput.value
                        };

                        xhr.addEventListener('readystatechange', function() {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                let notifier = new AWN();
                                try {
                                    if (xhr.status == 200) {
                                        bookableSlot.innerHTML = '';
                                        checkAvailability()
                                        notifier.success('Successfully Submitted Booking Information');
                                    } else {
                                        notifier.alert('Has Not Submitted Booking. Check Connection.');
                                    }
                                } catch (error) {
                                    console.log(error);
                                    notifier.alert('Has Not Submitted Booking. Check Connection.');
                                }
                            }
                        });
                        xhr.open('POST', '../../api/booking/create.php?', true);
                        xhr.send(JSON.stringify(body));
                    } else {
                        let notifier = new AWN();
                        notifier.alert('Please Enter Pet ID.');
                    }
                });
            }
        }

        /**
         * @desc makes a time button selectable again
         * @param {element} slot 
         */
        let freeButton = function(slot) {
            slot.classList.remove('unselectableTime');
            slot.classList.add('timeBox');

            checkAvailability()
        }
    }

    /**
     * @desc when the datepicker value changes, it makes all the time slots selectable again then re-checks
     * the availability for the new day selected.
     */
    datePicker.addEventListener('change', () => {
        let bookingCard = document.getElementsByClassName('bookingCard')[0];
        let childs = bookingCard.childElementCount;
        
        for (let i = 0; i < childs; i++) {
            let slot = bookingCard.children[i];
            slot.classList.remove('unselectableTime');
            slot.classList.add('timeBox');
        }
        checkAvailability()
    });

    /**
     * @desc checks local storage for font size selected and sets the active size button to
     * to a different colour.
     */
    if (localStorage.getItem('font') === 'small') {
		document.body.setAttribute('font-size', 'small');
        localStorage.setItem('font', 'small');
    } else if (localStorage.getItem('font') === 'large') { 
		document.body.setAttribute('font-size', 'large');
        localStorage.setItem('font', 'large');
    } else {
        document.body.removeAttribute('font-size');
        localStorage.removeItem('font');
    }

    /**
     * @desc checks local storage for page theme
     */
    if (localStorage.getItem("theme") === "dark") { 
		document.body.setAttribute("data-theme", "dark"); 
	} else { 
		document.body.removeAttribute("data-theme", "dark");
	}
});