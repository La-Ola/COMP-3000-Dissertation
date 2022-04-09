document.addEventListener('DOMContentLoaded', () => {

    let addButton = document.getElementById('add');
    let cancelButton = document.getElementById('cancel');
    let createButton = document.getElementById('create');
    let createPetCard = document.getElementById('createPet');

    let petName = document.getElementById('petName');
    let dateofBirth = document.getElementById('DOB');
    let sex = document.getElementById('sex');
    let breed = document.getElementById('breed');
    let species = document.getElementById('species');
    let neutered = document.getElementById('neutered');
    let microchip = document.getElementById('microchip');

    let clearForm = function() {
        petName.value = '';
        dateofBirth.value = '';
        sex.value = '';
        breed.value = '';
        species.value = '';
        neutered.value = '';
        microchip.value = '';
    }

    addButton.addEventListener('click', () => {
        let xhr = new XMLHttpRequest();

        let body = {
            patientName: petName.value,
            DOB : dateofBirth.value,
            sex : sex.value,
            breed : breed.value,
            species : species.value,
            neutered : neutered.value,
            microchip : microchip.value
        };

        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let responseJSON = xhr.responseText;
                let notifier = new AWN();
                try {
                    if (xhr.status == 200) {
                        notifier.success('Successfully Submitted Patient Information');
                    } else {
                        notifier.alert('Has Not Submitted Booking. Check Connection.');
                    }
                } catch (error) {
                    console.log(error);
                    notifier.alert('Has Not Submitted Booking. Check Connection.');
                }
            }
        });

        xhr.open('POST', '../api/profile/create.php?', true);
        xhr.send(JSON.stringify(body));
        clearForm()
        createPetCard.classList.add('hidden');
        createButton.classList.add('block');
        createButton.classList.remove('hidden');
    })

    createButton.addEventListener('click', () => {
        clearForm();

        createPetCard.classList.remove('hidden');
        createButton.classList.remove('block');
        createButton.classList.add('hidden');
    })

    cancelButton.addEventListener('click', () => {
        createPetCard.classList.add('hidden');
        createButton.classList.add('block');
        createButton.classList.remove('hidden');
    })

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

    if (localStorage.getItem('theme') === 'dark') { 
        document.body.setAttribute('data-theme', 'dark'); 
    } else { 
        document.body.removeAttribute('data-theme', 'dark');
    }
});