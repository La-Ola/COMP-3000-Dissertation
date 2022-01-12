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
        let vetInputContainer = document.createElement("div");
        let vetIDLabelClassifier = document.createElement("div");
        let vetIDLabel = document.createElement("span");
        let vetIDInput = document.createElement("input");
        vetInputContainer.classList.add("questionContainer");
        vetIDLabelClassifier.classList.add("questionLabel");
        vetIDInput.classList.add("inputBox");
        vetIDInput.id = "vetIDInput";
        vetIDInput.placeholder = "Vet ID";
        vetIDLabel.innerHTML = "Vet ID:";
        vetIDLabelClassifier.append(vetIDLabel);
        vetInputContainer.append(vetIDLabelClassifier);
        vetInputContainer.append(vetIDInput);

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

        let submitButtonATag = document.createElement("a");
        let submitButton = document.createElement("button");
        submitButton.innerText = "Submit";
        submitButtonATag.append(submitButton);
        buttonContainer.append(submitButtonATag);

        let blockingButton = document.createElement("button");
        blockingButton.innerText = "Block Time";
        buttonContainer.append(blockingButton);


        bookable.append(vetInputContainer);
        bookable.append(patientInputContainer);
        bookable.append(reasonInputContainer);
        bookable.append(buttonContainer);

        blockingButton.addEventListener("click", function() {
            slot.classList.remove("timeBox");
            slot.classList.add("unselectableTime");
            bookable.innerHTML = "";

            let buttonContainer = document.createElement("div");
            buttonContainer.classList.add("container");

            let freeingButton = document.createElement("button");
            freeingButton.innerText = "Unblock";
            buttonContainer.append(freeingButton);
            bookable.append(buttonContainer);

            freeingButton.addEventListener("click", function() {
                slot.classList.remove("unselectableTime");
                slot.classList.add("timeBox");
                bookable.innerHTML = "";

                fillBookableForm(bookable, slot);
            });
        });
    }
});