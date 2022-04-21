document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById('appointmentTable');

    let infoName = document.getElementById('name');
    let infoSpecies = document.getElementById('species');
    let infoChip = document.getElementById('chip');
    let infoBlood = document.getElementById('blood');
    let infoHeart = document.getElementById('heart');
    let infoPressure = document.getElementById('pressure');
    let infoId = document.getElementById('petID');
    let infoBalls = document.getElementById('balls');

    let nameHolder = document.getElementById('nameHolder');
    let ballsHolder = document.getElementById('ballsHolder');
    let chipHolder = document.getElementById('chipHolder');


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
                                                    infoName.classList.remove('hidden');
                                                    infoName.classList.add('inputBox');

                                                    infoChip.classList.remove('hidden');
                                                    infoChip.classList.add('inputBox');

                                                    infoBalls.classList.remove('hidden');
                                                    infoBalls.classList.add('inputBox');

                                                    infoId.innerHTML = '<b>ID: </b>'+ patientsID;
                                                    infoName.value = patients[key].patientName;
                                                    infoSpecies.innerHTML = '<b>Species: </b>' + patients[key].species;

                                                    if (patients[key].neutered != '') {
                                                        infoBalls.value = patients[key].neutered;
                                                    } else {
                                                        infoBalls.value = 'Unknown';
                                                    }

                                                    if (patients[key].microchip != '') {
                                                        infoChip.value = patients[key].microchip;
                                                    } else {
                                                        infoChip.value = 'Unknown';
                                                    }

                                                    infoName.addEventListener('change', (e) => {
                                                        nameHolder.innerHTML = '';

                                                        let updateB = document.createElement('button');
                                                        updateB.classList.add('updateButton');
                                                        updateB.innerHTML = 'Update';
                                                        nameHolder.append(updateB);

                                                    });

                                                    infoBalls.addEventListener('change', (e) => {
                                                        ballsHolder.innerHTML = '';

                                                        let updateB = document.createElement('button');
                                                        updateB.classList.add('updateButton');
                                                        updateB.innerHTML = 'Update';
                                                        ballsHolder.append(updateB);

                                                    });

                                                    infoChip.addEventListener('change', (e) => {
                                                        chipHolder.innerHTML = '';

                                                        let updateB = document.createElement('button');
                                                        updateB.classList.add('updateButton');
                                                        updateB.innerHTML = 'Update';
                                                        chipHolder.append(updateB);

                                                    });
                                                });
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