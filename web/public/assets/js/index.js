document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById('appointmentTable');

    let infoCard = document.getElementById('halfCard');

    let secondHalf = document.getElementById('halfCardContainer2');

    let histHead = document.getElementById('histHead');
    let histCard = document.getElementById('histCard')
    let historyCard = document.getElementById('historyCard');

    let infoName = document.getElementById('name');
    let infoSpecies = document.getElementById('species');
    let infoChip = document.getElementById('chip');
    let infoId = document.getElementById('petID');
    let infoneut = document.getElementById('neut');

    let botGluc = document.getElementById('botGluc');
    let botHeart = document.getElementById('botHeart');
    let botTemp = document.getElementById('botTemp');
    let topGluc = document.getElementById('topGluc');
    let topHeart = document.getElementById('topHeart');
    let topTemp = document.getElementById('topTemp');

    let reasonHolder = document.getElementById('reasonHolder');

    let noteTextArea = document.getElementById('noteTextArea');

    let medTable = document.getElementById('medications');
    let buttonColumn = document.getElementById('buttonColumn');
    let rowButton = document.getElementById('rowButton');
    let formSubmit = document.getElementById('formSubmit');

    let appointments = function() {
        table.innerHTML = '';
        historyCard.innerHTML = '';
        let firstRow = document.createElement('tr');

        let head1 = document.createElement('th');
        head1.innerText = 'Day';
        let head2 = document.createElement('th');
        head2.innerText = 'Date';
        let head3 = document.createElement('th');
        head3.innerText = 'Time';
        let head4 = document.createElement('th');
        head4.innerText = 'Pet';
        let head5 = document.createElement('th');
        head5.innerText = 'Fill Info';

        firstRow.append(head1);
        firstRow.append(head2);
        firstRow.append(head3);
        firstRow.append(head4);
        firstRow.append(head5);

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
                            let patientsID = bookedSlots[key].patientID;
                            let reason = bookedSlots[key].reason;

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
                            c4.id = patientsID;
                            let c5 = document.createElement('td');

                            let xhr = new XMLHttpRequest();
                            xhr.addEventListener('readystatechange', function() {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    try {
                                        let json = xhr.responseText.substring(7);
                                        let patients = JSON.parse(json).data;
                                        let keys = Object.keys(patients);

                                        keys.map(key => {
                                            if (patientsID == patients[key].patientID) {
                                                c4.innerHTML = patients[key].patientName;
                                                let moreBut = document.createElement('button');
                                                moreBut.innerHTML = 'More';
                                                moreBut.id = patients[key].patientID;
                                                c5.append(moreBut);

                                                moreBut.addEventListener('click', () => {
                                                    secondHalf.classList.remove('hidden');
                                                    secondHalf.classList.add('halfCardContainer');

                                                    histHead.classList.remove('hidden');
                                                    histCard.classList.remove('hidden');

                                                    histHead.classList.add('header');
                                                    histCard.classList.add('card');
                                                    historyCard.innerHTML = '';

                                                    let fillMedicalFile = function() {
                                                        let xhr = new XMLHttpRequest();
                                                        xhr.addEventListener('readystatechange', function() {
                                                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                                                let responseJSON = xhr.responseText;
                                                                try {
                                                                    let json = xhr.responseText.substring(7);
                                                                    let emr = JSON.parse(json).data;
                                                                    let keys = Object.keys(emr);

                                                                    let emfTable = document.createElement('table');
                                                                    emfTable.id = 'historyTable';

                                                                    let headerRow = document.createElement('tr');
                                                                    let h1 = document.createElement('th');
                                                                    h1.innerHTML = 'Date';
                                                                    let h2 = document.createElement('th');
                                                                    h2.innerHTML = 'Illness';
                                                                    let h3 = document.createElement('th');
                                                                    h3.innerHTML = 'Medicine';
                                                                    let h4 = document.createElement('th');
                                                                    h4.innerHTML = 'Notes';
                                                                    let h5 = document.createElement('th');

                                                                    headerRow.append(h1);
                                                                    headerRow.append(h2);
                                                                    headerRow.append(h3);
                                                                    headerRow.append(h4);
                                                                    headerRow.append(h5);
                                                                    emfTable.append(headerRow);

                                                                    keys.map(k => {
                                                                        if (emr[k].patientID == patientsID) {
                                                                            let row = document.createElement('tr');
                                                                            let c1 = document.createElement('td');
                                                                            c1.innerHTML = emr[k].date;

                                                                            let c2 = document.createElement('td');
                                                                            c2.innerHTML = emr[k].illness;

                                                                            let c3 = document.createElement('td');
                                                                            c3.innerHTML = emr[k].medication;

                                                                            let c4 = document.createElement('td');
                                                                            c4.innerHTML = emr[k].notes;

                                                                            let c5 = document.createElement('td');
                                                                            let deleteButton = document.createElement('button');
                                                                            deleteButton.innerHTML = 'Delete';
                                                                            c5.append(deleteButton);

                                                                            row.append(c1);
                                                                            row.append(c2);
                                                                            row.append(c3);
                                                                            row.append(c4);
                                                                            row.append(c5);
                                                                            emfTable.append(row);

                                                                            deleteButton.addEventListener('click', () => {
                                                                                let xhr = new XMLHttpRequest();
                                                                                let body = {
                                                                                        "EMRID" : emr[k].EMRID
                                                                                };
                                                                                xhr.addEventListener('readystatechange', function() {
                                                                                    if (xhr.readyState === XMLHttpRequest.DONE) {
                                                                                        let responseJSON = xhr.responseText;
                                                                                        let notifier = new AWN();
                                                                                        try {
                                                                                            if (xhr.status == 200) {
                                                                                                notifier.success('Successfully Deleted EMF');
                                                                                                historyCard.innerHTML = '';
                                                                                                fillMedicalFile()
                                                                                            } else {
                                                                                                notifier.alert('Has Not Deleted EMF. Check Connection.');
                                                                                            }
                                                                                        } catch (error) {
                                                                                            console.log(error);
                                                                                        } 
                                                                                    }
                                                                                })
                                                                                xhr.open('DELETE', '../../api/emf/delete.php?', true);
                                                                                xhr.send(JSON.stringify(body));
                                                                            })
                                                                        }
                                                                    })

                                                                    let rows = emfTable.getElementsByTagName("tr");
                                                                    if (rows.length == 1) {
                                                                        emfTable.innerHTML = '';
                                                                        historyCard.innerHTML = '<b>No Information</b>';
                                                                    }

                                                                    historyCard.append(emfTable);

                                                                } catch (error) {
                                                                    console.log(error);
                                                                    historyCard.innerHTML = '<b>No Information</b>';
                                                                }
                                                            }
                                                        });
                                                        xhr.open('GET', '../../api/emf/read.php?', true);
                                                        xhr.send();
                                                    }

                                                    fillMedicalFile()

                                                    infoName.classList.remove('hidden');
                                                    infoName.classList.add('inputBox');

                                                    infoChip.classList.remove('hidden');
                                                    infoChip.classList.add('inputBox');

                                                    infoneut.classList.remove('hidden');
                                                    infoneut.classList.add('inputBox');

                                                    infoId.innerHTML = '<b>ID: </b>'+ patientsID;
                                                    infoName.value = patients[key].patientName;
                                                    infoSpecies.innerHTML = '<b>Species: </b>' + patients[key].species;

                                                    if (reason == '' || reason == null) {
                                                        reasonHolder.innerHTML = '<b>Reason for Appointment: </b>Unknown';
                                                    } else {
                                                        reasonHolder.innerHTML = '<b>Reason for Appointment: </b>' + reason;
                                                    }

                                                    if (patients[key].neutered != '') {
                                                        infoneut.value = patients[key].neutered;
                                                    } else {
                                                        infoneut.value = 'Unknown';
                                                    }

                                                    if (patients[key].microchip != '') {
                                                        infoChip.value = patients[key].microchip;
                                                    } else {
                                                        infoChip.value = 'Unknown';
                                                    }

                                                    let submitButton = document.createElement('button');
                                                    submitButton.classList.add('bottomButton');
                                                    submitButton.innerHTML = 'Submit';
                                                    infoCard.innerHTML = '';
                                                    infoCard.append(submitButton);

                                                    submitButton.addEventListener('click', () => {
                                                        let xhr = new XMLHttpRequest();

                                                        let body = {
                                                            patientID: patientsID,
                                                            patientName: infoName.value,
                                                            DOB : patients[key].DOB,
                                                            sex : patients[key].sex,
                                                            breed : patients[key].breed,
                                                            species : patients[key].species,
                                                            neutered : infoneut.value,
                                                            microchip : infoChip.value
                                                        };

                                                        xhr.addEventListener('readystatechange', function() {
                                                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                                                let responseJSON = xhr.responseText;
                                                                let notifier = new AWN();
                                                                try {
                                                                    if (xhr.status == 200) {
                                                                        notifier.success('Successfully Submitted New Microchip Number');
                                                                    } else {
                                                                        notifier.alert('Has Not Submitted Booking. Check Connection.');
                                                                    }
                                                                } catch (error) {
                                                                    console.log(error);
                                                                    notifier.alert('Has Not Submitted Booking. Check Connection.');
                                                                }
                                                            }
                                                        });

                                                        xhr.open('PUT', '../../api/profile/update.php?', true);
                                                        xhr.send(JSON.stringify(body));
                                                    })

                                                    let fillParams = function() {
                                                        let xhr = new XMLHttpRequest();
                                                        xhr.addEventListener('readystatechange', function() {
                                                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                                                try {
                                                                    botGluc.innerHTML = '';
                                                                    topGluc.innerHTML = '';

                                                                    botHeart.innerHTML = '';
                                                                    topHeart.innerHTML = '';

                                                                    botTemp.innerHTML = '';
                                                                    topTemp.innerHTML = '';

                                                                    let species = patients[key].species;

                                                                    let json = xhr.responseText.substring(7);
                                                                    let params = JSON.parse(json).data;
                                                                    let keys = Object.keys(params);

                                                                    keys.map(key => {
                                                                        if (species.toLowerCase() == params[key].animal) {
                                                                            botGluc.innerHTML = params[key].bloodGlucoseBottom;
                                                                            topGluc.innerHTML = params[key].bloodGlucoseTop;

                                                                            botHeart.innerHTML = params[key].heartRateBottom;
                                                                            topHeart.innerHTML = params[key].heartRateTop;

                                                                            botTemp.innerHTML = params[key].bodyTempBottom;
                                                                            topTemp.innerHTML = params[key].bodyTempTop;
                                                                        }
                                                                    })
                                                                    
                                                                    
                                                                } catch (error) {
                                                                    console.log(error);
                                                                }
                                                            }
                                                        })
                                                        xhr.open('GET', '../../api/parameters/read.php?', true);
                                                        xhr.send();
                                                    }

                                                    fillParams()

                                                    rowButton.addEventListener('click', () => {
                                                        let illnessCollect = document.querySelectorAll('#illness');
                                                        let medicineCollect = document.querySelectorAll('#medicine');

                                                        let lastIllness = illnessCollect[illnessCollect.length - 1];
                                                        let lastMedicine = medicineCollect[medicineCollect.length - 1];

                                                        let lastIllnessValue = lastIllness.value;
                                                        let lastMedicineValue = lastMedicine.value;

                                                        if (lastIllnessValue == '' && lastMedicineValue == '') {
                                                            let notifier = new AWN();
                                                            notifier.alert('No Information In Current Row.');
                                                        } else {
                                                            rowButton.classList.add('hidden');

                                                            let newRow = document.createElement('tr');

                                                            let firstColumn = document.createElement('td');
                                                            let secondColumn = document.createElement('td');
                                                            let thirdColumn = document.createElement('td');

                                                            let firstInput = document.createElement('input');
                                                            let secondInput = document.createElement('input');

                                                            firstInput.classList.add('illnessInputBoxTable');
                                                            secondInput.classList.add('medicineInputBoxTable');

                                                            firstInput.value = '';
                                                            secondInput.value = '';

                                                            rowButton.classList.add('tableButton');
                                                            rowButton.classList.remove('hidden');

                                                            buttonColumn.id = '';
                                                            buttonColumn.innerHTML = '';

                                                            firstInput.id = 'illness';
                                                            secondInput.id = 'medicine';
                                                            thirdColumn.id = 'buttonColumn';

                                                            firstColumn.append(firstInput);
                                                            secondColumn.append(secondInput);
                                                            thirdColumn.append(rowButton);

                                                            newRow.append(firstColumn);
                                                            newRow.append(secondColumn);
                                                            newRow.append(thirdColumn);

                                                            medTable.append(newRow);
                                                        }
                                                    })

                                                    formSubmit.classList.remove('hidden');
                                                    formSubmit.classList.add('formButton');

                                                    formSubmit.addEventListener('click', () => {
                                                        let illnessCollect = document.querySelectorAll('#illness');
                                                        let medicineCollect = document.querySelectorAll('#medicine');

                                                        let date = new Date();

                                                        for (i = 0; i <= illnessCollect.length; i++) {
                                                            let lastIllness = illnessCollect[i];
                                                            let lastMedicine = medicineCollect[i];

                                                            let xhr = new XMLHttpRequest();
                                                            let body = {
                                                                "patientID": patientsID,
                                                                "illness": lastIllness.value,
                                                                "medication": lastMedicine.value,
                                                                "date": date,
                                                                "notes": noteTextArea.value
                                                            };
                                                            xhr.addEventListener('readystatechange', function() {
                                                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                                                    let responseJSON = xhr.responseText;
                                                                    let notifier = new AWN();
                                                                    try {
                                                                        if (xhr.status == 200) {
                                                                            notifier.success('Successfully Created New File');
                                                                        } else {
                                                                            notifier.alert('Has Not Created New File. Check Connection.');
                                                                        }
                                                                    } catch (error) {
                                                                        console.log(error);
                                                                    } 
                                                                }
                                                            })
                                                            xhr.open('POST', '../../api/emf/create.php?', true);
                                                            xhr.send(JSON.stringify(body));
                                                            window.location = window.location;
                                                        }
                                                    })
                                                })
                                            }
                                        })
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            });
                    
                            xhr.open('GET', '../../api/profile/read.php?', true);
                            xhr.send();

                            row.append(c1);
                            row.append(c2);
                            row.append(c3);
                            row.append(c4);
                            row.append(c5);
                            table.append(row);
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

    appointments()

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