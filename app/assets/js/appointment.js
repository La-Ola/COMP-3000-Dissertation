document.addEventListener('DOMContentLoaded', () => {

    let table = document.getElementById('bookingTable');

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
                    console.log(current, bookingBlockDate)
                    if (current < bookingBlockDate) {
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