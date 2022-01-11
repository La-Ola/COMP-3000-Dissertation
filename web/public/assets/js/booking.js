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

            setTimeout (function() {
                chosenSlot.classList.remove("active");
            }, 1500);
        }
    };

    for (var i = 0, l = timeBox.length; l > i; i++) {
        timeBox[i].onclick = getTime(timeBox[i]);
    }


    
});