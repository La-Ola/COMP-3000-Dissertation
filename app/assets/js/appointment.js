document.addEventListener('DOMContentLoaded', () => {
    //all global variables required
    let table = document.getElementById('bookingTable');
    let datePicker = document.getElementById('datePicker');
    let tableSlot = document.getElementById('timeSelector');

    let timeBox = document.getElementsByClassName('timeBox');
    let bookableSlot = document.getElementById('bookingSlot');

    let bookButton = document.getElementById('book');

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
     * @desc uses results from xmlhttp request to make timeslots unselectable when they are booked or blocked.
     * @param {object} bookings
     * @param {object keys} keys
     */
    let fillBookedBlockedSlots = (bookings, keys) => {
        //loops through keys and sorts booked and blocked slots
        keys.map(key => {
            if (bookings[key].blocked == 0) {
                bookedSlots[bookings[key].bookingDate] = bookings[key];
            } else {
                blockedSlots[bookings[key].bookingDate] = bookings[key];
            }
        });

        //makes booked/blocked slots unselectable
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
    }

    /**
     * @desc uses input patientID to find the name of the booked patient
     * @param {integer} patientID
     */
    let addPatientName = (patientID, c4) => {
        let stringKeys = localStorage.getItem('profileKeys');
        let keys = JSON.parse(stringKeys);

        let stringPatients = localStorage.getItem('profilePatients');
        let patients = JSON.parse(stringPatients);

        keys.map(key => {
            if (patientID == patients[key].patientID) {
                c4.innerHTML = patients[key].patientName;
            }
        })
    }

    /**
     * @desc fills the table with the appointments, information taken from bookings table and patients table
     * @param {object} bookedSlots 
     */
    let fillAppointments = (bookedSlots) => {
        let keysOfBooked = Object.keys(bookedSlots).sort();
        keysOfBooked.map(key => {
            let monthFunction = function(m) {
                if (m < 10) {
                    m = '0' + m.toString();
                }
                return (m);
            }
            let now = new Date();
            let miniMonth = now.getMonth() + 1;
            let current = now.getFullYear() + '-' + (monthFunction(miniMonth)) + '-' + '0' + now.getDate();

            let bookingDate = bookedSlots[key].bookingDate;
            bookingDate = bookingDate.split(' ');
            let bookingBlockDate = bookingDate[0];
            let bookingBlockTime = bookingDate[1];
            if (current <= bookingBlockDate) {
                let patientID = bookedSlots[key].patientID;

                let splitDate = bookingBlockDate.split('-');
                let year = splitDate[0];
                let month = splitDate[1];
                let sday = splitDate[2];

                let row = document.createElement('tr');
                row.innerHTML = '';

                let c1 = document.createElement('td');
                let jsDay = new Date(year, month, sday)
                let dayNum = jsDay.getDay();
                let days = ['Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
                let day = days[dayNum];
                c1.innerHTML = day;
                let c2 = document.createElement('td');
                c2.innerHTML = bookingBlockDate;
                let c3 = document.createElement('td');
                c3.innerHTML = bookingBlockTime;
                let c4 = document.createElement('td');

                let c5 = document.createElement('td');
                let deleteButton = document.createElement('button');
                deleteButton.classList.add('binButton');
                deleteButton.innerHTML = '<svg class="binButtonSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>';
                c5.append(deleteButton);

                addPatientName(patientID, c4)

                row.append(c1);
                row.append(c2);
                row.append(c3);
                row.append(c4);

                if (navigator.onLine) {
                    row.append(c5);
                    deleteButton.addEventListener('click', () => {
                        let xhr = new XMLHttpRequest();
                        let body = {
                            bookingID: bookedSlots[key].bookingID
                        };

                        xhr.addEventListener('readystatechange', function() {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                let notifier = new AWN();
                                try {
                                    if (xhr.status == 200) {
                                        notifier.success('Successfully Unblocked Booking');
                                    } else {
                                        notifier.alert('Has Not Deleted Booking. Check Connection.');
                                    }
                                } catch (error) {
                                    console.log(error);
                                    notifier.alert('Has Not Deleted Booking. Check Connection.');
                                }
                            }
                        });
                        xhr.open('DELETE', '../api/booking/delete.php?', true);
                        xhr.send(JSON.stringify(body));

                        window.location = window.location;
                    });
                }

                table.append(row);
            }
        });
    }

    /**
     * @desc fills appointments table with all appointments from the day of viewing and onwards. 
     * gets information from xmlhttprequests.
     */
    let appointments = function() {
        table.innerHTML = '';
        let firstRow = document.createElement('tr');

        let head1 = document.createElement('th');
        head1.innerText = 'Day';
        let head2 = document.createElement('th');
        head2.innerText = 'Date';
        let head3 = document.createElement('th');
        head3.innerText = 'Time';
        let head4 = document.createElement('th');
        head4.innerText = 'Pet';

        firstRow.append(head1);
        firstRow.append(head2);
        firstRow.append(head3);
        firstRow.append(head4);

        table.append(firstRow);

        fillAppointments(bookedSlots)
    }

    appointments();

    /**
     * @desc checks local storage for font size and sets font size for page
     */
    if (localStorage.getItem('font') === 'small') {
        document.body.setAttribute('font-size', 'small');
        localStorage.setItem('font', 'small');
        appointments()
    } else if (localStorage.getItem('font') === 'large') { 
        document.body.setAttribute('font-size', 'large');
        localStorage.setItem('font', 'large');
    } else {
        document.body.removeAttribute('font-size');
        localStorage.removeItem('font');
    }

    /**
     * @desc checks local storage for theme of page and sets the theme
     */
    if (localStorage.getItem('theme') === 'dark') { 
        document.body.setAttribute('data-theme', 'dark'); 
    } else { 
        document.body.removeAttribute('data-theme', 'dark');
    }

    //if offline, runs the first part of the if statement.
    //if online the statement runs the xmlhttp requests
    if (!navigator.onLine) {
        bookButton.classList.add('hidden');

        let stringBookedSlots = localStorage.getItem('bookedSlots');
        let gotBookedSlots = JSON.parse(stringBookedSlots);
        fillAppointments(gotBookedSlots)
    } else {
        /**
         * @desc book button activated on click, shows table with booking slots. 
         * on second click, hides the booking table
         */
        bookButton.addEventListener('click', () => {
            if (bookButton.innerText == 'Book Appointment') {
                tableSlot.classList.remove('hidden');
                bookButton.innerText = 'Close Appointment';
            } else {
                tableSlot.classList.add('hidden');
                bookButton.innerText = 'Book Appointment';
                bookableSlot.innerHTML = '';
            }
        });

        /**
         * @desc this function does a request to check for bookings and blocked slots. 
         * then makes the unavailable time non-selectable
         */
        let checkAvailability = function() {
            return new Promise((resolve, reject) => {
                try {
                    bookableSlot.innerHTML = '';
                    let xhr = new XMLHttpRequest();
                    xhr.addEventListener('readystatechange', function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            try {
                                let json = xhr.responseText.substring(7);
                                let bookings = JSON.parse(json).data;
                                let keys = Object.keys(bookings);

                                fillBookedBlockedSlots(bookings, keys);

                                resolve();
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
                    xhr.open('GET', '../api/booking/readAll.php?', true);
                    xhr.send();
                } catch(error) {
                    console.log(error);
                    reject(error);
                }
            });
        }

        //runs checkAvailability on document load
        checkAvailability();

        /**
         * @desc gets the id of clicked timebox and makes it appear active. then creates a card to book appointment
         * runs the function 'fillBookableForm'.
         */
        let getTime = function(timeBox) {
            return function() {
                let chosenTime = timeBox.id;
                let chosenSlot = document.getElementById(chosenTime);
                chosenSlot.classList.add('active');

                let splitDate = datePicker.value.split('-');
                let theDate = splitDate[2] + '/' + splitDate[1] + '/' + splitDate[0];

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
        }

        /**
         * @desc loops through all timebox elements, and when it gets clicked runs the getTime function
         */
        let l = timeBox.length;
        for (let i = 0; l > i; i++) {
            timeBox[i].onclick = getTime(timeBox[i]);
        }

        /**
         * @desc reads profiles from table and stores the information in local storage
         */
        let readProfile = () => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    try {
                        let json = xhr.responseText.substring(7);
                        let patients = JSON.parse(json).data;
                        let keys = Object.keys(patients);

                        localStorage.setItem('profileKeys', JSON.stringify(keys));
                        localStorage.setItem('profilePatients', JSON.stringify(patients));
                        
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
            xhr.open('GET', '../api/profile/read.php?', true);
            xhr.send();
        }

        //runs readProfile function
        readProfile()

        /**
         * @desc read all bookings, stores data in local storage and fills out appointments table
         */
        let readBooking = () => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('readystatechange', function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    try {
                        localStorage.setItem('bookedSlots', JSON.stringify(bookedSlots));

                        fillAppointments(bookedSlots)

                    } catch (error) {
                        console.log(error);
                    }
                }
            });
            xhr.open('GET', '../api/booking/readAll.php?', true);
            xhr.send();
        }

        //runs readBooking function
        readBooking()

        /**
         * @desc creates a box to enter information about bookings. the first section enters owners pets into a drop
         * down for easy selection.
         * 
         * submit button performs xmlhttp request sets booking using selected pet name, and makes timeslot unselectable.
         */
        let fillBookableForm = function(bookable, slot) {
            if (slot.classList.contains('unselectableTime')) {
                bookableSlot.innerHTML = '';
                let notifier = new AWN();
                notifier.alert('This time is in use');
            } else {
                let ddContainer = document.createElement('div');
                ddContainer.id = 'dd-container';
                ddContainer.classList.add('ddContainer');

                let ddButton = document.createElement('button');
                ddButton.id = 'dropdown-button';
                ddButton.classList.add('dropdownButton');
                ddButton.innerText = 'Pet';

                let caretContainer = document.createElement('div');
                caretContainer.classList.add('caretContainer');

                let caretLSpan = document.createElement('span');
                caretLSpan.classList.add('leftCaret');

                let caretRSpan = document.createElement('span');
                caretRSpan.classList.add('rightCaret');

                caretContainer.append(caretLSpan);
                caretContainer.append(caretRSpan);

                let ddContent = document.createElement('div');
                ddContent.classList.add('hidden');

                let xhr = new XMLHttpRequest();
                xhr.addEventListener('readystatechange', function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        try {
                            let json = xhr.responseText.substring(7);
                            let patients = JSON.parse(json).data;
                            let keys = Object.keys(patients);

                            keys.map(key => {
                                let name = patients[key].patientName;
                                let petId = patients[key].patientID;

                                let dropdown = document.createElement('a');
                                
                                dropdown.innerText = name;
                                dropdown.id = petId;

                                ddContent.append(dropdown);

                                dropdown.addEventListener('click', function() {
                                    ddButton.innerText = name;
                                    ddContent.classList.add('hidden');
                                    ddButton.classList.remove('dropdownButtonRadius');

                                    let caretContainer = document.createElement('div');
                                    caretContainer.classList.add('caretContainer');
                                    let rightCaret = document.createElement('span');
                                    rightCaret.classList.add('rightCaret');

                                    let leftCaret = document.createElement('span');
                                    leftCaret.classList.add('leftCaret');

                                    caretContainer.appendChild(leftCaret);
                                    caretContainer.appendChild(rightCaret);
                                    ddButton.appendChild(caretContainer);

                                    submitButton.addEventListener('click', function() {
                                        let theSlot = slot.innerText + ':00';
                                        let dateSelected = datePicker.value;
                                        let formattedDateTime = dateSelected + ' ' + theSlot;

                                        slot.classList.remove('timeBox');
                                        slot.classList.add('unselectableTime');

                                        try {
                                            let xhr = new XMLHttpRequest();
                                            let body = {
                                                vetID: 1111,
                                                patientID: dropdown.id,
                                                bookingDate: formattedDateTime,
                                                reason: reasonIDInput.value
                                            };

                                            xhr.addEventListener('readystatechange', async function() {
                                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                                    let notifier = new AWN();
                                                    try {
                                                        if (xhr.status == 200) {
                                                            notifier.success('Successfully Submitted Booking Information');
                                                            tableSlot.classList.add('hidden');
                                                            bookButton.innerText = 'Book Appointment';
                                                            bookableSlot.innerHTML = '';
                                                            await checkAvailability()
                                                            appointments()
                                                        } else {
                                                            notifier.alert('Has Not Submitted Booking. Check Connection.');
                                                        }
                                                    } catch (error) {
                                                        console.log(error);
                                                        notifier.alert('Has Not Submitted Booking. Check Connection.');
                                                    }
                                                }
                                            });

                                            xhr.addEventListener('error', (error) => {
                                                console.log(error);
                                            })

                                            xhr.open('POST', '../api/booking/create.php?', true);
                                            xhr.send(JSON.stringify(body));
                                        } catch(error) {
                                            console.log(error);
                                        }
                                    });
                                })
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    }
                });
                xhr.open('GET', '../api/profile/read.php?', true);
                xhr.send();

                ddButton.append(caretContainer);
                ddContainer.append(ddButton);
                ddContainer.append(ddContent);

                //shows drop down on click
                ddButton.addEventListener('click', function() {
                    if (ddContent.classList.contains('hidden')) {
                        ddContent.classList.remove('hidden');
                        ddContent.classList.add('dropdownContent');
                        ddButton.classList.add('dropdownButtonRadius');
                    }
                    else {
                        ddContent.classList.add('hidden');
                        ddButton.classList.remove('dropdownButtonRadius');
                    }
                });

                let reasonInputContainer = document.createElement('div');
                let reasonIDInput = document.createElement('textarea');
                reasonInputContainer.classList.add('container');
                reasonIDInput.classList.add('inputBoxLarge');
                reasonIDInput.id = 'reasonInput';
                reasonIDInput.placeholder = 'Reason for appointment';
                reasonInputContainer.append(reasonIDInput);

                bookable.append(ddContainer);
                bookable.append(reasonInputContainer);

                let buttonContainer = document.createElement('div');
                buttonContainer.classList.add('container');
                buttonContainer.id = 'butContainer';

                let submitButton = document.createElement('button');
                submitButton.innerText = 'Submit';
                buttonContainer.append(submitButton);

                bookable.append(buttonContainer);
            }
        }
        /**
         * @desc when the datepicker value changes, it makes all the timeboxes selectable again then re-checks
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
    }
});