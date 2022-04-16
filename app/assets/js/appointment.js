document.addEventListener('DOMContentLoaded', () => {

    let table = document.getElementById('bookingTable');
    let datePicker = document.getElementById('date_picker');
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

    bookButton.addEventListener('click', () => {
        if (bookButton.innerText == 'Book Appointment') {
            tableSlot.classList.remove('hidden');
            bookButton.innerText = 'Close Appointment';
        } else {
            tableSlot.classList.add('hidden');
            bookButton.innerText = 'Book Appointment';
            bookableSlot.innerHTML = '';
        }
        
    })

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
                        let bookingID = bookedSlots[key].bookingID;
                        let bookingDate = bookedSlots[key].bookingDate;
                        let patientID = bookedSlots[key].patientID;
                        let reason = bookedSlots[key].reason;

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

        xhr.open('GET', '../api/booking/readAll.php?', true);
        xhr.send();
    }

    checkAvailability();

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

            fillBookableForm(bookable, chosenSlot);

            setTimeout(function() {
                chosenSlot.classList.remove('active');
            }, 1500);
        }
    };

    for (var i = 0, l = timeBox.length; l > i; i++) {
        timeBox[i].onclick = getTime(timeBox[i]);
    }

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
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                try {
                    let bookedSlots = {};
                    let blockedSlots = {};
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

                    let keysOfBooked = Object.keys(bookedSlots).sort();
                    keysOfBooked.map(key => {
                        let month = function (m) {
                            if (m < 10) {
                                m = '0' + m.toString();
                            }
                            return (m);
                        }
                        let now = new Date();
                        let miniMonth = now.getMonth() + 1;
                        let current = now.getFullYear() + '-' + (month(miniMonth)) + '-' + now.getDate();
                        
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
                            let days = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
                            let day = days[dayNum];
                            c1.innerHTML = day;
                            let c2 = document.createElement('td');
                            c2.innerHTML = bookingBlockDate;
                            let c3 = document.createElement('td');
                            c3.innerHTML = bookingBlockTime;
                            let c4 = document.createElement('td');

                            let xhr = new XMLHttpRequest();
                            xhr.addEventListener('readystatechange', function() {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    try {
                                        let json = xhr.responseText.substring(7);
                                        let patients = JSON.parse(json).data;
                                        let keys = Object.keys(patients);
                                        
                                        keys.map(key => {
                                            if (patientID == patients[key].patientID) {
                                                c4.innerHTML = patients[key].patientName;
                                            }
                                        })
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            });
                    
                            xhr.open('GET', '../api/profile/read.php?', true);
                            xhr.send();

                            row.append(c1);
                            row.append(c2);
                            row.append(c3);
                            row.append(c4);
                            table.append(row);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });

        xhr.open('GET', '../api/booking/readAll.php?', true);
        xhr.send();
    }

    appointments()

    datePicker.addEventListener('change', () => {
        let bookingCard = document.getElementsByClassName('bookingCard')[0];
        let childs = bookingCard.childElementCount;
        
        for (let i = 0; i < childs; i++) {
            let slot = bookingCard.children[i];
            slot.classList.remove('unselectableTime');
            slot.classList.add('timeBox');
        }
        checkAvailability();
    });

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
                                ddContent.classList.add("hidden");
                                ddButton.classList.remove("dropdownButtonRadius");

                                let caretContainer = document.createElement("div");
                                caretContainer.classList.add("caretContainer");
                                let rightCaret = document.createElement("span");
                                rightCaret.classList.add("rightCaret");
                                
                                let leftCaret = document.createElement("span");
                                leftCaret.classList.add("leftCaret");

                                caretContainer.appendChild(leftCaret);
                                caretContainer.appendChild(rightCaret);
                                ddButton.appendChild(caretContainer);

                                submitButton.addEventListener('click', function() {
                                    let theSlot = slot.innerText + ':00';
                                    let dateSelected = datePicker.value;
                                    let formattedDateTime = dateSelected + ' ' + theSlot;

                                    slot.classList.remove('timeBox');
                                    slot.classList.add('unselectableTime');

                                    let xhr = new XMLHttpRequest();

                                    let body = {
                                        vetID: 1111,
                                        patientID: dropdown.id,
                                        bookingDate: formattedDateTime,
                                        reason: reasonIDInput.value
                                    };

                                    xhr.addEventListener('readystatechange', function() {
                                        if (xhr.readyState === XMLHttpRequest.DONE) {
                                            let responseJSON = xhr.responseText;
                                            let notifier = new AWN();
                                            try {
                                                if (xhr.status == 200) {
                                                    notifier.success('Successfully Submitted Booking Information');
                                                    bookableSlot.innerHTML = '';
                                                    checkAvailability()
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

                                    xhr.open('POST', '../api/booking/create.php?', true);
                                    xhr.send(JSON.stringify(body));
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

            ddButton.addEventListener('click', function() {
                if (ddContent.classList.contains("hidden")) {
                    ddContent.classList.remove("hidden");
                    ddContent.classList.add("dropdownContent");
                    ddButton.classList.add("dropdownButtonRadius");
                }
                else {
                    ddContent.classList.add("hidden");
                    ddButton.classList.remove("dropdownButtonRadius");
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

    if (localStorage.getItem("theme") === "dark") { 
        document.body.setAttribute("data-theme", "dark"); 
    } else { 
        document.body.removeAttribute("data-theme", "dark");
    }
});