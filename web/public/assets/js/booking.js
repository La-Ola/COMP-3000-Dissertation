document.addEventListener("DOMContentLoaded", () => {

    let datePicker = document.getElementById("date_picker");

    let timeBox = document.getElementsByClassName("timeBox");
    let bookableSlot = document.getElementById("booking slot");

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

    let checkAvailability = function() {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("readystatechange", function() {
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
                        let patientID = bookedSlots[key].patientID;
                        let reason = bookedSlots[key].reason;

                        bookingDate = bookingDate.split(' ');
                        let bookingBlockDate = bookingDate[0];
                        let bookingBlockTime = bookingDate[1];
                        if (datePicker.value == bookingBlockDate) {
                            bookingBlockTime = bookingBlockTime.substring(0, bookingBlockTime.length - 3);
                            let  slot = document.getElementById(bookingBlockTime);
                            slot.classList.remove("timeBox");
                            slot.classList.add("unselectableTime");
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
                            slot.classList.remove("timeBox");
                            slot.classList.add("unselectableTime");
                            slot.name = "blocked";
                        }
                    });

                } catch (error) {
                    console.log(error);
                }
            }
        });

        xhr.open("GET", "./api/booking/readAll.php?", true);
        xhr.send();
    }

    checkAvailability();
    console.log(bookedSlots);

    //gets time chosen from clickable time and opens bookables
    let getTime = function(timeBox) {
        return function() {
            let chosenTime = timeBox.id;
            let chosenSlot = document.getElementById(chosenTime);
            chosenSlot.classList.add("active");

            splitDate = datePicker.value.split("-");
            theDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];

            bookableSlot.innerHTML = "";

            let header = document.createElement("div");
            header.classList.add("headerTimeCard");
            header.innerText = theDate + " " + chosenTime;

            let bookable = document.createElement("div");
            bookable.classList.add("bookingTimeCard");

            bookableSlot.append(header);
            bookableSlot.append(bookable);

            fillBookableForm(bookable, chosenSlot);

            setTimeout(function() {
                chosenSlot.classList.remove("active");
            }, 1500);
        }
    };

    for (var i = 0, l = timeBox.length; l > i; i++) {
        timeBox[i].onclick = getTime(timeBox[i]);
    }

    let fillBookableForm = function(bookable, slot) {
        if (slot.name == 'blocked') {
            bookable.innerHTML = "";

            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("container");

            let freeingButton = document.createElement("button");
            freeingButton.innerText = "Unblock";
            buttonContainer.append(freeingButton);
            bookable.append(buttonContainer);
        } else {
            let patientInputContainer = document.createElement("div");
            let patientIDLabelClassifier = document.createElement("div");
            let patientIDLabel = document.createElement("span");
            let patientIDInput = document.createElement("input");
            patientInputContainer.classList.add("questionContainer");
            patientIDLabelClassifier.classList.add("questionLabel");
            patientIDInput.classList.add("inputBox");
            patientIDInput.id = "PatientIDInput";
            patientIDInput.placeholder = "Patient ID";
            patientIDLabel.innerHTML = "Patient ID:";
            patientIDLabelClassifier.append(patientIDLabel);
            patientInputContainer.append(patientIDLabelClassifier);
            patientInputContainer.append(patientIDInput);

            let reasonInputContainer = document.createElement("div");
            let reasonIDInput = document.createElement("textarea");
            reasonInputContainer.classList.add("container");
            reasonIDInput.classList.add("inputBoxLarge");
            reasonIDInput.id = "reasonInput";
            reasonIDInput.placeholder = "Reason";
            reasonInputContainer.append(reasonIDInput);

            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("container");

            if (slot.classList.contains('unselectableTime') && slot.name != 'bookable') {
                for (const key in bookedSlots) {
                    if (bookedSlots.hasOwnProperty(key)) {
                        let bookingDate = key;

                        let date = datePicker.value;
                        let time = slot.id + ':00';
                        let dateTime = date + ' ' + time
                        if (dateTime == bookingDate) {
                            let patientID = bookedSlots[key].patientID;
                            let reason = bookedSlots[key].reason;

                            patientIDInput.placeholder = patientID;
                            reasonIDInput.placeholder = reason;

                            let updateButton = document.createElement("button");
                            updateButton.innerText = "Update";
                            buttonContainer.append(updateButton);

                            let deleteButton = document.createElement("button");
                            deleteButton.innerText = "Delete";
                            buttonContainer.append(deleteButton);
                        }
                    }
                }
            } else {
                let submitButton = document.createElement("button");
                submitButton.innerText = "Submit";
                buttonContainer.append(submitButton);

                let blockingButton = document.createElement("button");
                blockingButton.innerText = "Block Time";
                buttonContainer.append(blockingButton);

                blockingButton.addEventListener("click", function() {
                    slot.classList.remove("timeBox");
                    slot.classList.add("unselectableTime");
                    slot.name = "blocked";
                    bookable.innerHTML = "";

                    let buttonContainer = document.createElement("div");
                    buttonContainer.classList.add("container");

                    let freeingButton = document.createElement("button");
                    freeingButton.innerText = "Unblock";
                    buttonContainer.append(freeingButton);
                    bookable.append(buttonContainer);

                    let theSlot = slot.innerText + ":00";
                    let dateSelected = datePicker.value;
                    let formattedDateTime = dateSelected + " " + theSlot;

                    let xhr = new XMLHttpRequest();

                    let body = {
                        vetID: 1111,
                        bookingDate: formattedDateTime
                    };

                    xhr.addEventListener("readystatechange", function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            let responseJSON = xhr.responseText;
                            try {
                                let response = JSON.parse(responseJSON);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });

                    xhr.open("POST", "./api/booking/block.php?", true);
                    xhr.send(JSON.stringify(body));

                    freeingButton.addEventListener("click", function() {
                        freeingButton(slot);
                        bookable.innerHTML = "";
                        fillBookableForm(bookable, slot);
                    });
                });
                submitButton.addEventListener("click", function() {
                    let theSlot = slot.innerText + ":00";
                    let dateSelected = datePicker.value;
                    let formattedDateTime = dateSelected + " " + theSlot;

                    slot.classList.remove("timeBox");
                    slot.classList.add("unselectableTime");

                    let xhr = new XMLHttpRequest();

                    let body = {
                        vetID: 1111,
                        patientID: patientIDInput.value,
                        bookingDate: formattedDateTime,
                        reason: reasonIDInput.value
                    };

                    xhr.addEventListener("readystatechange", function() {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            let responseJSON = xhr.responseText;
                            try {
                                let response = JSON.parse(responseJSON);
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });

                    xhr.open("POST", "./api/booking/create.php?", true);
                    xhr.send(JSON.stringify(body));

                    location.reload();
                });
            }

            bookable.append(patientInputContainer);
            bookable.append(reasonInputContainer);
            bookable.append(buttonContainer);

            
        }

        let freeingButton = function(slot) {
            slot.classList.remove("unselectableTime");
            slot.classList.add("timeBox");
        }
    }
});